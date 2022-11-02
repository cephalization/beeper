import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";

type SearchProps = {
  className?: string;
  customClassNames?: {
    label?: string;
    inputContainer?: string;
    iconContainer?: string;
    input?: string;
    icon?: string;
  };
};

const Search = ({ className, customClassNames = {} }: SearchProps) => {
  return (
    <div className={clsx(className, "flex w-full h-9")}>
      <label
        className={clsx(customClassNames.label, "sr-only")}
        htmlFor="search-field"
      >
        Search
      </label>
      <div
        className={clsx(
          customClassNames.inputContainer,
          "relative w-full text-gray-400 focus-within:text-gray-600"
        )}
      >
        <div
          className={clsx(
            customClassNames.iconContainer,
            "pointer-events-none absolute inset-y-0 left-0 flex items-center"
          )}
        >
          <MagnifyingGlassIcon
            className={clsx(customClassNames.icon, "h-5 w-5 ml-2")}
            aria-hidden="true"
          />
        </div>
        <input
          id="search-field"
          className={clsx(
            customClassNames.input,
            "block h-full w-full border-transparent pl-10 pr-3 text-gray-900",
            "placeholder-gray-500 focus:border-transparent focus:placeholder-gray-400 focus:outline-none",
            "focus:ring-0 sm:text-sm bg-white rounded"
          )}
          placeholder="Search"
          type="search"
          name="search"
        />
      </div>
    </div>
  );
};

export default Search;
