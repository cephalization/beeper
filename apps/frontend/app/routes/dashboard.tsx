import type { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { json, redirect } from "react-router";
import { getAuthFromSession, requestSession } from "~/sessions";

export const loader = async ({ request }: LoaderArgs) => {
  const session = await requestSession(request);
  const auth = getAuthFromSession(session);

  if (!auth) {
    return redirect("/");
  }

  return json({ auth });
};

const Dashboard = () => {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <pre className="overflow-x-scroll mt-4 bg-gray-400 text-slate-100 p-4 rounded-sm">
        {JSON.stringify(data.auth, null, 2)}
      </pre>
    </div>
  );
};

export default Dashboard;
