import React, { useState, useEffect } from "react";
import styled from "styled-components";
import done from "../../../../images/done.png";
import { CommentsInfo } from "../../../types";
import { InputBlock, Button } from "../../../ui";

interface CommentProps extends CommentsInfo {
  curentUser: string;
  editComment: Function;
  deleteComment: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  index: number;
}

function Comment({
  author,
  content,
  editComment,
  deleteComment,
  curentUser,
  index,
}: CommentProps) {
  const [value, setValue] = useState<string>(content);
  const [commentEdit, setCommentEdit] = useState<boolean>(false);
  useEffect(() => {
    if (!author) editComment(content, curentUser);
  }, [curentUser]);
  const edit = () => {
    if (value !== "") {
      editComment(value);
    }
    setCommentEdit((commentEdit) => !commentEdit);
  };
  const beginEdit = () => {
    setCommentEdit((commentEdit) => !commentEdit);
  };
  return (
    <div>
      <CommentWraper>
        <div>
          <h4>{author}</h4>
          {!commentEdit && (
            <p className={`comment-content_${index}`}>{content}</p>
          )}
        </div>

        {commentEdit && (
          <InputBlock>
            <input
              type="text"
              value={value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setValue(e.target.value);
              }}
            />
            <Button image={done} event={edit} />
          </InputBlock>
        )}
      </CommentWraper>

      <ButtonBlock>
        <CommentButton onClick={beginEdit}>Изменить</CommentButton>
        <CommentButton onClick={deleteComment}>Удалить</CommentButton>
      </ButtonBlock>
    </div>
  );
}
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
  cursor: pointer;
`;
const ButtonBlock = styled.div`
  display: flex;
  gap: 10px;
`;
export default Comment;
