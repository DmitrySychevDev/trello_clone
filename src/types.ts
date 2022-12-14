interface CardInfo {
  id: string;
  title: string;
  author: string;
  comments: string[];
  description: string;
  commentsNum: number;
}
interface CommentsInfo {
  id: string;
  author: string | undefined;
  content: string;
}
interface ColumnData {
  id: string;
  columnName: string;
  cards: string[];
}
export { type CardInfo, type CommentsInfo, type ColumnData };
