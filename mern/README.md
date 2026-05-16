# Stackloom · MERN template

The runnable MERN application that ships with the
[`stackloom`](https://github.com/Abou-Sharif/stackloom) CLI. Use it as-is, or
let `loom new` scaffold a fresh copy and extend it with `loom generate
resource`.

- Express + MongoDB + Mongoose backend
- React + Vite + Tailwind frontend
- shadcn-style theme variables
- refresh-token auth with httpOnly cookies
- configurable frontend presets for layout, branding, content, and theme
- module-based backend structure for easy expansion

## Quick start

```bash
pnpm install
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
pnpm dev
```

Backend: `http://localhost:5000` · Frontend: `http://localhost:5173`

## Commands

| Command                | Purpose                           |
| ---------------------- | --------------------------------- |
| `pnpm dev`             | Run backend and frontend together |
| `pnpm build`           | Build the frontend                |
| `pnpm lint`            | Lint backend and frontend         |
| `pnpm -C backend dev`  | Run only the API                  |
| `pnpm -C frontend dev` | Run only the React app            |

## Scaffold & extend with `loom`

Install the CLI globally and run it from this template's root:

```bash
pnpm add -g stackloom

# full-stack CRUD resource — model, service, controller, routes, validator,
# admin pages, components, API client, hooks — generated, validated, linked
loom generate resource Product --fields "name:string:required;price:number"

loom check     # blueprint + anchor + env health
loom doctor    # environment health
```

Generation is all-or-nothing — every file is syntax-validated before anything
is written, and the change set rolls back on any failure. The engine reads
`.loom/blueprint.json` rather than hardcoding paths.

## Structure

```txt
mern/
├── .loom/
│   └── blueprint.json     # architecture contract — paths, roots, anchors
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── middlewares/
│   │   ├── modules/
│   │   │   └── auth/
│   │   ├── routes/
│   │   └── utils/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── config/
│   │   │   └── app-preset.js
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── routes/
│   │   └── styles/
│   └── package.json
├── pnpm-workspace.yaml
└── package.json
```

## Environment Variables

### Backend

| Variable                   | Purpose                                 |
| -------------------------- | --------------------------------------- |
| `NODE_ENV`                 | `development`, `test`, or `production`  |
| `PORT`                     | API port                                |
| `MONGODB_URI`              | MongoDB connection string               |
| `CLIENT_URL`               | Main frontend URL                       |
| `CORS_ORIGINS`             | Comma-separated allowed browser origins |
| `JWT_ACCESS_SECRET`        | Secret for short-lived access tokens    |
| `JWT_REFRESH_SECRET`       | Secret for refresh tokens               |
| `ACCESS_TOKEN_EXPIRES_IN`  | Default: `15m`                          |
| `REFRESH_TOKEN_EXPIRES_IN` | Default: `7d`                           |
| `BCRYPT_SALT_ROUNDS`       | Password hash cost                      |
| `COOKIE_NAME`              | Refresh cookie name                     |

### Frontend

| Variable       | Purpose                                           |
| -------------- | ------------------------------------------------- |
| `VITE_API_URL` | API base URL, usually `/api` in local development |

`loom env --sync` will append any missing keys from `.env.example` to `.env`.

## Auth Flow

This template uses a safer token split:

- Access token: short-lived, stored only in React memory.
- Refresh token: stored in an httpOnly cookie.
- App load: frontend calls `/auth/me`.
- Expired API request: Axios attempts one shared silent refresh and retries the original request once.
- Failed refresh: frontend clears local auth state.

Auth files:

- Backend routes: `backend/src/modules/auth/auth.routes.js`
- Backend service: `backend/src/modules/auth/auth.service.js`
- Backend model: `backend/src/modules/auth/auth.model.js`
- Frontend API client: `frontend/src/api/axiosInstance.js`
- Frontend auth context: `frontend/src/context/AuthContext.jsx`

## Frontend Presets

Most visual customization lives in `frontend/src/config/app-preset.js`.
Available presets: `saas`, `clinic`, `studio`, `operations`, `commerce`,
`shadcnPaste`. Switch by changing one line:

```js
export const appPreset = presetVariants.clinic;
```

You can also mix one preset's layout with another's theme:

```js
export const appPreset = {
  ...presetVariants.commerce,
  layout: designLayouts.sidebarWorkspace,
  theme: presetVariants.studio.theme,
};
```

## API Contract

Success:

```json
{ "success": true, "message": "Done", "data": {}, "meta": null }
```

Error:

```json
{ "success": false, "message": "Invalid input", "statusCode": 400 }
```

## License

MIT
