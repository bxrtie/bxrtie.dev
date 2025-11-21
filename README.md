# bxrtie.dev Portfolio

A modern, high-performance personal portfolio website built with React, TypeScript, and Tailwind CSS.

## Project Structure

- `index.html` - Entry point, loads Tailwind via CDN.
- `src/` (Root)
  - `App.tsx` - Main layout component.
  - `context/` - React Context API (Theme management).
  - `components/` - UI sections (Hero, About, Projects, etc.).
  - `types.ts` - TypeScript definitions.

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Installation

1. Clone the project.
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

## Development

To start the development server:

```bash
npm run dev
```

## Building for Production

To create a production build:

```bash
npm run build
```

This will generate a `dist` folder containing static files ready for deployment on Vercel, Netlify, or any static host.

## Features

- Dark/Light mode toggle with persistence.
- Responsive mobile-first design.
- Interactive "Sci-Fi OS" elements (Command Palette, Boot Sequence).
- Functional Contact Form (Formspree).
- No tracking or analytics.