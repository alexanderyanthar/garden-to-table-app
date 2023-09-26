import { useState } from "react";
import "./App.css";
import FetchJournals from "./components/FetchJournals";
import Search from "./components/Search";
import FetchNutrition from "./components/FetchNutrition";

function App() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedApi, setSelectedApi] = useState<string>("nutrition");
  const [showInstructions, setShowInstructions] = useState<boolean>(true);

  // Define a function to handle form submissions
  const handleSearchSubmit = (query: string, api: string) => {
    // Perform actions with the search query, e.g., send it to an API
    setSearchQuery(query);
    setSelectedApi(api);
    setShowInstructions(false);
    console.log(`Search query submitted: ${query}`);
    console.log(`Selected API: ${api}`);
  };

  return (
    <div className="App">
      <Search onSubmit={handleSearchSubmit} />
      {!showInstructions && (
        <>
          {selectedApi === "nutrition" ? (
            <FetchNutrition
              searchQuery={searchQuery}
              selectedApi={selectedApi}
            />
          ) : (
            <FetchJournals searchQuery={searchQuery} />
          )}
        </>
      )}
      {showInstructions && (
        <div>
          <p>Please select a search type and enter a search query</p>
        </div>
      )}
    </div>
  );
}

export default App;
