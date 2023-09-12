import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Search from "../components/Search";

describe("Search", () => {
  it("should render the search input and button", () => {
    const { getByPlaceholderText, getByText } = render(
      <Search onSubmit={() => {}} />
    );

    const searchInput = getByPlaceholderText("Search...");
    const searchButton = getByText("Search");

    expect(searchInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });

  it("should update the input value when the user types", () => {
    const { getByPlaceholderText } = render(<Search onSubmit={() => {}} />);
    const searchInput = getByPlaceholderText("Search...");

    fireEvent.change(searchInput, { target: { value: "React" } });

    expect(searchInput).toHaveValue("React");
  });

  it("should call the submit function with the search query when the form is submitted", () => {
    const handleSubmit = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <Search onSubmit={handleSubmit} />
    );
    const searchInput = getByPlaceholderText("Search...");
    const searchButton = getByText("Search");

    fireEvent.change(searchInput, { target: { value: "JavaScript" } });
    fireEvent.click(searchButton);

    expect(handleSubmit).toHaveBeenCalledWith("JavaScript");
  });
});
