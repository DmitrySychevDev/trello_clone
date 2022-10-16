import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CommentsInfo } from "../../types";
import localStorageService from "../../Services/LocalStorageService";

const initialState: CommentsInfo[] = localStorageService.getComments();

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    addComment: (state, action: PayloadAction<CommentsInfo>) => {
      state.push(action.payload);
      localStorageService.setComments([...state]);
    },
    removeComment: (state, action: PayloadAction<string>) => {
      state = state.filter((comment) => comment.id !== action.payload);
      localStorageService.setComments([...state]);
    },
    updateComment: (state, action: PayloadAction<CommentsInfo>) => {
      const { id, author, content } = action.payload;
      const existingCard = state.find((comment) => comment.id === id);
      if (existingCard) {
        existingCard.author = author;
        existingCard.content = content;
      }
    },
  },
});

export const { updateComment, addComment, removeComment } =
  commentsSlice.actions;

export default commentsSlice.reducer;
