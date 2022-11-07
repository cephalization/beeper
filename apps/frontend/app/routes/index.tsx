import type { LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import { getAuthFromSession, requestSession } from "~/sessions";

export const loader = async ({ request }: LoaderArgs) => {
  const session = await requestSession(request);
  const auth = getAuthFromSession(session);

  if (auth) {
    return redirect("/dashboard");
  }

  return null;
};

export default function Index() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Beeper</h1>
      <div className="p-4 mt-4 rounded-sm bg-slate-200 font-light text-gray-600">
        <p>Search for tracks on spotify, see info about em.</p>
        <p>Connect your Spotify account to Beeper, see info about yourself.</p>
      </div>
    </div>
  );
}
