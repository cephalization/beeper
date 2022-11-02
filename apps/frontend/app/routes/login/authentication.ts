import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { authentication, validateAuthentication } from "~/cookies";

export const loader = async ({ request }: LoaderArgs) => {
  const [valid, authCookie] = await validateAuthentication(request);

  return json({
    authenticated: valid,
    authentication: authCookie,
  });
};

export const action = async ({ request }: ActionArgs) => {
  if (request.method.toLowerCase() === "delete") {
    return redirect("/", {
      headers: {
        "Set-Cookie": await authentication.serialize(null, {
          expires: new Date(0),
        }),
      },
    });
  }

  return null;
};
