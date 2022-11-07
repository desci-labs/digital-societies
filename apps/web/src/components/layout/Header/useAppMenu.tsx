import useWindowSize from "hooks/useWindowSize";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const AppMenuContext = createContext(false);
const AppMenuContextUpdater = createContext({ toggleMenu: (event: any) => {} });

export default function AppMenuProvider({ children }: { children: ReactNode }) {
  const [opened, setOpened] = useState(true);
  const windowSize = useWindowSize();

  const toggleMenu = (_event: any) => {
    setOpened(!opened);
  };

  useEffect(() => {
    if (!windowSize) return;
    if (windowSize.width >= 768) return setOpened(true);
    if (windowSize.width <= 767) return setOpened(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowSize]);

  return (
    <AppMenuContext.Provider value={opened}>
      <AppMenuContextUpdater.Provider value={{ toggleMenu }}>
        {children}
      </AppMenuContextUpdater.Provider>
    </AppMenuContext.Provider>
  );
}

export const useMobileMenu = () => useContext(AppMenuContext);
export const useSetMobileMenu = () => useContext(AppMenuContextUpdater);
