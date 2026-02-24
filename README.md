# Node-Faizan

Modular monolithic Node.js backend with Express and PostgreSQL. Each feature is an isolated module with clear separation of routes, controller, service, model, and validation.

## Prerequisites

- Node.js >= 18
- PostgreSQL (optional for health-only; required for features that use the DB)
- npm

## Folder structure

```
/
├── config/           # DB, logger, default settings
├── src/
│   ├── modules/      # Feature modules (e.g. health)
│   ├── middleware/   # Global middleware (e.g. errorHandler)
│   ├── utils/        # Shared helpers
│   ├── app.js        # Express app bootstrap
│   └── server.js     # Server entry
├── logs/             # Application log files
├── public/           # Static assets
├── tests/            # Test suite
└── .github/workflows/ # CI
```

See [ARCHITECTURE.md](ARCHITECTURE.md) for design rationale and how to add new modules.

## Setup

1. Clone and install:

   ```bash
   npm install
   ```

2. Copy environment template and adjust:

   ```bash
   cp .env.example .env
   ```

3. Start the server:

   ```bash
   npm start
   ```

   Dev with auto-reload:

   ```bash
   npm run dev
   ```

4. Health check:

   ```bash
   curl http://localhost:3000/api/health
   ```

## Tests

```bash
npm test
```

CI runs on push/PR to `main`: install, tests, and a quick app-load check.

## License

ISC
