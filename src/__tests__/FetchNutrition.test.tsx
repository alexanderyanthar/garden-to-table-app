import React from "react";
import { render, waitFor } from "@testing-library/react";
import FetchNutrition from "../components/FetchNutrition";

describe("FetchNutrition Component", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should send the query and dataType as parameters to the API call", async () => {
    // Creating a mock API response
    const mockApiResponse = {
      data: [],
    };

    // Imitate the fetch function
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockApiResponse),
    });

    render(<FetchNutrition searchQuery="milk" selectedApi="nutrition" />);

    // Expect the function to be called with the USDA API and the query and dataType parameters
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining(
          `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${process.env.REACT_APP_USDA_API_KEY}&query=milk&dataType=Survey%20%28FNDDS%29`
        )
      );
    });
  });

  it("should render the data correctly", async () => {
    // Creating a mock API response with sample data
    const mockApiResponse = {
      foods: [{ description: "Food 1" }, { description: "Food 2" }],
    };

    // Imitate fetch function
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockApiResponse),
    });

    const { getByText } = render(
      <FetchNutrition searchQuery="milk" selectedApi="nutrition" />
    );

    // Wait for component to render the data
    await waitFor(() => {
      // Check if specific data elements are displayed
      expect(getByText("Food 1")).toBeInTheDocument();
      expect(getByText("Food 2")).toBeInTheDocument();
    });
  });
});
