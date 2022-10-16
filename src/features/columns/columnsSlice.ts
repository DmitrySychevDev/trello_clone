import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ColumnData } from "../../types";
import localStorageService from "../../Services/LocalStorageService";

const initialState: ColumnData[] = localStorageService.getColumns();

const columnSlice = createSlice({
  name: "columns",
  initialState,
  reducers: {
    updateColumn: (state, action: PayloadAction<ColumnData>) => {
      const { id, columnName, cards } = action.payload;
      console.log(columnName);
      const existingColumn = state.find((column) => column.id === id);
      if (existingColumn) {
        existingColumn.cards = cards;
        existingColumn.columnName = columnName;
        localStorageService.setColumn([...state]);
      }
    },
    attachCardToColumn(state, action) {
      const { columnId, cardId } = action.payload;
      const existingColumn = state.find((column) => column.id === columnId);
      if (existingColumn) {
        existingColumn.cards = [...existingColumn.cards, cardId];
        localStorageService.setColumn([...state]);
      }
    },
    unattachCardOfColumn(state, action) {
      const { columnId, cardId } = action.payload;
      const existingColumn = state.find((column) => column.id === columnId);
      if (existingColumn) {
        existingColumn.cards = existingColumn.cards.filter(
          (card) => card !== cardId
        );
        localStorageService.setColumn([...state]);
      }
    },
  },
});

export const { updateColumn, attachCardToColumn, unattachCardOfColumn } =
  columnSlice.actions;
export default columnSlice.reducer;
