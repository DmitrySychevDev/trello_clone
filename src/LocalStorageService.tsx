import { triggerAsyncId } from "async_hooks";
import { CommentsInfo, CardInfo, ColumnData } from "./components/types";
class LocalStorageService {
  comments: CommentsInfo[];
  cards: CardInfo[];
  columns: ColumnData[];
  constructor() {
    const columnsLocal = localStorage.getItem("columns");
    this.columns = columnsLocal
      ? JSON.parse(columnsLocal)
      : [
          { columnName: "TODO", cards: [] },
          { columnName: "In Progress", cards: [] },
          { columnName: "Testing", cards: [] },
          { columnName: "Done", cards: [] },
        ];
    const cardsLocal = localStorage.getItem("cards");

    this.cards = cardsLocal ? JSON.parse(cardsLocal) : [];
    const commentsLocal = localStorage.getItem("comments");
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
  setComments(commentsParam: CommentsInfo[], isDelete: boolean) {
    if (!isDelete) {
      commentsParam.forEach((comment) => {
        const index = this.comments
          .map((commentEl) => commentEl.id)
          .indexOf(comment.id);
        if (index !== -1) {
          this.comments[index] = comment;
        } else {
          this.comments.push(comment);
        }
      });
    } else
      this.comments = this.comments.filter(
        (comment) => comment.id !== commentsParam[0].id
      );
    localStorage.setItem("comments", JSON.stringify(this.comments));
  }

  setCard(cardsParam: CardInfo[], isDelete: boolean) {
    if (!isDelete) {
      cardsParam.forEach((card) => {
        const index = this.cards.map((cardEl) => cardEl.id).indexOf(card.id);
        if (index !== -1) {
          console.log(card);
          this.cards[index] = card;
        } else {
          this.cards.push(card);
        }
      });
    } else
      this.cards = this.cards.filter((card) => card.id !== cardsParam[0].id);
    localStorage.setItem("cards", JSON.stringify(this.cards));
  }

  setColumn(column: ColumnData, index: number) {
    this.columns[index] = column;
    localStorage.setItem("columns", JSON.stringify(this.columns));
  }
}
const singleton = new LocalStorageService();
export default singleton;
