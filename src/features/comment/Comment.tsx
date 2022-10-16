import React, { useState } from "react";
import styled from "styled-components";
import { done } from "../../images";
import { CommentsInfo } from "../../types";
import { InputBlock, Button, Input } from "../../components/ui";
import { useAppSelector, useAppDispatch } from "../../App/hooks";
import { updateComment } from "./commentsSlice";

interface CommentProps {
  currentId: string;
  deleteComment: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

function Comment({ currentId, deleteComment }: CommentProps) {
  const comment = useAppSelector(
    (state) =>
      state.comments.find((comment) => comment.id === currentId) as CommentsInfo
  );
  const dispath = useAppDispatch();
  const [value, setValue] = useState<string>(comment.content);
  const [commentEdit, setCommentEdit] = useState<boolean>(false);

  const edit = () => {
    if (value !== "") {
      dispath(updateComment({ ...comment, content: value }));
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
          <h4>{comment.author}</h4>
          {!commentEdit && <p>{comment.content}</p>}
        </div>

        {commentEdit && (
          <InputBlock>
            <Input
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
