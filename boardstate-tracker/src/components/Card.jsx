import { useState, useEffect } from "react";
import { getDefaultToken } from "../lib/ScryfallApi";
import "./Card.css";

export default function Card({ token, tapped, onToggleTap, size = 150 }) {
  if (!token) return null;
  console.log("Card: ", token);

  return (
    <div
      className={`card-wrapper ${tapped ? "tapped" : ""}`}
      style={{ width: size }}
      onClick={onToggleTap}
    >
      <img
        src={
          token.card_faces
            ? token.card_faces[0].image_uris?.normal // use the first face’s image
            : token.image_uris?.normal
        }
        alt={token.name}
        style={{ width: "100%", height: "auto" }}
      />
    </div>
  );
}
