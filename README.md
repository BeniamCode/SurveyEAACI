# Astro + Ant Design + SurveyJS React App

This is a modern web application built with Astro.js, Ant Design UI components, and SurveyJS React for creating dynamic forms and surveys.

## Features

- **Astro.js** - Fast, modern static site generator with React integration
- **Ant Design** - Enterprise-class UI design language and React components
- **SurveyJS React** - Powerful form library for creating dynamic surveys
- **TypeScript** - Type-safe development experience
- **Git** - Version control initialized

## Project Structure

```
astro-antd-survey/
├── src/
│   ├── components/
│   │   ├── AppLayout.tsx    # Main layout with Ant Design
│   │   ├── Survey.tsx       # SurveyJS form component
│   │   └── SurveyPage.tsx   # Page wrapper component
│   ├── layouts/
│   │   └── Layout.astro     # Base HTML layout
│   └── pages/
│       ├── index.astro      # Home page
│       └── survey.astro     # Survey page
├── astro.config.mjs         # Astro configuration
├── package.json             # Dependencies and scripts
└── tsconfig.json            # TypeScript configuration
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd astro-antd-survey
```

2. Install dependencies:
```bash
yarn install
# or
npm install
```

### Development

Run the development server:

```bash
yarn dev
# or
npm run dev
```

Open [http://localhost:4321](http://localhost:4321) in your browser.

### Build

Build for production:

```bash
yarn build
# or
npm run build
```

### Preview

Preview the production build:

```bash
yarn preview
# or
npm run preview
```

## Survey Features

The included survey demonstrates:

- **Multi-page forms** with progress bar
- **Various question types**:
  - Text input fields
  - Email validation
  - Radio button groups
  - Rating scales
  - Comment boxes
- **Required field validation**
- **Survey completion handling**

## Customization

### Modifying the Survey

Edit `src/components/Survey.tsx` to customize the survey questions and structure. The `surveyJson` object defines the survey configuration.

### Styling

- Ant Design components can be customized using ConfigProvider
- SurveyJS themes can be changed by importing different CSS files
- Global styles are in `src/layouts/Layout.astro`

## Next Steps

1. Connect to a backend API to save survey responses
2. Add user authentication
3. Create additional survey templates
4. Implement survey analytics dashboard
5. Add more Ant Design components for enhanced UI

## Resources

- [Astro Documentation](https://docs.astro.build)
- [Ant Design Documentation](https://ant.design)
- [SurveyJS React Documentation](https://surveyjs.io/form-library/documentation/get-started-react)