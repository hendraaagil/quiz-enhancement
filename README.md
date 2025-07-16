# Quiz Enhancement

An interactive quiz application built with Next.js, featuring mathematical equations, progress tracking, and responsive design. This quiz application includes timed questions with varying difficulty levels and real-time progress monitoring.

## Features

- 🧮 Mathematical equations rendered with KaTeX
- ⏱️ Timed quiz with progress tracking
- 📊 Difficulty levels (Easy, Medium, Hard)
- 💾 State management with Zustand
- 🎨 Modern UI with Tailwind CSS and Radix UI components
- 📱 Responsive design for all devices

## Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (version 22 or higher)
- **pnpm** (recommended) or npm/yarn

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/hendraaagil/quiz-enhancement
cd quiz-enhancement
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Run the Development Server

```bash
pnpm dev
```

The application will start at [http://localhost:3000](http://localhost:3000)

## Available Scripts

- **`pnpm dev`** - Starts the development server
- **`pnpm build`** - Builds the application for production
- **`pnpm start`** - Starts the production server (requires build first)
- **`pnpm lint`** - Runs ESLint to check for code issues
- **`pnpm format`** - Formats code using Prettier

## Project Structure

```
src/
├── app/                # Next.js app directory
│   ├── layout.tsx      # Root layout component
│   └── page.tsx        # Home page
├── components/         # React components
│   ├── quiz/          # Quiz-related components
│   │   ├── index.tsx  # Main quiz component
│   │   ├── introduction.tsx
│   │   ├── questions.tsx
│   │   └── results.tsx
│   └── ui/            # Reusable UI components
├── data/              # Static data and configurations
│   └── quiz.ts        # Quiz questions and settings
├── hooks/             # Custom React hooks
│   └── use-quiz-time.ts
├── lib/               # Utility functions
│   └── utils.tsx
└── stores/            # Zustand state stores
    └── answer-store.ts
```

## Configuration

### Quiz Settings

You can modify quiz settings in `src/data/quiz.ts`:

- **Time Limit**: Currently set to 3 minutes (180 seconds)
- **Questions**: Add/edit questions with LaTeX mathematical expressions
- **Difficulty Levels**: easy, medium, hard
- **Time Estimates**: Per question time estimates

## Building for Production

1. Build the application:

```bash
pnpm build
```

2. Start the production server:

```bash
pnpm start
```
