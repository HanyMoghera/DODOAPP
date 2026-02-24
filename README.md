# TodoApp

A modern, client-side Todo application built with React, featuring multi-page routing, form validation, and a clean UI powered by Tailwind CSS and Flowbite.

---

## 📁 Project Structure

```
src/
├── App.jsx
├── App.css
└── components/
    ├── Layout/        # Shared layout wrapper (navbar, footer, etc.)
    ├── Home/          # Home page
    ├── Profile/       # User profile page
    ├── Login/         # Login page
    ├── Register/      # Registration page
    └── Notfound/      # 404 fallback page
```

---

## 🚀 Getting Started

### Prerequisites

- A modern web browser
- [Node.js](https://nodejs.org/) v18 or higher *(only needed to run the Vite dev server — this is not a Node.js backend app)*
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd todoapp

# Install dependencies
npm install
```

### Scripts

| Command           | Description                      |
|-------------------|----------------------------------|
| `npm run dev`     | Start the development server     |
| `npm run build`   | Build for production             |
| `npm run preview` | Preview the production build     |
| `npm run lint`    | Run ESLint across the project    |

The dev server will be available at `http://localhost:5173`.

---

## 🛣️ Routes

| Path        | Component  | Description            |
|-------------|------------|------------------------|
| `/home`     | `Home`     | Main landing/home page |
| `/profile`  | `Profile`  | User profile page      |
| `/login`    | `Login`    | User login page        |
| `/register` | `Register` | New user registration  |
| `*`         | `Notfound` | 404 — page not found   |

All routes are nested under the shared `Layout` component, which provides consistent UI elements (e.g. navbar, footer) across all pages via React Router's `<Outlet />`.

> **Note:** The root path (`/`) has no redirect by default — consider adding a redirect from `/` to `/home` if needed.

---

## 🌐 Backend & API

This is a **frontend-only** React application. It does not include a custom backend. All data is fetched from a ready-made REST API using **Axios**.

To configure the API base URL, update the Axios instance or API calls in your source files to point to your API endpoint:

```js
// example
const BASE_URL = "https://your-api-url.com";
```

---

## 🧰 Tech Stack

### Core
- **[React 18](https://react.dev/)** — UI library
- **[React Router DOM v7](https://reactrouter.com/)** — Client-side routing with `createBrowserRouter`
- **[Axios](https://axios-http.com/)** — HTTP client for API requests
- **[Vite 7](https://vitejs.dev/)** — Fast build tool and dev server

### UI & Styling
- **[Tailwind CSS v4](https://tailwindcss.com/)** — Utility-first CSS framework
- **[Flowbite v4](https://flowbite.com/)** — Tailwind UI component library

### Forms & Validation
- **[React Hook Form](https://react-hook-form.com/)** — Performant, flexible form management
- **[@hookform/resolvers](https://github.com/react-hook-form/resolvers)** — Adapter to plug validation schemas into React Hook Form
- **[Zod](https://zod.dev/)** — TypeScript-first schema validation

### Dev Tools
- **ESLint** — Code linting with React Hooks and React Refresh plugins
- **TypeScript types** for React and React DOM (via `@types/*`)

---

## 📦 Dependencies Overview

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^7.13.0",
  "axios": "^1.13.5",
  "tailwindcss": "^4.2.0",
  "flowbite": "^4.0.1",
  "react-hook-form": "^7.71.2",
  "@hookform/resolvers": "^5.2.2",
  "zod": "^4.3.6"
}
```

---

## 📄 License

This project is open source. 
