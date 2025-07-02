import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Submit or update a survey response
export const submitSurveyResponse = mutation({
  args: {
    participantId: v.string(),
    surveyData: v.any(), // Accept any JSON structure
    isComplete: v.boolean(),
    metadata: v.optional(v.object({
      userAgent: v.optional(v.string()),
      language: v.optional(v.string()),
      sessionId: v.optional(v.string()),
    })),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    
    // Extract key fields for indexing
    const sex = args.surveyData.q1;
    const profession = args.surveyData.q2;
    const countryOfWork = args.surveyData.q6;
    
    // Check if this participant already has a response
    const existing = await ctx.db
      .query("surveyResponses")
      .withIndex("by_participant", (q) => q.eq("participantId", args.participantId))
      .first();
    
    if (existing) {
      // Update existing response
      await ctx.db.patch(existing._id, {
        surveyData: args.surveyData,
        isComplete: args.isComplete,
        completedAt: args.isComplete ? now : undefined,
        sex,
        profession,
        countryOfWork,
        userAgent: args.metadata?.userAgent,
        language: args.metadata?.language,
      });
      return existing._id;
    } else {
      // Create new response
      const responseId = await ctx.db.insert("surveyResponses", {
        participantId: args.participantId,
        submittedAt: now,
        completedAt: args.isComplete ? now : undefined,
        isComplete: args.isComplete,
        surveyData: args.surveyData,
        sex,
        profession,
        countryOfWork,
        userAgent: args.metadata?.userAgent,
        language: args.metadata?.language,
        sessionId: args.metadata?.sessionId,
      });
      return responseId;
    }
  },
});

// Get survey responses (for admin/research purposes)
export const getSurveyResponses = query({
  args: {
    limit: v.optional(v.number()),
    profession: v.optional(v.string()),
    country: v.optional(v.string()),
    onlyComplete: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    let query = ctx.db.query("surveyResponses");
    
    // Apply filters
    if (args.profession) {
      query = query.filter((q) => q.eq(q.field("profession"), args.profession));
    }
    
    if (args.country) {
      query = query.filter((q) => q.eq(q.field("countryOfWork"), args.country));
    }
    
    if (args.onlyComplete) {
      query = query.filter((q) => q.eq(q.field("isComplete"), true));
    }
    
    // Order by submission time (newest first)
    const responses = await query
      .order("desc")
      .take(args.limit || 100);
    
    return responses;
  },
});

// Get survey statistics
export const getSurveyStats = query({
  args: {},
  handler: async (ctx) => {
    const allResponses = await ctx.db.query("surveyResponses").collect();
    
    const stats = {
      totalResponses: allResponses.length,
      completedResponses: allResponses.filter(r => r.isComplete).length,
      professionBreakdown: {} as Record<string, number>,
      countryBreakdown: {} as Record<string, number>,
      lowRiskRecommendations: 0,
      highRiskRecommendations: 0,
    };
    
    // Calculate breakdowns
    allResponses.forEach(response => {
      if (response.profession) {
        stats.professionBreakdown[response.profession] = 
          (stats.professionBreakdown[response.profession] || 0) + 1;
      }
      
      if (response.countryOfWork) {
        stats.countryBreakdown[response.countryOfWork] = 
          (stats.countryBreakdown[response.countryOfWork] || 0) + 1;
      }
      
      // Count recommendations from survey data
      if (response.surveyData?.q10 === 'yes') {
        stats.lowRiskRecommendations++;
      }
      if (response.surveyData?.q11 === 'yes') {
        stats.highRiskRecommendations++;
      }
    });
    
    return stats;
  },
});

// Get a specific participant's response
export const getParticipantResponse = query({
  args: {
    participantId: v.string(),
  },
  handler: async (ctx, args) => {
    const response = await ctx.db
      .query("surveyResponses")
      .withIndex("by_participant", (q) => q.eq("participantId", args.participantId))
      .first();
    
    return response;
  },
});