import React from "react";
import { render, screen } from "@testing-library/react";
import Loading from "../Loading";

describe("Loading component", () => {
  test("renders a container with the correct class and data-testid and 5 length", () => {
    const { getByTestId } = render(<Loading />);

    const loadingContainer = getByTestId("loading-container");
    expect(loadingContainer).toBeDefined();
    expect(loadingContainer.childElementCount).toEqual(5);
  });
});
