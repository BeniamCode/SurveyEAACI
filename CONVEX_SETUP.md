# Convex Integration Setup

This project uses [Convex.dev](https://convex.dev) to store and manage survey responses in real-time.

## Setup Instructions

### 1. Install Dependencies

The Convex dependency is already added to `package.json`. If you need to install it manually:

```bash
npm install convex
```

### 2. Initialize Convex

1. **Create a Convex account** at [convex.dev](https://convex.dev)

2. **Login to Convex CLI:**
   ```bash
   npx convex login
   ```

3. **Initialize your Convex project:**
   ```bash
   npm run convex:init
   ```
   
   This will:
   - Create your Convex deployment
   - Generate the deployment URL
   - Set up the database schema

4. **Copy your deployment URL** from the terminal output and create a `.env` file:
   ```bash
   # .env
   PUBLIC_CONVEX_URL=https://your-deployment-name.convex.cloud
   ```

### 3. Development

To run both the Astro dev server and Convex in development:

```bash
# Terminal 1: Start Convex development
npm run convex:dev

# Terminal 2: Start Astro development  
npm run dev
```

### 4. Deployment

To deploy your Convex functions to production:

```bash
npm run convex:deploy
```

## Database Schema

The survey responses are stored with the following structure:

### `surveyResponses` Table

- **Basic Information**: participant demographics, profession, location
- **Feeding Practices**: complementary feeding timing and approaches  
- **Risk Assessment**: criteria for identifying high-risk infants
- **Food Timeline Data**: detailed month-by-month food introduction recommendations
- **Metadata**: session info, timestamps, language preferences

### Key Fields

```typescript
{
  participantId: string,           // Unique participant identifier
  submittedAt: number,            // Submission timestamp  
  completedAt?: number,           // Completion timestamp (if finished)
  
  // Demographics
  sex?: string,                   // q1: Male/Female
  profession?: string,            // q2: Healthcare profession
  age?: number,                   // q3: Age in years
  yearsOfPractice?: number,       // q4: Professional experience
  countryOfWork?: string,         // q6: Country of practice
  
  // Food Timeline Data (main research data)
  foodTimelineLowRisk?: object,   // Detailed food introduction timeline
  foodTimelineHighRisk?: object,  // High-risk specific timeline
  
  // Raw backup
  rawSurveyData?: object,         // Complete survey response backup
}
```

## Features

### 🔄 **Auto-Save**
- Survey progress is automatically saved every 2 seconds
- Prevents data loss if users close the browser
- Partial responses are preserved

### 📊 **Real-time Analytics** 
- Live dashboard showing response statistics
- Profession and country breakdowns
- Completion rates and trends

### 🔍 **Data Export**
- Structured data ready for research analysis
- Both detailed and summary views available
- Queryable by profession, country, completion status

### 🚀 **Scalable**
- Convex handles millions of responses automatically
- Real-time updates across multiple users
- Built-in security and data validation

## API Functions

### Mutations (Write Operations)
- `submitSurveyResponse`: Save survey data to database

### Queries (Read Operations)  
- `getSurveyResponses`: Retrieve responses with filtering
- `getSurveyStats`: Get aggregate statistics

## Admin Dashboard

Access survey analytics at `/admin` (when implemented) to view:
- Total response counts
- Completion rates
- Professional and geographic distribution
- Recent responses table

## Data Privacy

- All data is stored securely in Convex's encrypted database
- Participant IDs are auto-generated (no personal identifiers)
- GDPR compliant data handling
- Built-in data retention controls

## Support

For issues with Convex integration:
1. Check the [Convex Documentation](https://docs.convex.dev)
2. Verify your deployment URL in `.env`
3. Ensure Convex dev server is running
4. Check browser console for connection errors