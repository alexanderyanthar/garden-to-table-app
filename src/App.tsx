import "./App.css";
import FetchJournals from "./components/FetchJournals";
import Search from "./components/Search";

// Define a function to handle form submissions
const handleSearchSubmit = (query: string) => {
  // Perform actions with the search query, e.g., send it to an API
  console.log(`Search query submitted: ${query}`);
};

function App() {
  return (
    <div className="App">
      <Search onSubmit={handleSearchSubmit} />
      <FetchJournals />
    </div>
  );
}

export default App;
