import { useState, useRef, useEffect } from "react";
import { fetchTokenByID } from "../lib/ScryfallApi";
import Card from "./Card";
import "./Board.css";

export default function Board({ tokenset }) {
  const [tokens, setTokens] = useState([]);
  const [selectedToken, setSelectedToken] = useState(null);
  const canvasRef = useRef(null);
  const cardSize = 150; // Fixed card size
  const [life, setLife] = useState(20);

  // Add a token with tapped state
  const addToken = async () => {
    if (!selectedToken) return;

    const token = await fetchTokenByID(selectedToken.id);
    setTokens((prev) => [...prev, { ...token, tapped: false }]);
  };

  // Toggle tapped state for a token by index
  const toggleTap = (index) => {
    setTokens((prev) =>
      prev.map((t, i) => (i === index ? { ...t, tapped: !t.tapped } : t))
    );
  };

  // Remove a token by index
  const removeToken = (index) => {
    setTokens((prev) => prev.filter((_, i) => i !== index));
  };

  // Group tokens by name + tapped state
  const groupedTokens = tokens.reduce((acc, token, index) => {
    const key = `${token.name}-${token.tapped ? "tapped" : "untapped"}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push({ token, index });
    return acc;
  }, {});

  return (
    <div className="main_board">
      {/* Token selection dropdown and life counter in one row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
        <div className="token-selector">
          <label>Select Token: </label>
          <select
            value={selectedToken ? selectedToken.id : ""}
            onChange={(e) => {
              const chosen = tokenset.find((t) => t.id === e.target.value);
              console.log("Selected token: ", chosen);
              setSelectedToken(chosen || null);
            }}
          >
            <option value="">{"-- Choose a token --"}</option>
            {tokenset.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>

        <div className="button-holder">
          <button onClick={addToken}>Add Token</button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '18px', marginRight: '5px' }}>Life:</span>
          <button onClick={() => setLife(life - 1)}>-</button>
          <span style={{ fontSize: '24px', fontWeight: 'bold', minWidth: '50px', textAlign: 'center' }}>
            {life}
          </span>
          <button onClick={() => setLife(life + 1)}>+</button>
          <button onClick={() => setLife(20)}>Reset</button>
        </div>
      </div>

      <div ref={canvasRef} className="token-canvas">
        {Object.entries(groupedTokens).map(([key, stack]) => (
          <div 
            key={key} 
            className="token-stack" 
            style={{ 
              '--card-size': `${cardSize}px`,
              width: `${cardSize}px` // Reserve space for the card, gap handles spacing
            }}
          >
            {stack.map(({ token, index }, i) => (
              <div
                key={i}
                className={`stacked-card ${token.tapped ? "tapped" : ""}`}
                style={{ top: i * 10, left: i * 10 }}
              >
                {/* Render remove button only for the last card in the stack */}
                {i === stack.length - 1 && (
                  <button
                    className="remove-button"
                    onClick={() => removeToken(index)}
                  >
                    ✕
                  </button>
                )}

                <Card
                  token={token}
                  size={cardSize}
                  tapped={token.tapped}
                  onToggleTap={() => toggleTap(index)}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}