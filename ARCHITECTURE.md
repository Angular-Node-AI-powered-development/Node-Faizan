# Architecture: Modular Monolith

This document describes the design rationale for the Node-Faizan backend structure, following a **modular monolithic** approach: a single deployable application with features isolated into self-contained modules.

## Goals

- **Scalability**: Add new features without tangling with existing ones.
- **Maintainability**: Clear boundaries and separation of concerns.
- **Modular separation**: Each feature owns its routes, controller, service, model, and validation.

## Design principles

1. **Single deployable unit**  
   The application is one process and one deployment. No microservices; modules are logical boundaries inside the monolith.

2. **Feature isolation**  
   Each feature lives under `src/modules/<feature>/` with:
   - `<feature>.routes.js` — API routes and HTTP boundary
   - `<feature>.controller.js` — Request/response handling
   - `<feature>.service.js` — Business logic
   - `<feature>.model.js` — Data access / schema
   - `<feature>.validation.js` — Request validation

3. **No cross-module dependencies**  
   Modules do not import other feature modules. Shared logic goes in `src/utils` or `src/middleware`. Only `app.js` wires routes and thus knows about module names.

4. **Centralized cross-cutting concerns**  
   - **Config**: `config/` (db, logger, default.json) — no secrets in repo; use env.
   - **Errors**: `src/middleware/errorHandler.js` — one place for error handling and logging.
   - **Utils**: `src/utils/` — helpers, formatters, validators used across modules.

## Request flow

```
HTTP → routes → validation → controller → service → model (if needed)
                ↓
            response ← controller ← service
```

- **Routes**: Define URLs and HTTP methods; delegate to controller.
- **Validation**: Validate request (body, query, params) at the boundary; return 400 on failure.
- **Controller**: Extract input, call service, send response. No business logic.
- **Service**: Business logic; may use model for persistence.
- **Model**: Database or external data access; no HTTP or business rules.

## Adding a new feature

1. Create a folder: `src/modules/<feature>/`.
2. Add the five files: `<feature>.routes.js`, `.controller.js`, `.service.js`, `.model.js`, `.validation.js`.
3. In `src/app.js`, mount the routes, e.g. `app.use('/api/<feature>', featureRoutes)`.
4. Do not require other feature modules inside the new module; use `src/utils` or `src/middleware` for shared code.

## Configuration

- **config/default.json**: Non-secret defaults (port, log level, DB host/port/database name). Override via environment variables.
- **config/db.js**: PostgreSQL pool using `DATABASE_URL` or `DB_*` env vars.
- **config/logger.js**: Winston logger; level and file path from config/env.
- **.env**: Copy from `.env.example`; never commit real secrets.

## Code review checklist

- No `require()` from one feature module into another.
- Config accessed via `config/`; env via `process.env` after dotenv load.
- All errors go through `errorHandler` (use `next(err)` in controllers/async routes).
- New features follow the same five-file pattern and are only registered in `app.js`.

This structure keeps the monolith clean and ready to grow without losing clarity or introducing hidden coupling.
