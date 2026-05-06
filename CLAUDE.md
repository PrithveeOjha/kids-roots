# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # start Vite dev server (localhost:5173)
npm run build      # production build → dist/
npm run lint       # ESLint across all .js/.jsx files
npm run preview    # preview the production build locally
```

Requires **Node.js ≥ 20.19.0** (Vite 7 constraint). The `engines` field in `package.json` enforces this.

If the system Node is older, use nvm:
```bash
nvm install 20 && nvm use 20
```

There are no tests in this project.

### Running the API locally

`vite.config.js` proxies `/api/*` → `http://localhost:3001`. The API is handled by Vercel serverless functions in `api/`. To run both together:

```bash
npm run dev                                          # terminal 1 — Vite on :5173
GROQ_API_KEY=<key> vercel dev --listen 3001          # terminal 2 — API on :3001
```

`GROQ_API_KEY` must be set. In CI/production it lives in Vercel's environment variables. For local dev, add it to `.env.local` or pass it inline as above.

## Architecture

### Routing & Layout
- `src/App.jsx` — BrowserRouter + AuthProvider + AppRoutes.
- `src/routes/AppRoutes.jsx` — All routes. Only `/` is wrapped in `GlobalLayout` (adds the Navbar). All dashboard and auth routes are **standalone** — no top Navbar.
- `src/components/PrivateRoute.jsx` — Guards dashboard routes; redirects to `/auth` if unauthenticated.
- `src/pages/AuthRedirect.jsx` — Post-login redirect: reads `userProfile.role` from Firestore and routes to the correct dashboard.

### Auth & Role System
- `src/firebase.js` — Initialises Firebase; exports `auth`, `db` (Firestore), `googleProvider`.
- `src/contexts/AuthContext.jsx` — Single source of truth. Exposes `currentUser`, `userProfile`, `userRole`, `signup`, `login`, `loginWithGoogle`, `logout`. Fetches Firestore profile on auth state change (one-time `getDoc`).
- Roles: `parent` | `child` | `expert` | `admin`. Stored in `users/{uid}.role`.
- Google sign-in domains must be whitelisted in **Firebase Console → Authentication → Authorized Domains**.

### Firestore Data Model

```
users/{uid}
  — { uid, displayName, email, role, xp, age, createdAt,
      linkedChildUid, linkedParentUid, linkedParentName,   ← parent↔child link
      screenTimeLimit }                                    ← minutes, 0 = no limit

users/{uid}/growthHistory/{id}
  — { age, height, weight, bmi, status, timestamp }

users/{uid}/screenTime/{YYYY-MM-DD}
  — { seconds: N }                                        ← child's daily app usage

community/{id}
  — { uid, displayName, content, category, imageUrl, likes[], likesCount, timestamp }

community/{postId}/comments/{id}
  — { uid, displayName, content, timestamp }

assessments/{id}
  — { childUid, childName, question, correct, xpEarned, timestamp }

consultations/{id}
  — { parentUid, childName, childAge, concern, timestamp, response?, expertName? }
```

### Dashboard Pages

Each dashboard is a **self-contained full-screen page** with its own sidebar/tab bar. Sidebar and main panel each scroll independently.

| Route | File | Notes |
|---|---|---|
| `/parent` | `parentDash.jsx` | Tabs: Overview, Growth Tracker, Vaccine Planner, Nutrition Guide, Community, Ask Expert, Resources, AI Assistant |
| `/child` | `childDash.jsx` | Tabs: Home, Quiz, Stories, Games, Achievements. XP + screen time persisted to Firestore. |
| `/expert` | `expertDash.jsx` | Tabs: Overview, Consultations, Growth Insights, My Profile |
| `/admin` | `adminDash.jsx` | Tabs: Overview, All Users, Activity Log |

### Key Parent Dashboard Features

- **My Child card** — links to a child account by email. Uses `onSnapshot` on `users/{childUid}` so XP/level update in real-time.
- **Mood analysis** — `analyzeMood()` (defined at the top of `parentDash.jsx`) categorises quiz questions by keyword (empathy, honesty, safety, anger) and returns per-category scores + trend.
- **Screen time control** — parent sets `screenTimeLimit` (minutes) on the child's Firestore doc. `users/{childUid}/screenTime/{date}` is watched via `onSnapshot` to show live usage.
- **AI Assistant** — calls `POST /api/chat`. Has a "Use child's data" toggle that, when on, appends the child's quiz results, mood scores, and screen time as context to the Groq system prompt.

### Key Child Dashboard Features

- **Screen time timer** — on mount, reads `screenTimeLimit` from the user's Firestore doc and today's usage from `users/{uid}/screenTime/{today}`. Runs a 1-second interval; saves to Firestore every 60 s. Shows `⏱ mm:ss` badge in the top bar. Renders a full-screen lock overlay when the limit is reached.
- **Quiz** — questions are bucketed by age group (`tiny` / `kid` / `tween`). Results saved to `assessments/` collection with XP earned.

### API Layer

`api/chat.js` — Vercel serverless function (ESM). Calls **Groq** (`llama-3.3-70b-versatile`) with an OpenAI-compatible request. Accepts `{ messages, childContext? }`. If `childContext` is present it is appended to the system prompt. Requires `GROQ_API_KEY` env var.

### Styling

All styles are **inline JS objects** (`const s = { ... }`). No CSS modules, no Tailwind. Each dashboard file defines a shared colour palette as `const C = { purple, green, orange, red, bg, card, border }` at the top.

### Python Logic

`src/python_logic/` holds the original Python reference implementations (`growth_tracker.py`, `vaccine_tracker.py`). These are **not executed** — logic is ported into `parentDash.jsx` as plain JS. Keep the Python files as the algorithmic source of truth.

## Git Remotes

- `origin` — `PrithveeOjha/kids-roots` (main working repo)
- `upstream` — `khushiipandit/Chilsd-s_Root` (Khushi's repo; sync source)
- `fork` — `PrithveeOjha/Chilsd-s_Root` (used to open PRs to Khushi's repo)

To sync new commits to the open PR (`prithvee-features` on `fork`):
```bash
git checkout prithvee-features
git cherry-pick <new-commit-hash>...
git push fork prithvee-features
git checkout main
```
