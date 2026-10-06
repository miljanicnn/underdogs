# Underdogs

A Fantasy Premier League side game for friends' leagues: each gameweek you pick
a goalkeeper and five outfield players that fewer than 5% of FPL managers own.
Points come straight from official FPL scores. Finding the hidden gems is the game.

> **Status:** early development. The monorepo, API and web app skeleton are in
> place; game features are next (see [Roadmap](#roadmap)).

## Rules

- Each gameweek, pick 1 goalkeeper and 5 outfield players (at least 1 DEF, 1 MID and 1 FWD)
- Every player must be owned by less than 5% of FPL teams when you pick them
- No budget limits, no club limits, no captain, and a completely new team every week is allowed
- Your score is the sum of your six players' official FPL points

## Tech stack

| Area | Choice |
|---|---|
| Language | TypeScript |
| Frontend | React + Vite |
| Backend | Fastify |
| Database (planned) | PostgreSQL with Drizzle ORM |
| Auth (planned) | Better Auth |
| Repo | pnpm workspaces monorepo |

## Project structure

```
apps/web          React frontend
apps/api          Fastify API (will also run the scheduled FPL data import)
packages/shared   Types shared between frontend and backend
```

## Getting started

**Requirements:** Node.js 24+ and pnpm 10

```bash
pnpm install
pnpm dev
```

- Web app: http://localhost:5173
- API health check: http://localhost:3000/health

Other scripts, run from the root: `pnpm build` and `pnpm lint`.

## Roadmap

- [x] Monorepo with API and web app skeleton
- [x] Database and data model
- [x] Import gameweek and player data from the FPL API
- [ ] Import scores from the FPL API
- [ ] Sign up and log in
- [ ] Leagues: create and join with a code
- [ ] Pick your 5+1 team each gameweek
- [ ] Standings and gameweek results
- [ ] Deployment

## Disclaimer

This project is a personal coding exercise and isn't affiliated with the Premier League or FPL.