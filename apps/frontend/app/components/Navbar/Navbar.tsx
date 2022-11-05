import clsx from "clsx";
import type { AuthSession } from "shared-types";
import Avatar from "../Avatar";
import Search from "../AutocompleteSearch";

type NavbarProps = {
  authentication: AuthSession | null;
};

const Navbar = ({ authentication }: NavbarProps) => {
  return (
    <nav
      className={clsx(
        "w-screen h-14 p-2 sm:px-24 flex gap-2 justify-center items-center"
      )}
    >
      <Search />
      <Avatar authentication={authentication} />
    </nav>
  );
};

export default Navbar;
