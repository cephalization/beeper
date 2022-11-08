import { ArrowPathIcon, UserCircleIcon } from "@heroicons/react/20/solid";
import { Form, useTransition } from "@remix-run/react";
import clsx from "clsx";
import type { AuthSession } from "shared-types";

const buttonClasses = clsx("w-28 h-9 rounded whitespace-nowrap text-xs");

const subButtonClasses = clsx(
  "relative inline-flex items-center h-full w-full p-1",
  "transition-colors duration-200 hover:bg-slate-400 hover:text-gray-100 focus:z-10 focus:border-indigo-500",
  "focus:outline-none focus:ring-1 focus:ring-indigo-500"
);

type AvatarProps = {
  authentication: AuthSession | null;
};

const Avatar = ({ authentication }: AvatarProps) => {
  const transition = useTransition();

  const submittingLoginInformation =
    transition.state === "submitting" &&
    transition.location.pathname.includes("/login");

  if (authentication) {
    return (
      <div
        className={clsx(
          buttonClasses,
          "isolate inline-flex",
          "bg-slate-300",
          "disabled:bg-slate-200"
        )}
      >
        <Form className="flex" method="get" action="/dashboard">
          <button className={clsx(subButtonClasses, "rounded-l pl-1 pr-0")}>
            {authentication?.image_url ? (
              <img
                src={authentication.image_url}
                alt="user profile"
                className="rounded-full h-5 w-5 mr-1 max-w-none"
              ></img>
            ) : (
              <UserCircleIcon className="h-5 w-5 mr-1 text-slate-500" />
            )}
          </button>
        </Form>
        <Form
          method="delete"
          action="/login/authentication?method=delete"
          className="flex w-full justify-center"
        >
          <button
            className={clsx(subButtonClasses, "rounded-r justify-start pl-1")}
            id="avatar-menu"
            name="avatar-menu"
            disabled={submittingLoginInformation}
          >
            <span>Sign out</span>
          </button>
        </Form>
      </div>
    );
  }

  return (
    <Form method="get" action="/login">
      <button
        className={clsx(
          buttonClasses,
          "justify-center w-full items-center flex font-semibold text-white",
          "bg-green-500 hover:bg-green-600 focus:bg-green-600",
          "disabled:bg-green-300"
        )}
        type="submit"
        disabled={transition.state !== "idle"}
      >
        {submittingLoginInformation ? (
          <ArrowPathIcon className="h-5 w-5 animate-spin" />
        ) : (
          "Connect"
        )}
      </button>
    </Form>
  );
};

export default Avatar;
