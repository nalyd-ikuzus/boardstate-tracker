import { useState } from "react";
import "./deck.css";
import { fetchToken } from "../lib/ScryfallApi";

export default function DeckView({ deck, setDeck, name, setName }) {
  const [editingName, setEditingName] = useState(false);

  function removeFromDeck(id) {
    setDeck(deck.filter((c) => c.id !== id));
  }

  //TODO: add name changing functionality

  return (
    <>
      {/* Deck Section */}
      <div id="main_deck_card">
        {editingName ? (
          <input
            type="text"
            value={name || ""}
            autoFocus
            onChange={(e) => setName(e.target.value)}
            onBlur={() => setEditingName(false)} // stop editing when input loses focus
            onKeyDown={(e) => {
              if (e.key === "Enter") setEditingName(false); // stop editing on Enter
            }}
          />
        ) : (
          <h3 onClick={() => setEditingName(true)}>
            {name || "Your List"} ({deck.length} cards)
          </h3>
        )}

        <div>
          {deck.map(
            (
              card //Main decklist
            ) => (
              <div id="item" key={card}>
                <p>{card.name} </p>
                <button id="remove" onClick={() => removeFromDeck(card.id)}>
                  Remove
                </button>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
}
