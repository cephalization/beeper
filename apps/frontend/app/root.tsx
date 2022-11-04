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

import Navbar from "./components/Navbar";
import { getAuthFromSession, requestSession } from "./sessions";
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

  return json({
    authentication: auth,
  });
};

export default function App() {
  const { authentication } = useLoaderData<typeof loader>();
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="bg-slate-100">
        <Navbar authentication={authentication} />
        <section className="p-2 sm:p-8 sm:px-24">
          <Outlet />
        </section>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
