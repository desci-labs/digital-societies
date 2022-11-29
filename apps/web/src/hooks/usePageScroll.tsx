import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const THRESHOLD = 0;

enum ScrollDirection {
  Up = "Up",
  Down = "Down",
  None = "None",
}

const getContext = createContext<{
  scrollDirection: ScrollDirection;
  isScrolled: boolean;
}>({ scrollDirection: ScrollDirection.None, isScrolled: false });

const setContext = createContext<{ setRoot: (root: HTMLDivElement) => void }>({
  setRoot: () => {},
});

export default function LayoutProvider(props: { children: ReactNode }) {
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(
    ScrollDirection.None
  );
  const [isScrolled, setIsScrolled] = useState(false);

  const blocking = useRef(false);
  const prevScrollY = useRef(0);
  const rootRef = useRef<HTMLDivElement>();

  const updateScrollDirection = () => {
    if (!rootRef.current) return;
    const scrollY = rootRef.current.scrollTop;

    if (scrollY <= 10) {
      setScrollDirection(ScrollDirection.None);
      setIsScrolled(false);
    } else if (Math.abs(scrollY - prevScrollY.current) >= THRESHOLD) {
      const newScrollDirection =
        scrollY > prevScrollY.current
          ? ScrollDirection.Down
          : ScrollDirection.Up;

      setScrollDirection(newScrollDirection);
      setIsScrolled(true);
      prevScrollY.current = scrollY > 0 ? scrollY : 0;
    }

    blocking.current = false;
  };

  const onScroll = () => {
    if (!blocking.current) {
      blocking.current = true;
      window.requestAnimationFrame(updateScrollDirection);
    }
  };

  useEffect(
    () => () => rootRef?.current?.removeEventListener("scroll", onScroll)
  );

  const setRoot = (root: HTMLDivElement) => {
    rootRef.current = root;
    rootRef.current.addEventListener("scroll", onScroll);
  };
  return (
    <setContext.Provider value={{ setRoot }}>
      <getContext.Provider value={{ scrollDirection, isScrolled }}>
        {props?.children && <>{props.children}</>}
      </getContext.Provider>
    </setContext.Provider>
  );
}

export function useLayoutContext() {
  const context = useContext(getContext);
  const setter = useContext(setContext);

  if (!context || !setter)
    throw Error("useLayoutContext is used outside LayoutProvider");

  return { ...context, ...setter };
}
