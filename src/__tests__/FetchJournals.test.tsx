// FetchJournals.test.tsx
import React from "react";
import { render, waitFor } from "@testing-library/react";
import FetchJournals from "../components/FetchJournals";

describe("FetchJournals", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should render without errors", async () => {
    render(<FetchJournals />);
  });

  it("should display fetched journal titles", async () => {
    const mockApiResponse = {
      results: [
        { title: "Journal 1" },
        { title: "Journal 2" },
        { title: "Journal 3" },
        { title: "Journal 4" },
        { title: "Journal 5" },
      ],
    };

    // Mock the fetch function to return the expected data
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockApiResponse),
    });

    const { getByText } = render(<FetchJournals />);

    // Wait for the data to be displayed in the component
    await waitFor(() => {
      mockApiResponse.results.forEach((journal) => {
        expect(getByText(journal.title)).toBeInTheDocument();
      });
    });
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

  afterEach(() => {
    jest.resetAllMocks();
  });
});
