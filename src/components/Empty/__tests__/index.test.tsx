import React from "react";
import { render } from "@testing-library/react";
import Empty from "..";

describe("Empty component", () => {
  test("renders the component correctly", () => {
    const { getByTestId, getByText } = render(<Empty />);

    const emptyComponent = getByTestId("empty-component");
    expect(emptyComponent).toBeDefined();

    const noDataText = getByText("No data");
    expect(noDataText).toBeDefined();

    const searchFirstText = getByText("Please search username first");
    expect(searchFirstText).toBeDefined();
  });
});
