import React from "react";
import { render, fireEvent, getByLabelText } from "@testing-library/react";
import Search from "../components/Search";

// Search test functions
describe("Search", () => {
  // Test if the search bar and button renders
  it("should render the search input and button", () => {
    // deconstructing variable to extract text and placeholder text from the search component
    const { getByPlaceholderText, getByText } = render(
      <Search onSubmit={() => {}} />
    );

    // define the searchInput and searchButton so the test knows what to search for
    const searchInput = getByPlaceholderText("Search...");
    const searchButton = getByText("Search");

    // The search input and button should display in the document
    expect(searchInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });

  // test to check if the value is updating when the user types
  it("should update the input value when the user types", () => {
    const { getByPlaceholderText } = render(<Search onSubmit={() => {}} />);
    const searchInput = getByPlaceholderText("Search...");

    // check if the change is happening by using the value "React"
    fireEvent.change(searchInput, { target: { value: "React" } });

    // expect the search input to have the value "React"
    expect(searchInput).toHaveValue("React");
  });

  // test to see if the submit function works when pressed
  it("should call the submit function with the search query and selected API when the form is submitted", () => {
    // define the handleSubmit function
    const handleSubmit = jest.fn();
    const { getByPlaceholderText, getByText, getByLabelText } = render(
      <Search onSubmit={handleSubmit} />
    );

    const searchInput = getByPlaceholderText("Search...");
    const searchButton = getByText("Search");
    const apiDropdown = getByLabelText("Select API");

    fireEvent.change(apiDropdown, { target: { value: "journals" } });

    // fire the click event
    fireEvent.change(searchInput, { target: { value: "JavaScript" } });
    fireEvent.click(searchButton);

    // The input value used is JavaScript and it should return that value when searchButton is clicked
    expect(handleSubmit).toHaveBeenCalledWith("JavaScript", "journals");
  });

  // test to check if an error message display when  a user submits the form with an empty string
  it("should display an error message when the form is submitted with an empty string", () => {
    const handleSubmit = jest.fn();
    const { getByText } = render(<Search onSubmit={handleSubmit} />);
    const searchButton = getByText("Search");

    fireEvent.click(searchButton);

    expect(handleSubmit).not.toHaveBeenCalled();
    // the document should have the text according to the error in the component
    expect(getByText("Please enter a search query.")).toBeInTheDocument();
  });

  // test to check if the input is cleared after the form is submitted
  it("should clear input after the form is submitted", () => {
    const handleSubmit = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <Search onSubmit={handleSubmit} />
    );

    const searchInput = getByPlaceholderText("Search...");
    const searchButton = getByText("Search");

    fireEvent.change(searchInput, { target: { value: "React" } });

    fireEvent.click(searchButton);

    expect(searchInput).toHaveValue("");
  });
});
