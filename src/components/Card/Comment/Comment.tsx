import React, { useState } from "react";
import styled from "styled-components";
import done from "../../../images/done.png";
import { CommentsInfo } from "../../types";
import { InputBlock, Button } from "../../../UI";
const CommentWraper = styled.div`
  width: 80%;
  background-color: #d0d0d0;
  font-family: "Inter";
  border-radius: 5px;
  padding-left: 20px;
  margin-bottom: 10px;
  padding-bottom: 10px;
`;
const CommentButton = styled.button`
  width: 63px;
  height: 17px;
  background-color: #ebebeb;
  border: none;
  font-family: inter;
  font-size: 12px;
`;
const ButtonBlock = styled.div`
  display: flex;
  gap: 10px;
`;
interface CommentProps extends CommentsInfo {
  editComment: Function;
  deleteComment: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  index: number;
}

function Comment({
  author,
  content,
  editComment,
  deleteComment,
  index,
}: CommentProps) {
  const [value, setValue] = useState<string>(content);
  const edit = () => {
    if (value !== "") {
      editComment(value);
      const block: any = document.querySelector(`.comment-content_${index}`);
      block.style.display = "block";
      const inputBlock: any = document.querySelector(`.edit-comment_${index}`);
      inputBlock.style.display = "none";
    }
  };
  const beginEdit = () => {
    console.log("click");
    const block: any = document.querySelector(`.comment-content_${index}`);
    block.style.display = "none";
    const inputBlock: any = document.querySelector(`.edit-comment_${index}`);
    inputBlock.style.display = "flex";
  };
  return (
    <div>
      <CommentWraper>
        <h4>{author}</h4>
        <p className={`comment-content_${index}`}>{content}</p>
        <InputBlock className={`edit-comment_${index}`} defaultDisplay="none">
          <input
            type="text"
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setValue(e.target.value);
            }}
          />
          <Button image={done} event={edit} />
        </InputBlock>
      </CommentWraper>

      <ButtonBlock>
        <CommentButton onClick={beginEdit}>Изменить</CommentButton>
        <CommentButton onClick={deleteComment}>Удалить</CommentButton>
      </ButtonBlock>
    </div>
  );
}
export default Comment;
