import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Submit a new survey response
export const submitSurveyResponse = mutation({
  args: {
    participantId: v.string(),
    surveyData: v.object({}),
    metadata: v.optional(v.object({
      userAgent: v.optional(v.string()),
      ipAddress: v.optional(v.string()),
      sessionId: v.optional(v.string()),
      language: v.optional(v.string()),
    })),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    
    // Extract structured data from survey response
    const structuredData = extractSurveyData(args.surveyData);
    
    // Create the survey response record
    const responseId = await ctx.db.insert("surveyResponses", {
      participantId: args.participantId,
      submittedAt: now,
      completedAt: structuredData.isComplete ? now : undefined,
      
      // Basic info
      sex: structuredData.q1,
      profession: structuredData.q2,
      age: structuredData.q3 ? parseInt(structuredData.q3) : undefined,
      yearsOfPractice: structuredData.q4 ? parseInt(structuredData.q4) : undefined,
      hasAllergyEducation: structuredData.q5 === 'yes',
      allergyEducationDetails: structuredData.q5a || [],
      countryOfWork: structuredData.q6,
      
      // Feeding timing
      breastfedInfantAge: structuredData.q7a ? parseInt(structuredData.q7a) : undefined,
      formulaFedInfantAge: structuredData.q7b ? parseInt(structuredData.q7b) : undefined,
      highRiskInfantAge: structuredData.q7c ? parseInt(structuredData.q7c) : undefined,
      
      // Risk criteria
      highRiskCriteria: structuredData.q8 || [],
      
      // Prevention measures
      lowRiskPreventionMeasures: structuredData.q9a_main === 'yes',
      lowRiskPreventionDetails: structuredData.q9a_elaborate || [],
      highRiskPreventionMeasures: structuredData.q9b_main === 'yes',
      highRiskPreventionDetails: structuredData.q9b_elaborate || [],
      
      // Food order recommendations
      recommendSpecificOrderLowRisk: structuredData.q10 === 'yes',
      recommendSpecificOrderHighRisk: structuredData.q11 === 'yes',
      
      // Timeline data
      foodTimelineLowRisk: structuredData['food-timeline-low-risk'],
      foodTimelineHighRisk: structuredData['food-timeline-high-risk'],
      
      // Additional questions
      traditionalFoods: structuredData.q12,
      recommendedSupplements: structuredData.q14 || [],
      
      // Intervals
      lowAllergenicFoodsIntervalNonAllergic: structuredData.q15,
      lowAllergenicFoodsIntervalHighRisk: structuredData.q16,
      highAllergenicFoodsIntervalNonAllergic: structuredData.q17,
      highAllergenicFoodsIntervalHighRisk: structuredData.q18,
      
      // Raw data backup
      rawSurveyData: args.surveyData,
      
      // Metadata
      userAgent: args.metadata?.userAgent,
      ipAddress: args.metadata?.ipAddress,
      sessionId: args.metadata?.sessionId,
      language: args.metadata?.language,
    });
    
    return responseId;
  },
});

// Get survey responses (for admin/research purposes)
export const getSurveyResponses = query({
  args: {
    limit: v.optional(v.number()),
    profession: v.optional(v.string()),
    country: v.optional(v.string()),
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
      completedResponses: allResponses.filter(r => r.completedAt).length,
      professionBreakdown: {} as Record<string, number>,
      countryBreakdown: {} as Record<string, number>,
      lowRiskRecommendations: allResponses.filter(r => r.recommendSpecificOrderLowRisk).length,
      highRiskRecommendations: allResponses.filter(r => r.recommendSpecificOrderHighRisk).length,
    };
    
    // Calculate profession breakdown
    allResponses.forEach(response => {
      if (response.profession) {
        stats.professionBreakdown[response.profession] = 
          (stats.professionBreakdown[response.profession] || 0) + 1;
      }
    });
    
    // Calculate country breakdown
    allResponses.forEach(response => {
      if (response.countryOfWork) {
        stats.countryBreakdown[response.countryOfWork] = 
          (stats.countryBreakdown[response.countryOfWork] || 0) + 1;
      }
    });
    
    return stats;
  },
});

// Helper function to extract structured data from raw survey response
function extractSurveyData(rawData: any) {
  return {
    isComplete: !!rawData.isComplete,
    q1: rawData.q1, // sex
    q2: rawData.q2, // profession
    q3: rawData.q3, // age
    q4: rawData.q4, // years of practice
    q5: rawData.q5, // allergy education
    q5a: rawData.q5a, // allergy education details
    q6: rawData.q6, // country
    q7a: rawData.q7a, // breastfed age
    q7b: rawData.q7b, // formula fed age
    q7c: rawData.q7c, // high risk age
    q8: rawData.q8, // high risk criteria
    q9a_main: rawData.q9a_main, // low risk prevention
    q9a_elaborate: rawData.q9a_elaborate, // low risk prevention details
    q9b_main: rawData.q9b_main, // high risk prevention
    q9b_elaborate: rawData.q9b_elaborate, // high risk prevention details
    q10: rawData.q10, // low risk order
    q11: rawData.q11, // high risk order
    'food-timeline-low-risk': rawData['food-timeline-low-risk'],
    'food-timeline-high-risk': rawData['food-timeline-high-risk'],
    q12: rawData.q12, // traditional foods
    q14: rawData.q14, // supplements
    q15: rawData.q15, // intervals
    q16: rawData.q16,
    q17: rawData.q17,
    q18: rawData.q18,
  };
}