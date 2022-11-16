import Home from "../pages/index";
import "@testing-library/jest-dom";
import { render, screen } from "test/app-test-utils";

describe("Home", () => {
  it("renders a heading", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", {
      name: /welcome to next\.js!/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
