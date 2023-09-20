import { useState } from "react";
import "./App.css";
import FetchJournals from "./components/FetchJournals";
import Search from "./components/Search";
import FetchNutrition from "./components/FetchNutrition";

function App() {
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Define a function to handle form submissions
  const handleSearchSubmit = (query: string) => {
    // Perform actions with the search query, e.g., send it to an API
    setSearchQuery(query);
    console.log(`Search query submitted: ${query}`);
  };

  return (
    <div className="App">
      <Search onSubmit={handleSearchSubmit} />
      <FetchJournals searchQuery={searchQuery} />
      <FetchNutrition />
    </div>
  );
}

export default App;
