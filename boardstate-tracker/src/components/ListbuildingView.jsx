import { useState } from "react";
import SearchView from "./searchView";
import DeckView from "./deckView";
import "./listbuilding.css";
import { createDeck } from "../lib/services/dbService";

export default function ListbuildingView(props) {
  const [name, setName] = useState("");
  const [deck, setDeck] = useState([]);

  function finishDeck() {
    createDeck({ name: name, tokens: deck });
    setName("");
    setDeck([]);
  }

  return (
    <>
      <div id="main_grid">
        {" "}
        {/*Main deckbuiliding view (DeckView and SearchView side by side) */}
        <DeckView
          id="deck"
          deck={deck}
          setDeck={setDeck}
          name={name}
          setName={setName}
        />
        <SearchView id="search" deck={deck} setDeck={setDeck} />
        {deck.length > 0 && <button onClick={finishDeck}>Done</button>}
      </div>
    </>
  );
}
