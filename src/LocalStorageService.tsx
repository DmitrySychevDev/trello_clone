import { CommentsInfo, CardInfo, ColumnData } from "./components/types";
enum StorageKeys {
  Comments = "comments",
  Columns = "columns",
  Cards = "cards",
}
class LocalStorageService {
  comments: CommentsInfo[];
  cards: CardInfo[];
  columns: ColumnData[];
  constructor() {
    const columnsLocal = localStorage.getItem(StorageKeys.Columns);
    this.columns = columnsLocal
      ? JSON.parse(columnsLocal)
      : [
          { columnName: "TODO", cards: [] },
          { columnName: "In Progress", cards: [] },
          { columnName: "Testing", cards: [] },
          { columnName: "Done", cards: [] },
        ];
    const cardsLocal = localStorage.getItem(StorageKeys.Cards);
    this.cards = cardsLocal ? JSON.parse(cardsLocal) : [];
    const commentsLocal = localStorage.getItem(StorageKeys.Comments);
    this.comments = commentsLocal ? JSON.parse(commentsLocal) : [];
  }
  getCards(): CardInfo[] {
    return this.cards;
  }
  getComments(): CommentsInfo[] {
    return this.comments;
  }
  getColumns(): ColumnData[] {
    return this.columns;
  }
  setComments(commentsParam: CommentsInfo[]) {
    localStorage.setItem(StorageKeys.Comments, JSON.stringify(commentsParam));
  }

  setCard(cardsParam: CardInfo[]) {
    localStorage.setItem(StorageKeys.Cards, JSON.stringify(cardsParam));
  }

  setColumn(columnsParam: ColumnData[]) {
    localStorage.setItem(StorageKeys.Columns, JSON.stringify(columnsParam));
  }
}
const localStorageService = new LocalStorageService();
export default localStorageService;
