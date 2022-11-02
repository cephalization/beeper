import { redirect } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { getLogin } from "~/data/login";

export const loader = async () => {
  const res = await getLogin();

  if (res.redirected) {
    return redirect(res.url);
  }

  return redirect("/");
};

const Login = () => <Outlet />;

export default Login;
