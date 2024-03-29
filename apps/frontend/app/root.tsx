import type { MetaFunction, LinksFunction, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import ErrorFlash from "./components/ErrorFlash";

import Navbar from "./components/Navbar";
import {
  getAuthFromSession,
  getErrorFromSession,
  requestSession,
} from "./sessions";
import styles from "./styles/app.css";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Beeper",
  viewport: "width=device-width,initial-scale=1",
});

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: "https://rsms.me/inter/inter.css" },
  { rel: "stylesheet", href: styles },
];

export const loader = async ({ request }: LoaderArgs) => {
  const session = await requestSession(request);
  const auth = getAuthFromSession(session);
  const error = getErrorFromSession(session);

  return json({
    authentication: auth,
    error,
  });
};

export default function App() {
  const { authentication, error } = useLoaderData<typeof loader>();
  return (
    <html lang="en" className="bg-slate-100 p-2 sm:px-8 lg:px-24 xl:px-40">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Navbar authentication={authentication} />
        <section className="mt-4">
          <Outlet />
        </section>
        <ErrorFlash error={error} />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
