import { Combobox, Transition } from "@headlessui/react";
import { useFetcher, useNavigate } from "@remix-run/react";
import clsx from "clsx";
import { Fragment, useRef } from "react";
import type { AuthSession } from "shared-types";
import type { Track } from "shared-types/spotify/track";

type AutocompleteSearchProps = {
  className?: string;
  authentication?: AuthSession | null;
};

const AutocompleteSearch = ({
  className,
  authentication,
}: AutocompleteSearchProps) => {
  const fetcher = useFetcher();
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const tracks = fetcher.data?.results?.tracks?.items || [];

  return (
    <fetcher.Form
      className={clsx(className, "flex w-full items-center h-10")}
      action="/search"
      autoComplete="off"
    >
      <Combobox
        nullable
        name="search"
        value={null}
        onChange={(track: Track) => {
          if (track && authentication) {
            return navigate(`/track/${track.id}`);
          }
        }}
        disabled={!authentication}
      >
        <div className="relative w-full">
          <div
            className={clsx(
              "relative w-full cursor-default overflow-hidden rounded-lg text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm",
              authentication ? "bg-white" : "bg-slate-200"
            )}
          >
            <Combobox.Input
              className="w-full border-none text-base py-2 pl-3 pr-10 leading-5 rounded-lg text-gray-900 focus:ring-0"
              displayValue={(track: Track) => track?.name}
              onChange={(event) =>
                authentication &&
                fetcher.load(`/search?search=${event.currentTarget.value}`)
              }
              name="search"
              ref={inputRef}
              placeholder={
                authentication
                  ? "Search for a track"
                  : "Connect with Spotify to search"
              }
              disabled={!authentication}
            />
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {tracks.length === 0 ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  <p className="text-gray-400">
                    {fetcher.state === "loading"
                      ? "Loading..."
                      : inputRef.current?.value?.length
                      ? "Nothing found"
                      : "Results will load as you type"}
                  </p>
                </div>
              ) : (
                tracks.map((track: Track) => (
                  <Combobox.Option
                    onClick={() => {
                      if (inputRef.current?.value) {
                        inputRef.current.value = "";
                      }
                    }}
                    key={track.id}
                    className={({ active }) =>
                      clsx(
                        "block relative cursor-default select-none py-2 px-4",
                        !active && "text-gray-900",
                        active && "bg-green-600 text-white"
                      )
                    }
                    value={track}
                  >
                    {() => {
                      const optionText = `${track.name} - ${track.artists
                        .map((a) => a.name)
                        .join(", ")}`;
                      return (
                        <>
                          <span
                            title={optionText}
                            className={clsx("flex truncate")}
                          >
                            <img
                              src={track.album.images?.[0]?.url}
                              alt={`Album - ${track.album.name}`}
                              className="h-6 w-6 mr-5"
                            ></img>
                            {optionText}
                          </span>
                        </>
                      );
                    }}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </fetcher.Form>
  );
};

export default AutocompleteSearch;
