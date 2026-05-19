# Implementation Plan - AI Football Prediction App (SportyBet Assistant)

This plan outlines the steps to build a mobile-friendly AI-powered football prediction application. Since there is no server-side database (Supabase/Postgres) in this environment, all persistence will be handled via client-side `localStorage`.

## Scope & Non-Goals
- **Scope**: Frontend UI for predictions, integration with football APIs (mocked or client-side fetch), AI prediction logic (simulated or API-based), user history and settings stored in `localStorage`.
- **Non-Goals**: Real server-side user authentication, persistent database across devices, background notification service (will use browser Notifications API if permitted).

## Assumptions & Open Questions
- **Football API**: We will assume use of a public API like `API-Football` or similar. For the demo, we will provide a robust mocking layer to simulate live data and AI analysis.
- **AI Logic**: Complex ML models usually run on a server. We will implement a sophisticated heuristic/statistical analysis engine in TypeScript to simulate the "AI" behavior client-side.
- **SportyBet Integration**: This app is an *assistant* for SportyBet users. Direct API integration with SportyBet (placing bets) is likely restricted/private, so we will focus on providing data and copyable predictions/betting IDs.

## Affected Areas
- **Frontend**: All UI components (Shadcn UI), routing, state management.
- **Data Layer**: Service layer for fetching match data and calculating predictions.
- **Storage**: `localStorage` for saving user history, preferences, and "accounts".

## Phase 1: Foundation & Project Setup
- **Deliverables**: App shell, routing, and theme configuration.
- **Owner**: `frontend_engineer`
- **Details**:
    - Set up React Router for navigation (Home, Predictions, History, Profile).
    - Configure global styles (Football/SportyBet themed - Red/Yellow/Black).
    - Initialize `localStorage` keys and basic state.

## Phase 2: Data Service & Mock AI Engine
- **Deliverables**: A service layer that simulates football data fetching and prediction generation.
- **Owner**: `frontend_engineer`
- **Details**:
    - Create `FootballService` to fetch (or mock) match schedules, H2H, and stats.
    - Create `PredictionEngine` that takes match stats and returns probabilities (Win/Draw/Loss, BTTS, O/U 2.5).
    - Implement logic for "Confidence Percentage" and "Safe Betting" options.

## Phase 3: Match Predictions UI
- **Deliverables**: Match list, detailed prediction cards, and accumulator suggestions.
- **Owner**: `frontend_engineer`
- **Details**:
    - Build `MatchCard` component showing teams, time, and basic odds.
    - Build `PredictionDetails` view with charts for probabilities and AI reasoning (injuries, form).
    - Build `AccumulatorBuilder` to suggest multi-bet combinations.

## Phase 4: User Features (History & Profile)
- **Deliverables**: Betting history tracker and "user account" simulation.
- **Owner**: `frontend_engineer`
- **Details**:
    - Implement "Save Prediction" feature to `localStorage`.
    - Create a "History" page to track the success of previous AI predictions.
    - Add a "Notification" toggle (using Browser Notification API).

## Phase 5: Polishing & Mobile Optimization
- **Deliverables**: Refined UX, mobile-first adjustments, and final bug fixes.
- **Owner**: `quick_fix_engineer`
- **Details**:
    - Ensure all tables and charts are responsive.
    - Add subtle animations and loading states.
    - Review copy and alignment with SportyBet aesthetic.

## Sequencing Constraints
- Phase 2 must be mostly complete before Phase 3 can display real data.
- User history (Phase 4) depends on the prediction data structure defined in Phase 2.
