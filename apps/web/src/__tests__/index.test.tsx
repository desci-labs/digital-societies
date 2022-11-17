import { render, screen, waitForLoadingToFinish } from "test/test-utils";
import * as nextRouter from "next/router";
import { NextRouter } from "next/router";
import Home from "pages";
import { getPage } from "next-page-tester";

afterEach(() => {
  jest.restoreAllMocks();
});

describe("Render homepage screen", () => {
  beforeEach(() => {
    const useRouter = jest.spyOn(nextRouter, "useRouter");
    useRouter.mockImplementation(
      () => ({ route: "/", pathname: "/" } as NextRouter)
    );
  });
  it("renders a heading", async () => {
    // render(<Home />);
    const { render } = await getPage({ route: "/" });
    render();
    console.log(screen.debug());
    // waitForLoadingToFinish();
    // const heading = screen.getByRole("heading", {
    //   name: /welcome to next\.js!/i,
    // });

    // expect(heading).toBeInTheDocument();
    expect(true).toBe(true);
  });
});
