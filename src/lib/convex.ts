import { ConvexReactClient } from "convex/react";

// Initialize the Convex client
const convexUrl = import.meta.env.PUBLIC_CONVEX_URL || 
                  import.meta.env.CONVEX_URL || 
                  "https://blissful-lemur-655.convex.cloud";

export const convex = new ConvexReactClient(convexUrl);

// Helper function to generate a unique participant ID
export function generateParticipantId(): string {
  return `participant_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Helper function to get session metadata
export function getSessionMetadata() {
  return {
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
    sessionId: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    language: typeof navigator !== 'undefined' ? navigator.language : undefined,
  };
}