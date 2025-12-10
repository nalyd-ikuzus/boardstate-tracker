import { db } from "../FirebaseConfig";
import {
  collection,
  query,
  getDocs,
  addDoc,
  orderBy,
  limit,
  startAfter,
  Timestamp,
} from "firebase/firestore";
import { loggedInUserDisplayName } from "./authService";

let lastVisibleDeck = null;

export async function createDeck({ name, tokens }) {
  const author = loggedInUserDisplayName();
  const data = { name, tokens, author, date: Timestamp.now() };
  const docReference = await addDoc(collection(db, "tokensets"), data);
  return { id: docReference.id, data };
}

export async function fetchDecks(nextPage) {
  // In storage the ids are separated from the data, but in this function
  // we are going to combine the id and the data together.
  console.log("NextPage: ", nextPage);
  console.log("current last", lastVisibleDeck);
  let myQuery = query(
    collection(db, "tokensets"),
    orderBy("date", "desc"),
    limit(20)
  );
  if (nextPage && lastVisibleDeck) {
    console.log("Starting after current last");
    myQuery = query(
      collection(db, "articles"),
      orderBy("date", "desc"),
      startAfter(lastVisibleDeck),
      limit(20)
    );
  }
  console.log(myQuery);
  const snapshot = await getDocs(myQuery);
  if (!snapshot.empty) {
    lastVisibleDeck = snapshot.docs[snapshot.docs.length - 1];
    console.log("next last", lastVisibleDeck);
  }
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}
