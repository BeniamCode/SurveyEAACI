import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  surveyResponses: defineTable({
    // Basic participant information
    participantId: v.string(),
    submittedAt: v.number(),
    completedAt: v.optional(v.number()),
    
    // Basic demographic info
    sex: v.optional(v.string()),
    profession: v.optional(v.string()),
    age: v.optional(v.number()),
    yearsOfPractice: v.optional(v.number()),
    hasAllergyEducation: v.optional(v.boolean()),
    allergyEducationDetails: v.optional(v.array(v.string())),
    countryOfWork: v.optional(v.string()),
    
    // Complementary feeding timing
    breastfedInfantAge: v.optional(v.number()),
    formulaFedInfantAge: v.optional(v.number()),
    highRiskInfantAge: v.optional(v.number()),
    
    // High risk criteria
    highRiskCriteria: v.optional(v.array(v.string())),
    
    // Prevention measures
    lowRiskPreventionMeasures: v.optional(v.boolean()),
    lowRiskPreventionDetails: v.optional(v.array(v.string())),
    highRiskPreventionMeasures: v.optional(v.boolean()),
    highRiskPreventionDetails: v.optional(v.array(v.string())),
    
    // Food introduction order
    recommendSpecificOrderLowRisk: v.optional(v.boolean()),
    recommendSpecificOrderHighRisk: v.optional(v.boolean()),
    
    // Detailed food timeline data - Low Risk
    foodTimelineLowRisk: v.optional(v.object({
      month4: v.optional(v.object({})),
      month5: v.optional(v.object({})),
      month6: v.optional(v.object({})),
      month7: v.optional(v.object({})),
      month8: v.optional(v.object({})),
      month9: v.optional(v.object({})),
      month10: v.optional(v.object({})),
      month11: v.optional(v.object({})),
      month12: v.optional(v.object({})),
    })),
    
    // Detailed food timeline data - High Risk
    foodTimelineHighRisk: v.optional(v.object({
      month4: v.optional(v.object({})),
      month5: v.optional(v.object({})),
      month6: v.optional(v.object({})),
      month7: v.optional(v.object({})),
      month8: v.optional(v.object({})),
      month9: v.optional(v.object({})),
      month10: v.optional(v.object({})),
      month11: v.optional(v.object({})),
      month12: v.optional(v.object({})),
    })),
    
    // Additional questions
    traditionalFoods: v.optional(v.string()),
    recommendedSupplements: v.optional(v.array(v.string())),
    
    // Food introduction intervals
    lowAllergenicFoodsIntervalNonAllergic: v.optional(v.string()),
    lowAllergenicFoodsIntervalHighRisk: v.optional(v.string()),
    highAllergenicFoodsIntervalNonAllergic: v.optional(v.string()),
    highAllergenicFoodsIntervalHighRisk: v.optional(v.string()),
    
    // Raw survey data (backup)
    rawSurveyData: v.optional(v.object({})),
    
    // Session metadata
    userAgent: v.optional(v.string()),
    ipAddress: v.optional(v.string()),
    sessionId: v.optional(v.string()),
    language: v.optional(v.string()),
  })
    .index("by_submission_time", ["submittedAt"])
    .index("by_participant", ["participantId"])
    .index("by_profession", ["profession"])
    .index("by_country", ["countryOfWork"]),
});