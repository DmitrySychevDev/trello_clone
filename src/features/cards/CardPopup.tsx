import React, { useState } from "react";
import { PopupOverlay, Button, InputBlock, Input } from "../../components/ui";
import styled from "styled-components";
import { pencil, descriptionImg, closeImg, send, done } from "../../images";
import { nanoid } from "@reduxjs/toolkit";
import { CardInfo, CommentsInfo } from "../../types";
import { Comment } from "../comment";
import { useAppSelector, useAppDispatch } from "../../App/hooks";
import { updateCard } from "../cards/cardsSlice";
import { addComment, removeComment } from "../comment/commentsSlice";

interface CardPopupProps {
  curentUser: string;
  cardId: string;
  close: Function;
  dropCard: () => void;
  column: string;
}
function CardPopup(props: CardPopupProps) {
  const card: CardInfo = useAppSelector(
    (state) =>
      state.cards.find((cardEl) => cardEl.id === props.cardId) as CardInfo
  );
  const dispath = useAppDispatch();
  const [stateDescription, setStateDescription] = useState<string>(
    card.description
  );
  const comments = useAppSelector((state) =>
    state.comments.filter((comment) => card.comments.indexOf(comment.id) !== -1)
  );
  const [commentContent, setCommentContent] = useState<string>("");
  const [stateTitle, setStateTitle] = useState<string>(card.title);
  const [titleEdit, setTitleEdit] = useState<boolean>(false);
  const [descriptionEdit, setDescriptionEdit] = useState<boolean>(false);

  const acceptChangesTitle = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    dispath(updateCard({ ...card, title: stateTitle }));
    setTitleEdit((titleEdit) => !titleEdit);
  };

  const acceptChangesDescription = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    dispath(updateCard({ ...card, description: stateDescription }));
    setDescriptionEdit((descriptionEdit) => !descriptionEdit);
  };

  const deleteCard = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    props.close(e);
    props.dropCard();
  };

  const addCommentEvent = () => {
    if (commentContent !== "") {
      const comment: CommentsInfo = {
        id: nanoid(),
        author: props.curentUser,
        content: commentContent,
      };
      dispath(addComment(comment));
      dispath(
        updateCard({
          ...card,
          comments: [...comments.map((comm) => comm.id), comment.id],
          commentsNum: card.commentsNum + 1,
        })
      );
      setCommentContent("");
    }
  };

  const deleteComments =
    (id: string) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const arr = [...comments];
      dispath(
        updateCard({
          ...card,
          comments: arr
            .filter((comment) => comment.id !== id)
            .map((comm) => comm.id),
          commentsNum: card.commentsNum - 1,
        })
      );
      dispath(removeComment(id));
    };

  const closeOutside = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    props.close();
  };
  const closeOnButton = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    props.close();
  };
  return (
    <PopupOverlay onClick={closeOutside}>
      <PopupWraper
        onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
          e.stopPropagation();
        }}
      >
        <CloseBtn>
          <Button image={closeImg} event={closeOnButton} />
        </CloseBtn>
        {titleEdit && (
          <InputBlock>
            <Input
              value={stateTitle}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setStateTitle(e.target.value);
              }}
            />
            <Button image={done} event={acceptChangesTitle} />
          </InputBlock>
        )}
        {!titleEdit && (
          <TitleBlock>
            <Title>{card.title}</Title>
            <Button
              image={pencil}
              event={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                setTitleEdit((titleEdit) => !titleEdit);
              }}
            />
          </TitleBlock>
        )}
        <Author>
          Автор:<strong>{card.author}</strong>
        </Author>
        <ColumnInfo>
          Колонка:<strong>{props.column}</strong>
        </ColumnInfo>
        <DescriptionBlock>
          <div className="description-image">
            <img alt="icon" src={descriptionImg} />
          </div>
          <p>Описание</p>
          <Button
            image={pencil}
            event={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
              setDescriptionEdit((descriptionEdit) => !descriptionEdit);
            }}
          />
        </DescriptionBlock>
        {descriptionEdit && (
          <InputBlock>
            <Input
              value={stateDescription}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setStateDescription(e.target.value);
              }}
            />
            <Button image={done} event={acceptChangesDescription} />
          </InputBlock>
        )}
        {card.description.length > 0 && !descriptionEdit && (
          <DescriptionText>{card.description}</DescriptionText>
        )}
        <p>Комментарии</p>
        <CommentsBlock>
          {comments.map((item, index) => (
            <Comment
              currentId={item.id}
              deleteComment={deleteComments(item.id)}
            />
          ))}
          <InputBlock>
            <Input
              value={commentContent}
              placeholder="Написать комментарий"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setCommentContent(e.target.value);
              }}
            />
            <Button image={send} event={addCommentEvent} />
          </InputBlock>
        </CommentsBlock>
        <DeleteBtn onClick={deleteCard}>Удалить карточку</DeleteBtn>
      </PopupWraper>
    </PopupOverlay>
  );
}
const PopupWraper = styled.div`
  position: absolute;
  top: 10%;
  left: 30%;
  width: 550px;
  height: 550px;
  background-color: #ffffff;
  padding-top: 10px;
  padding-left: 20px;
`;
const TitleBlock = styled.div.attrs({ className: "title-block" })`
  width: 95%;
  display: flex;
  gap: 20px;
`;
const Title = styled.h3`
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  max-width: 75%;
`;
const CloseBtn = styled.div`
  position: absolute;
  top: 0%;
  right: 0%;
`;
const ColumnInfo = styled.p`
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  padding-top: 20px;
`;
const DescriptionBlock = styled.div`
  padding-top: 20px;
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  .description-image {
    img {
      width: 20px;
      height: 20px;
    }
  }
`;
const DescriptionText = styled.p.attrs({ className: "description-text" })`
  width: 70%;
  padding-left: 40px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  margin-bottom: 20px;
`;
const DeleteBtn = styled.button`
  width: 148px;
  height: 25px;
  background: #ff0000;
  color: #ffffff;
  cursor: pointer;
`;
const CommentsBlock = styled.div`
  width: 70%;
  max-height: 250px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border: #000000 1px solid;
  padding-left: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-bottom: 20px;
  overflow-y: scroll;
`;
const Author = styled.p`
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  padding-top: 20px;
`;
export default CardPopup;
