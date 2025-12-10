import { useState, useRef, useEffect } from "react";
import { useAuthentication } from "../lib/services/authService";
import { SignIn, SignOut } from "./Auth";
import { fetchDecks, createDeck } from "../lib/services/dbService";
import Board from "./Board";
import "./Homepage.css";
import ListbuildingView from "./ListbuildingView";
import PlayView from "./playView";

export default function Homepage() {
  const [bodyContent, setBodyContent] = useState(0);
  const user = useAuthentication();

  return (
    <div className="main-layout">
      <header className="header">
        <h1>Boardstate Tracker</h1>
        {user && (
          <div className="tabs">
            <button className="tab" onClick={() => setBodyContent(0)}>
              New Token List
            </button>
            <button className="tab" onClick={() => setBodyContent(1)}>
              Play
            </button>
          </div>
        )}
        {!user ? <SignIn /> : <SignOut />}
      </header>

      <div className="body">
        {bodyContent == 0 ? <ListbuildingView /> : <PlayView user={user} />}
      </div>

      <div className="footer">
        <p>Created by Dylan Suzuki</p>
      </div>
    </div>
  );
}
