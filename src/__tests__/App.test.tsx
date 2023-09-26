import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import App from "../App";

describe("App component", () => {
  it("displays instructions on initial load", () => {
    const { getByText } = render(<App />);
    const instructionsText =
      "Please select a search type and enter a search query";

    expect(getByText(instructionsText)).toBeInTheDocument();
  });

  it("hides instructions afters selecting 'nutrition' API and submitting", async () => {
    const { getByLabelText, getByText, getByPlaceholderText, queryByText } =
      render(<App />);
    const searchInput = getByPlaceholderText("Search...");
    const instructionsText =
      "Please select a search type and enter a search query";

    fireEvent.change(getByLabelText("Select API"), {
      target: { value: "nutrition" },
    });

    fireEvent.change(searchInput, { target: { value: "milk" } });
    fireEvent.submit(searchInput);

    await waitFor(() => {
      expect(queryByText(instructionsText)).toBeNull();
    });
  });
});
