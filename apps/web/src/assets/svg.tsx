import { useTheme } from "next-themes";

type IconProps = {
  width?: string;
  heigth?: string;
  fill?: string;
  className?: string;
};

export const DesocIcon = (props: IconProps) => {
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";
  return (
    <svg
      width={props.width ?? 28}
      height={props.heigth ?? 28}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.3001 12.633L1.74668 7.78284L14.3001 26.2589V12.633Z"
        fill={isLight ? "black" : "white"}
      />
      <path
        d="M21.8679 5.89551L27.4195 7.57152L14.3725 26.9078L1.23877 7.57047L6.80809 5.90571M21.8856 6.17091L26.9001 7.62504L14.305 12.3594L1.75624 7.62504L6.75492 6.15561M14.3001 12.633L1.74668 7.78284L14.3001 26.2589V12.633Z"
        stroke={isLight ? "black" : "white"}
        strokeWidth="1.09086"
        strokeLinejoin="round"
      />
      <path
        d="M14.3417 1.34039C18.7766 1.34039 22.142 4.01719 22.316 7.12008C21.4022 7.86209 20.5486 8.47657 19.426 8.92332C18.2198 9.40337 16.6658 9.70355 14.3548 9.70355C9.88024 9.70355 7.55393 8.57696 6.33859 7.17967C6.40342 5.64166 7.24204 4.22001 8.62925 3.15382C10.0747 2.04283 12.0936 1.34039 14.3417 1.34039Z"
        fill={isLight ? "black" : "white"}
        stroke={isLight ? "black" : "white"}
        strokeWidth="1.08898"
      />
    </svg>
  );
};

export const MenuIcon = (props: IconProps) => {
  return (
    <svg
      className="w-6 h-6 text-gray-500 hover:text-black dark:text-white dark:hover:text-white"
      x-show="!showMenu"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
};
