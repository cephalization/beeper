import { Link as RemixLink, type LinkProps } from "@remix-run/react";
import clsx from "clsx";

const classes =
  "text-cyan-600 underline visited:text-cyan-800 hover:text-cyan-900 hover:underline-offset-2 transition-all duration-150";

const Link = ({ className, children, to, ...props }: LinkProps) => {
  const mergedClassNames = clsx(className, classes);

  if (to.toString().startsWith("http")) {
    return (
      <a href={to.toString()} className={mergedClassNames} {...props}>
        {children}
      </a>
    );
  }

  return (
    <RemixLink to={to} className={mergedClassNames} {...props}>
      {children}
    </RemixLink>
  );
};

export default Link;
