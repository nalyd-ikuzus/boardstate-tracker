export async function fetchToken(tokenName, setCode = null) {
  if (!tokenName) return [];

  // Base query
  let query = `is:token name:${encodeURIComponent(tokenName)} layout:token`;

  // Add set filter if provided
  if (setCode) {
    query += ` set:t${encodeURIComponent(setCode)}`;
  }

  // Build endpoint with sorting
  const endpoint = `https://api.scryfall.com/cards/search?q=${query}&order=cmc&dir=asc`;

  //Search for token from scryfall api
  console.log("Fetching for a:", tokenName);
  const res = await fetch(endpoint);

  if (!res.ok) {
    console.error("Scryfall search failed:", res.statusText);
    throw new Error("Scryfall search failed");
  }

  const data = await res.json();
  return Array.isArray(data.data) ? data.data[0] : data.data;
}

export async function fetchTokenByID(tokenId) {
  if (!tokenId) return [];

  const endpoint = `https://api.scryfall.com/cards/${encodeURIComponent(tokenId)}`;

  //Search for token from scryfall api
  console.log("Fetching for a:", tokenId);
  const res = await fetch(endpoint);

  if (!res.ok) {
    console.error("Scryfall search failed:", res.statusText);
    throw new Error("Scryfall search failed");
  }

  const data = await res.json();
  console.log("Got back: ", data);
  return data;
}

export async function getDefaultToken() {
  return fetchToken("Copy");
}

export async function searchCards(searchTerm) {
  //Search from scryfall api
  if (!searchTerm) return [];

  const response = await fetch(
    `https://api.scryfall.com/cards/search?q=${encodeURIComponent(
      searchTerm
    )}+game:paper&unique=cards&order=edhrec`
  );

  if (!response.ok) {
    console.error("Scryfall search failed:", response.statusText);
    throw new Error("Failed to fetch cards from Scryfall");
  }

  const data = await response.json();
  return data.data || [];
}
