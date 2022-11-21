import * as nextRouter from "next/router";
import { NextRouter } from "next/router";
import { getPage } from "next-page-tester";

afterEach(() => {
  jest.restoreAllMocks();
});

describe("Render App", () => {
  beforeEach(() => {
    const useRouter = jest.spyOn(nextRouter, "useRouter");
    useRouter.mockImplementation(
      () => ({ route: "/", pathname: "/" } as NextRouter)
    );
  });
  it("Render explore page", async () => {
    const { render } = await getPage({ route: "/" });
    render();
  });
});
