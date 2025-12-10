import React, { useEffect, useState } from "react";
import { fetchToken } from "../lib/ScryfallApi";
import "./search.css";

export default function SearchView({ deck, setDeck }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchSet, setSearchSet] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch(e) {
    // Search cards to add to deck
    e.preventDefault();
    setLoading(true);
    const token = await fetchToken(searchTerm, searchSet);
    setSearchResults(token || []);
    setLoading(false);
  }

  function addToDeck(card) {
    setError("");
    // check by id to avoid duplicates
    if (!deck.some((c) => c.id === card.id)) {
      setDeck([...deck, { id: card.id, name: card.name }]);
    }
  }
  

  return (
    <>
      <div className="main_search">
        {/* Search Form */}
        <form onSubmit={handleSearch}>
          <>
            <input
              id="searchbox"
              type="text"
              placeholder="Search for cards..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <input
              id="set_searchbox"
              type="text"
              placeholder="Set (Optional)"
              value={searchSet}
              onChange={(e) => setSearchSet(e.target.value)}
            />
            <button>Search</button>
          </>
        </form>

        {error && <p>{error}</p>}
        {loading && <p>Loading search results...</p>}

        {/* Search Results */}
        <div>
          <div className="search_results" key={searchResults.id}>
            <img
              id="result_image"
              src={searchResults.image_uris?.normal}
              alt={searchResults.name}
            />
            <p>{searchResults.name}</p>
            {searchTerm != "" && (
              <button onClick={() => addToDeck(searchResults)}>
                Add to Deck
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
