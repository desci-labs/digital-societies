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

export const ImageIcon = (props: IconProps) => {
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";
  return (
    <svg width={props.width ?? 50}
      height={props.heigth ?? 50} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g opacity="0.5">
        <path d="M60.0891 20.7992L44.9578 5.66094C44.5359 5.23906 43.9594 5 43.3617 5H13.5C12.2555 5 11.25 6.00547 11.25 7.25V65.75C11.25 66.9945 12.2555 68 13.5 68H58.5C59.7445 68 60.75 66.9945 60.75 65.75V22.3883C60.75 21.7906 60.5109 21.2211 60.0891 20.7992ZM28.125 28.7656C29.6789 28.7656 30.9375 30.0242 30.9375 31.5781C30.9375 33.132 29.6789 34.3906 28.125 34.3906C26.5711 34.3906 25.3125 33.132 25.3125 31.5781C25.3125 30.0242 26.5711 28.7656 28.125 28.7656ZM48.9375 49.4375H23.0625C22.5914 49.4375 22.3313 48.8961 22.6195 48.5305L29.6367 39.5867C29.6893 39.5195 29.7566 39.4651 29.8333 39.4277C29.9101 39.3903 29.9943 39.3709 30.0797 39.3709C30.1651 39.3709 30.2493 39.3903 30.3261 39.4277C30.4028 39.4651 30.47 39.5195 30.5227 39.5867L33.4125 43.2711L38.8828 36.2961C38.9354 36.2289 39.0027 36.1745 39.0794 36.1371C39.1562 36.0997 39.2404 36.0803 39.3258 36.0803C39.4112 36.0803 39.4954 36.0997 39.5722 36.1371C39.6489 36.1745 39.7161 36.2289 39.7687 36.2961L49.3664 48.5305C49.6687 48.8961 49.4016 49.4375 48.9375 49.4375ZM42.3281 23.4219V10.1891L55.5609 23.4219H42.3281Z" fill={isLight ? "black" : "white"} />
      </g>
    </svg>

  );
};
