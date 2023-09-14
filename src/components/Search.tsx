import React, { useState, ChangeEvent, FormEvent } from "react";

interface SearchProps {
  onSubmit: (query: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // handle input change function
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    // set use state to the value of the user's input
    setSearchQuery(event.target.value);
  };

  // handle submit function
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // if the search query is an empty string after being trimmed, set the error message
    if (searchQuery.trim() === "") {
      setErrorMessage("Please enter a search query.");
    } else {
      onSubmit(searchQuery);
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
      <button type="submit">Search</button>
      {/* Display error message */}
      {errorMessage && <p>{errorMessage}</p>}
    </form>
  );
};

export default Search;
