# SparkByte NoKoGiNi

## Project Overview

**SparkByte NoKoGiNi** is a real-time chat application built with **Next.js** and **Supabase**.
It provides a complete **user authentication system** and **real-time messaging**, supporting multiple users chatting simultaneously.
References: `nokogini:18-18`, `nokogini:29-29`.

## Key Features

### User Authentication System

* User registration and login
* Forgot password functionality
* Password update feature
* Secure authentication powered by **Supabase Auth**
  References: `nokogini:8-11`

### Real-Time Chat Functionality

* Instant message sending and receiving
* Real-time synchronization using **Supabase Realtime**
* Messages grouped by date
* Auto-scrolling to the latest message
* User avatars displayed in chat
  References: `nokogini:74-94`

### UI Features

* Responsive design for both mobile and desktop
* Light/Dark theme toggle
* Modern interface built with **Radix UI** and **Tailwind CSS**

## Tech Stack

### Frontend Framework

* **Next.js (latest)** — React framework with Turbopack support
* **React 19** — UI library
* **TypeScript** — Type-safe development
  References: `nokogini:20-23`

### UI Component Libraries

* **Tailwind CSS** — Utility-first CSS framework
* **Radix UI** — Accessible UI components
* **Lucide React** — Icon library
* **next-themes** — Theme switching
  References: `nokogini:10-19`

### Backend Services

* **Supabase** — Database, authentication, and realtime features
* **@supabase/ssr** — Server-side rendering support
  References: `nokogini:14-15`

## Quick Start

### Environment Variables

Create a `.env.local` file in the project root and add:

```
NEXT_PUBLIC_SUPABASE_URL=your_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY=your_SUPABASE_ANON_KEY
```

References: `nokogini:13-14`

### Database Setup

After setting up your Supabase project and environment variables, you need to create the required database tables:

1. Go to your [Supabase Dashboard](https://app.supabase.com)
2. Navigate to SQL Editor
3. Run the SQL script from `supabase/profiles_table.sql` or see `SETUP_DATABASE.md` for detailed instructions

This will create the `profiles` table needed for the nickname feature.

### Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### Development Mode

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

The app will start at **[http://localhost:3000](http://localhost:3000)**.
References: `nokogini:3-7`

### Build for Production

```bash
npm run build
npm run start
```

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── auth/               # Authentication pages (login, register, etc.)
│   ├── protected/          # Protected chat pages
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Homepage
├── component/              # React components
│   ├── chat-component.tsx  # Chat component
│   ├── auth-button.tsx     # Authentication button
│   ├── hero.tsx            # Hero section
│   └── tutorial/           # Tutorial components
├── components/ui/          # Base UI components
├── lib/                    # Utility functions
│   └── supabase/           # Supabase client configuration
└── middleware.ts           # Session management middleware
```

References: `nokogini:1-6`

## Core Functionality

### Session Management

The app uses middleware to automatically manage user sessions and ensure persistent authentication.
References: `nokogini:8-20`

### Real-Time Message Synchronization

Chat messages are synced in real-time using **Supabase Realtime**, which listens for database changes and pushes updates instantly.
References: `nokogini:46-70`

### Message Sending

Messages can be sent by pressing **Enter** (use **Shift + Enter** for a new line).
The chat automatically scrolls to the latest message.
References: `nokogini:101-128`

## Database Configuration

In Supabase, create the following table:

**`messages` table** — Stores chat messages

* `id` (uuid, primary key)
* `content` (text) — message content
* `user_id` (uuid) — user ID
* `created_at` (timestamp) — creation time

Enable **Realtime** and configure appropriate **RLS (Row Level Security)** policies.

## Notes

This project is a **full-stack real-time chat application** demonstrating how to combine **Next.js 14+ App Router** and **Supabase** to build a modern web app.
It uses the latest **React 19** and **Next.js** features, including **Server Components** and **Server Actions**.

### Highlights

* Type-safe development with **TypeScript**
* Enhanced performance using **Server Components**
* Complete authentication flow
* True real-time communication via **Supabase Realtime**
* Responsive design for all devices
* Light/Dark theme support

The name **“NoKoGiNi”** may originate from a Japanese word or concept, while **“SparkByte”** serves as the branding prefix for this project.