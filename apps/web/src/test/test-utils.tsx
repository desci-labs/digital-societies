import Layout from "components/layout";
import {
  render as renderUi,
  RenderOptions,
  RenderResult,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { ThemeProvider } from "next-themes";
import AppProviders from "providers/AppProviders";
import { FC, ReactElement, ReactNode } from "react";

const Wrapper: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider attribute="class">
      <AppProviders>
        <Layout>{children}</Layout>
      </AppProviders>
    </ThemeProvider>
  );
};

export function customRender(
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
): RenderResult {
  const returnVal = renderUi(ui, { wrapper: Wrapper, ...options });
  return returnVal;
}

export const waitForLoadingToFinish = (): Promise<void> =>
  waitForElementToBeRemoved(() => [
    ...screen.queryAllByLabelText(/loading/i),
    ...screen.queryAllByText(/loading/i),
  ]);

export * from "@testing-library/react";
export { customRender as renderApp };
// export * from "@testing-library/user-event";
