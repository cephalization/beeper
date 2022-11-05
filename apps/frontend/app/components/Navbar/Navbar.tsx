import clsx from "clsx";
import type { AuthSession } from "shared-types";
import Avatar from "../Avatar";
import Search from "../AutocompleteSearch";

type NavbarProps = {
  authentication: AuthSession | null;
};

const Navbar = ({ authentication }: NavbarProps) => {
  return (
    <nav className={clsx("w-full h-14 flex gap-2 justify-center items-center")}>
      <Search />
      <Avatar authentication={authentication} />
    </nav>
  );
};

export default Navbar;
