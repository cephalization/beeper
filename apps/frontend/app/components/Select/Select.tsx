import { ChevronRightIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";

type SelectProps = {
  name?: string;
  defaultValue?: any;
  options?: { id: string | number; value: any; label?: string }[];
  className?: string;
};

const Select = ({ name, defaultValue, options, className }: SelectProps) => {
  return (
    <div className={clsx("flex items-center gap-2", className)}>
      <select
        className="block w-full sm:w-auto rounded-md h-7 border-gray-300 pl-1 py-1 -ml-1 pr-10 text-base sm:text-sm"
        name={name}
        defaultValue={defaultValue}
      >
        {options &&
          options.map((option) => (
            <option key={option.id} value={option.value}>
              {option.label}
            </option>
          ))}
      </select>
      <button
        className={clsx(
          "sm:text-sm text-base h-7 flex items-center",
          "rounded-md px-2 py-1 bg-white text-black"
        )}
      >
        <ChevronRightIcon className="h-4 w-4" />
      </button>
    </div>
  );
};

export default Select;
