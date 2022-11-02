import type { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { json, redirect } from "react-router";
import { validateAuthentication } from "~/cookies";

export const loader = async ({ request }: LoaderArgs) => {
  const [valid, authCookie] = await validateAuthentication(request);

  if (!valid) {
    return redirect("/");
  }

  return json({ authCookie });
};

const Dashboard = () => {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <pre className="overflow-x-scroll mt-4 bg-gray-400 text-slate-100 p-4 rounded-sm">
        {JSON.stringify(data.authCookie, null, 2)}
      </pre>
    </div>
  );
};

export default Dashboard;
