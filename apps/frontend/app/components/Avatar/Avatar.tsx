import { ArrowPathIcon, UserCircleIcon } from "@heroicons/react/20/solid";
import { Form, useFetcher, useTransition } from "@remix-run/react";
import clsx from "clsx";
import { useEffect } from "react";

const buttonClasses = clsx(
  "flex w-24 h-9 items-center flex-1 p-2 rounded whitespace-nowrap text-xs"
);

const Avatar = () => {
  const transition = useTransition();
  const fetcher = useFetcher();

  useEffect(() => {
    if (fetcher.type === "init") {
      fetcher.load("/login/authentication");
    }
  }, [fetcher]);

  if (fetcher.data?.authenticated) {
    return (
      <fetcher.Form method="delete" action="/login/authentication">
        <button
          className={clsx(
            buttonClasses,
            "bg-slate-300 gap-1",
            "hover:bg-slate-400",
            "disabled:bg-slate-200"
          )}
          id="avatar-menu"
          name="avatar-menu"
          disabled={fetcher.state === "submitting"}
        >
          {fetcher.data.authentication?.image_url ? (
            <img
              src={fetcher.data.authentication?.image_url}
              alt="user profile"
              className="rounded-full h-5 w-5 mr-1 max-w-none"
            ></img>
          ) : (
            <UserCircleIcon className="h-5 w-5 mr-1 text-slate-500" />
          )}
          <span>Sign out</span>
        </button>
      </fetcher.Form>
    );
  }

  return (
    <Form method="get" action="/login">
      <button
        className={clsx(
          buttonClasses,
          "justify-center font-semibold text-white",
          "bg-green-500 hover:bg-green-600 focus:bg-green-600",
          "disabled:bg-green-300"
        )}
        type="submit"
        disabled={transition.state !== "idle"}
      >
        {transition.state === "submitting" &&
        transition.location.pathname.includes("/login") ? (
          <ArrowPathIcon className="h-5 w-5 animate-spin" />
        ) : (
          "Connect"
        )}
      </button>
    </Form>
  );
};

export default Avatar;
