import { Input } from "components/Form/Index";
import Icon from "components/Icons/Icons";
import { ChangeEvent } from "react";

export default function Toolbar(props: {
  searchText: string;
  isDebouncing: boolean;
  onhSearchTextChange: (text: string) => void;
}) {
  return (
    <div className="mx-auto app-bg min-w-80 w-80 sticky top-0 backdrop-filter backdrop-blur-sm">
      <div className="flex items-center p-1 px-3 border border-text">
        <Input
          placeholder="search"
          id="orgSearch"
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
              className="text-tint-primary-hover animate-spin cursor-pointer"
            />
          ) : (
              <Icon type="Search" className="text-tint-primary-hover cursor-pointer" size={25} />
          )}
        </label>
      </div>
    </div>
  );
}
