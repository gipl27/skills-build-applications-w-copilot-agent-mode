# OctoFit Tracker Frontend

React 19 presentation tier for the OctoFit Tracker multi-tier application.

## API configuration

The frontend builds API URLs with Vite environment variables through `import.meta.env`.

When running in GitHub Codespaces, define `VITE_CODESPACE_NAME` in `.env.local`:

```env
VITE_CODESPACE_NAME=your-codespace-name
```

Codespaces API requests use:

```text
https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/
```

When `VITE_CODESPACE_NAME` is unset, the app safely falls back to local VS Code development:

```text
http://localhost:8000/api/[component]/
```

Use `.env.local.example` as the template for local configuration.
