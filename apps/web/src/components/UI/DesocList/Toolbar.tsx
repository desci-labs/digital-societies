import { Input } from "components/Form/Index";
import { ChangeEvent } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { RiLoader5Fill } from "react-icons/ri";

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
          name="orgSearch"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            props.onhSearchTextChange(e.target.value)
          }
          value={props.searchText}
          className="border-none"
        />
        <label htmlFor="orgSearch">
          {props.isDebouncing ? (
            <RiLoader5Fill
              size={20}
              className="text-tint-primary-hover animate-spin"
            />
          ) : (
            <HiOutlineSearch className="text-tint-primary-hover" size={20} />
          )}
        </label>
      </div>
    </div>
  );
}
