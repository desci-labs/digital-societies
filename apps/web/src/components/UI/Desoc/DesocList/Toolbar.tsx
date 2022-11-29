import { Input } from "components/Form/Index";
import Icon from "components/Icons/Icons";
import { useLayoutContext } from "hooks/usePageScroll";
import { ChangeEvent } from "react";

export default function Toolbar(props: {
  searchText: string;
  isDebouncing: boolean;
  onhSearchTextChange: (text: string) => void;
}) {
  const { isScrolled } = useLayoutContext();
  return (
    <div
      className={`p-3 sticky top-0 duration-200 bg-transparent will-change-opacity ${
        isScrolled && "app-bg bg-opacity-10 backdrop-blur-xl z-30"
      }`}
    >
      <div className="container mx-auto min-w-80 w-80">
        <div className="mx-auto flex items-center p-1 px-3 border dark:border-white border-dark w-full">
          <Input
            placeholder="search"
            id="orgSearch"
            type="search"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              props.onhSearchTextChange(e.target.value)
            }
            value={props.searchText}
            className="border-none"
          />
          <label htmlFor="orgSearch">
            {props.isDebouncing ? (
              <Icon
                type="Loader"
                size={20}
                className="app-text animate-spin cursor-pointer"
              />
            ) : (
              <Icon
                type="Search"
                className="app-text cursor-pointer"
                size={25}
              />
            )}
          </label>
        </div>
      </div>
    </div>
  );
}
