import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  surveyResponses: defineTable({
    // Core fields that won't change
    participantId: v.string(),
    submittedAt: v.number(),
    completedAt: v.optional(v.number()),
    isComplete: v.boolean(),
    
    // Flexible JSON storage for all survey data
    surveyData: v.any(), // This allows any JSON structure
    
    // Key fields for indexing and querying (extracted from surveyData)
    sex: v.optional(v.string()),
    profession: v.optional(v.string()),
    countryOfWork: v.optional(v.string()),
    
    // Session metadata
    userAgent: v.optional(v.string()),
    language: v.optional(v.string()),
    sessionId: v.optional(v.string()),
  })
    .index("by_submission_time", ["submittedAt"])
    .index("by_participant", ["participantId"])
    .index("by_profession", ["profession"])
    .index("by_country", ["countryOfWork"])
    .index("by_completion", ["isComplete", "submittedAt"]),
});