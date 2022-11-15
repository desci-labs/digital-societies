import useLocalStorageState from "hooks/useLocalStorageState";
import { createContext, PropsWithChildren, ReactNode, useContext } from "react";

export type FormView = "form" | "preview";
const initialState: FormView = "form";
export const getContext = createContext<FormView>(initialState);
export const setContext = createContext({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setView: (view: FormView) => {},
});

export default function FormViewProvider({
  children,
}: PropsWithChildren<{ children: ReactNode }>) {
  const [view, setState] = useLocalStorageState<FormView>(
    "form_view_mode",
    initialState
  );

  const setView = (view: FormView) => {
    if (view !== null) {
      setState(view);
    }
  };
  return (
    <getContext.Provider value={view}>
      <setContext.Provider value={{ setView }}>{children}</setContext.Provider>
    </getContext.Provider>
  );
}

export const useGetFormView = () => useContext(getContext);
export const useSetFormView = () => useContext(setContext);
