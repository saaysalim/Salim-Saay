# Digital Portfolio - Salim Saay

A component-based digital portfolio built with React, TypeScript, Vite, and Redux Toolkit.

This project presents academic profile, publications, projects, media, and an interactive post feed with optional backend support.

## Live Site
- GitHub Pages: https://saaysalim.github.io/Salim-Saay/

## Project Goals
- Present a professional and academic profile in a modern web UI.
- Keep content modular using reusable React components.
- Support both static hosting and richer local mode with a Node.js API.
- Maintain a clean structure that can grow over time.

## Tech Stack
- Frontend: React 18, TypeScript, Vite 6
- State management: Redux Toolkit, React Redux
- UI primitives: Radix UI + utility UI components
- Styling: utility-first class approach with shared global styles
- Icons: Lucide React
- Optional backend: Node.js + Express (JSON-file persistence)

## Features
- Multi-section portfolio navigation (single-page app behavior)
- About, Education, Projects, Publications, Contact, Gallery, Video Gallery sections
- Post feed with likes, comments, image support, and local fallback
- Simple auth flow for posting when backend is running
- Responsive header navigation with mobile menu

## Component-Based Architecture
The app is built around isolated feature components composed by a single root container.

- App shell:
  - Header (navigation)
  - Main content (page-level feature component rendered by current route state)
  - Footer
- Feature components:
  - About, Projects, Contact, Education, Publications, Gallery, VideoGallery, Blog, PostFeed
- Shared UI layer:
  - Reusable primitives from src/components/ui (card, button, dialog, input, etc.)
- State layer:
  - Redux store with auth and posts slices

A detailed architecture document is available at:
- ARCHITECTURE.md

## Folder Structure

```text
.
|-- src/
|   |-- App.tsx
|   |-- main.tsx
|   |-- components/
|   |   |-- Header.tsx
|   |   |-- Footer.tsx
|   |   |-- About.tsx
|   |   |-- Projects.tsx
|   |   |-- Contact.tsx
|   |   |-- Education.tsx
|   |   |-- Publications.tsx
|   |   |-- Gallery.tsx
|   |   |-- VideoGallery.tsx
|   |   |-- Blog.tsx
|   |   |-- PostFeed.tsx
|   |   |-- ui/
|   |   `-- figma/
|   |-- store/
|   |   |-- store.ts
|   |   |-- postsSlice.ts
|   |   `-- authSlice.ts
|   |-- styles/
|   `-- assets/
|-- server/
|   |-- index.js
|   |-- posts.json
|   |-- users.json
|   `-- sessions.json
|-- build/
|-- vite.config.ts
`-- package.json
```

## Local Development

### 1) Install frontend dependencies

```powershell
npm install
```

### 2) Run frontend (Vite)

```powershell
npm run dev
```

By default, Vite is configured to run on port 3000.

### 3) Build frontend

```powershell
npm run build
```

Output is generated in build/.

## Optional Backend (Post Feed API)
The frontend can run without the backend, but PostFeed gets full functionality when server is running.

### Start backend

```powershell
cd server
npm install
npm start
```

Server runs on http://localhost:5000.

### API Endpoints
- GET /posts
- POST /posts
- DELETE /posts/:id
- POST /posts/:id/comments
- POST /posts/:id/likes
- POST /auth/register
- POST /auth/login

## Deployment
This project is configured for GitHub Pages with:
- Vite base path: /Salim-Saay/
- Build output folder: build/

Deployment references:
- README-DEPLOY.md
- DEPLOY_TO_GITHUB_PAGES.md

## Known Notes
- If backend is unavailable, PostFeed falls back to localStorage.
- Current backend auth and persistence are for development/demo use only.

## Recommended Next Improvements
- Add a client-side router for URL-based navigation.
- Move static content into structured JSON or CMS source.
- Add automated tests for PostFeed reducers and API behavior.
- Harden backend auth and password storage for production readiness.

## Author
Salim Saay
