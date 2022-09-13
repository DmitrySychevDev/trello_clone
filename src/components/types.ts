interface CardInfo {
  title: string;
  author: string;
  column: string;
  comments: CommentsInfo[];
  description: string;
  commentsNum: number;
}
interface CommentsInfo {
  author: string;
  content: string;
}
export { type CardInfo, type CommentsInfo };
