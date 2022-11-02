import clsx from "clsx";
import Avatar from "../Avatar";
import Search from "../Search";

const Navbar = () => {
  return (
    <nav
      className={clsx(
        "w-screen h-14 p-2 sm:px-24 flex gap-2 justify-center items-center"
      )}
    >
      <Search />
      <Avatar />
    </nav>
  );
};

export default Navbar;
