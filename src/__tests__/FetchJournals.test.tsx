// FetchJournals.test.tsx
import React from "react";
import { render, waitFor } from "@testing-library/react";
import FetchJournals from "../components/FetchJournals";

describe("FetchJournals", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should display a message prompting the user to search", async () => {
    // Mock the fetch function to ensure it's not called in test
    global.fetch = jest.fn();

    const { getByText } = render(<FetchJournals />);

    await waitFor(() => {
      // Expect initial message to show up
      expect(getByText("Please enter a search query.")).toBeInTheDocument();
    });
  });

  it("should render without errors", async () => {
    render(<FetchJournals />);
  });

  it("should handle network errors gracefully", async () => {
    // Mock the fetch function to simulate a network error
    global.fetch = jest.fn().mockRejectedValueOnce(new Error("Network error"));

    const { getByText } = render(<FetchJournals />);

    // Wait for the error message to be displayed in the component
    await waitFor(() => {
      expect(getByText("Network response was not ok")).toBeInTheDocument();
    });
  });

  it("should send the search query as a paramters to the API call", async () => {
    // creating a mock api response
    const mockApiResponse = {
      results: [],
    };

    const searchQuery = "YourSearchQuery";

    // imitate fetch function
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockApiResponse),
    });

    render(<FetchJournals searchQuery={searchQuery} />);

    // expect the function to call with core api and the search paramter
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        `https://api.core.ac.uk/v3/search/works?apiKey=${
          process.env.REACT_APP_CORE_API_KEY
        }&page=1&pageSize=10&q=${encodeURIComponent(searchQuery)}`
      );
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});
