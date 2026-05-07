import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import { Link, NavLink } from "react-router";

import type { Route } from "./+types/root";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}


export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* 🔥 NAVBAR */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">

          {/* LOGO */}
          <NavLink to="/">
            <h1 className="text-xl font-bold text-gray-800 tracking-tight">
              🛍️ ProductHub
            </h1>
          </NavLink>

          {/* NAV LINKS */}
          <nav className="flex items-center gap-6 text-sm font-medium">

            <NavLink
              to="/"
              className={({ isActive }) =>
                `transition ${isActive
                  ? "text-blue-600"
                  : "text-gray-600 hover:text-blue-500"
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/products"
              className={({ isActive }) =>
                `transition ${isActive
                  ? "text-blue-600"
                  : "text-gray-600 hover:text-blue-500"
                }`
              }
            >
              Products
            </NavLink>

            <NavLink
              to="/add-product"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg transition ${isActive
                  ? "bg-blue-600 text-white"
                  : "bg-blue-500 text-white hover:bg-blue-600"
                }`
              }
            >
              + Add Product
            </NavLink>

          </nav>
        </div>
      </header>

      {/* 🔥 MAIN CONTENT */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        <Outlet />
      </main>

    </div>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
