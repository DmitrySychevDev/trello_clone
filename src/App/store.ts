import { configureStore } from "@reduxjs/toolkit";
import { cardsReducer } from "../features/cards";
import { columnsReducer } from "../features/columns/";
import { commentsReducer } from "../features/comment";

const store = configureStore({
  reducer: {
    cards: cardsReducer,
    columns: columnsReducer,
    comments: commentsReducer,
  },
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
