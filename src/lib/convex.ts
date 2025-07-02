import { ConvexReactClient } from "convex/react";

// Initialize the Convex client
// You'll need to replace this URL with your actual Convex deployment URL
const convexUrl = import.meta.env.PUBLIC_CONVEX_URL || "https://your-convex-deployment.convex.cloud";

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