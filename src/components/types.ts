interface CardInfo {
  title: string;
  author: string;
  column: string;
  comments: CommentsInfo[];
  description: string;
  commentsNum: number;
}
interface CommentsInfo {
  author: string | undefined;
  content: string;
}
interface ColumnData {
  columnName: string;
  cards: CardInfo[];
}
export { type CardInfo, type CommentsInfo, type ColumnData };
