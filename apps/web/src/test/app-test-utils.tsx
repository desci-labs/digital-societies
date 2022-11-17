import {
  render as renderUi,
  RenderOptions,
  RenderResult,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import AppProviders from "providers/AppProviders";
import { ReactElement } from "react";
export function render(
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
): RenderResult {
  const returnVal = renderUi(ui, { wrapper: AppProviders, ...options });
  return returnVal;
}

export const waitForLoadingToFinish = (): Promise<void> =>
  waitForElementToBeRemoved(() => [
    ...screen.queryAllByLabelText(/loading/i),
    ...screen.queryAllByText(/loading/i),
  ]);

export * from "@testing-library/react";
// export * from "@testing-library/user-event";
