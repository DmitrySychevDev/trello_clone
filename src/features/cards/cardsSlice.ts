import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CardInfo } from "../../types";
import { RootState } from "../../App/store";
import localStorageService from "../../Services/LocalStorageService";

const initialState: CardInfo[] = localStorageService.getCards();
const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    addCard: (state, action: PayloadAction<CardInfo>) => {
      state.push(action.payload);
      localStorageService.setCard([...state]);
      console.log("add");
    },
    deleteCard: (state, action: PayloadAction<string>) => {
      state = state.filter((card) => card.id !== action.payload);
      localStorageService.setCard([...state]);
      console.log("delete");
    },
    updateCard: (state, action: PayloadAction<CardInfo>) => {
      const { id, author, title, comments, description, commentsNum } =
        action.payload;
      const existingCard = state.find((card) => card.id === id);
      if (existingCard) {
        existingCard.author = author;
        existingCard.comments = comments;
        existingCard.description = description;
        existingCard.commentsNum = commentsNum;
        existingCard.title = title;
        localStorageService.setCard([...state]);
      }
    },
  },
});

export const selectCards = (state: RootState) => state.cards;
export const { addCard, deleteCard, updateCard } = cardsSlice.actions;
export default cardsSlice.reducer;
