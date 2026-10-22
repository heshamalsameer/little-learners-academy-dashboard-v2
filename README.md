# Little Learners Academy — Admin Dashboard

An admin dashboard for managing every section of the Little Learners Academy website. Built with React, TypeScript, Redux Toolkit and Tailwind CSS on top of a Node.js / MongoDB REST API.

## Features

- Secure login with protected routes
- Full CRUD for benefits, testimonials, FAQ, history, mission & vision, team members, special features, admission process, fee structure, subjects, activities, rooms, awards, events and additional services
- Contact form inbox with delete confirmation
- Image uploads with previews
- Skeleton loaders, progress indicators, toasts and confirmation dialogs
- Responsive layout with a collapsible sidebar
- Installable PWA

## Tech Stack

React 18 · TypeScript · Vite · Redux Toolkit · React Hook Form · Tailwind CSS · Headless UI · Swiper · Axios · Vite PWA

## Getting Started

```bash
npm install
cp .env.example .env
npm run dev
```

| Variable | Description |
| --- | --- |
| `VITE_API_URL` | Base URL of the backend API |

## Deployment

Ready for Vercel: framework preset **Vite**, output `dist`. `vercel.json` handles SPA routing.
