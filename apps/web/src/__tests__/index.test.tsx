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
      () =>
        ({
          route: "/",
          pathname: "/s",
        } as NextRouter)
    );
  });

  it("Default page test", async () => {
    const { render } = await getPage({
      route: "/",
      useApp: false,
      dotenvFile: `${process.cwd()}/.env.local`,
      nextRoot: `${process.cwd()}`,
      wrappers: `${process.cwd()}/src/test/page-wrapper.tsx`,
    });
    render();
  });
});
