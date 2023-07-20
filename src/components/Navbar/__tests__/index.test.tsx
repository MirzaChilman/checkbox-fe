import { render } from "@testing-library/react";
import Navbar from "..";

describe("Navbar", () => {
  it("renders the navbar component with correct navigation links", () => {
    const { queryAllByTestId } = render(<Navbar />);

    expect(queryAllByTestId("navbar-link")).toHaveLength(4);
  });
});
