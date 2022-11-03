import { type LoaderArgs, redirect } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { getLogin } from "~/data/api/login";
import { getAuthFromSession, requestSession } from "~/sessions";

export const loader = async ({ request }: LoaderArgs) => {
  const session = await requestSession(request);
  const auth = getAuthFromSession(session);

  // don't try to login again if already logged in
  if (auth) {
    return redirect("/");
  }

  const res = await getLogin();

  if (res.redirected) {
    return redirect(res.url);
  }

  return redirect("/");
};

const Login = () => <Outlet />;

export default Login;
