import { useState, useEffect } from "react";
import { fetchDecks } from "../lib/services/dbService";
import Board from "./Board";
import "./play.css";

export default function PlayView({ user }) {
  const [decks, setDecks] = useState(null);
  const [selectedDeck, setSelectedDeck] = useState(null);

  useEffect(() => {
    if (user) {
      fetchDecks(false).then(setDecks);
      console.log(decks);
    }
  }, [user]);

  async function fetchNextPage() {
    await fetchDecks(true).then((newDecks) => {
      const uniqueArray = [...decks, ...newDecks].reduce(
        (accumulator, current) => {
          if (!accumulator.includes(current)) {
            accumulator.push(current);
          }
          return accumulator;
        },
        []
      );
      setDecks(uniqueArray);
    });
  }

  return (
    <div className="main_play">
      {!selectedDeck ? (
        <div className="deck_section">
          <h3>Select a List</h3>
          <div className="deck_list">
            {decks
              ? decks.map((deck, i) => (
                  <button key={i} onClick={() => setSelectedDeck(deck)}>
                    {deck.name || `Deck ${i + 1}`}
                  </button>
                ))
              : "Decks not loaded"}
            <button onClick={fetchNextPage}>More</button>
          </div>
        </div>
      ) : (
        <Board tokenset={selectedDeck.tokens} />
      )}
    </div>
  );
}
