import React, { useState, ChangeEvent, FormEvent } from "react";

interface SearchProps {
  onSubmit: (query: string, selectedApi: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedApi, setSelectedApi] = useState<string>("nutrition");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // handle input change function
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    // set use state to the value of the user's input
    setSearchQuery(event.target.value);
  };

  const handleApiChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedApi(event.target.value);
  };

  // handle submit function
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // if the search query is an empty string after being trimmed, set the error message
    if (searchQuery.trim() === "") {
      setErrorMessage("Please enter a search query.");
    } else {
      onSubmit(searchQuery, selectedApi);
      setSearchQuery("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleInputChange}
      />
      <label htmlFor="select-api" className="sr-only">
        Select API
      </label>
      <select id="select-api" value={selectedApi} onChange={handleApiChange}>
        <option value="nutrition">Search Nutrition Data</option>
        <option value="journals">Search Reserach Journals</option>
      </select>
      <button type="submit">Search</button>
      {/* Display error message */}
      {errorMessage && <p>{errorMessage}</p>}
    </form>
  );
};

export default Search;
