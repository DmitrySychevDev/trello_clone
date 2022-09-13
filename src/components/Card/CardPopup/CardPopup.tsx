import React, { useState } from "react";
import { PopupContaner, Button, InputBlock } from "../../../UI";
import styled from "styled-components";
import description from "../../../images/description.png";
import done from "../../../images/done.png";
import pencil from "../../../images/draw.png";
import send from "../../../images/send.png";
import closeImg from "../../../images/close.png";
import { CardInfo, CommentsInfo } from "../../types";
import { Comment } from "../../";

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
interface CardPopupProps extends CardInfo {
  changeCardInfo: Function;
  close: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  dropCard: () => void;
}
function CardPopup(props: CardPopupProps) {
  const card: CardInfo = {
    title: props.title,
    author: props.author,
    column: props.column,
    comments: props.comments,
    description: props.description,
    commentsNum: props.commentsNum,
  };
  const [stateDescription, setStateDescription] = useState<string>(
    props.description
  );
  const [stateComments, setStateComments] = useState<CommentsInfo[]>(
    props.comments
  );
  const [commentContent, setCommentContent] = useState<string>("");
  const [stateTitle, setStateTitle] = useState<string>(props.title);
  const hideAndViewBlock = (hideBlock: string, viewBlock: string) => () => {
    const block: any = document.querySelector(`.${hideBlock}`);
    if (block !== null) {
      block.style.display = "none";
    }
    const inputBlock: any = document.querySelector(`.${viewBlock}`);
    if (inputBlock !== null) {
      inputBlock.style.display = "flex";
    }
  };
  const acceptChangesTitle = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    props.changeCardInfo({ ...card, title: stateTitle });
    hideAndViewBlock("input-block_1", "title-block")();
  };
  const acceptChangesDescription = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    props.changeCardInfo({ ...card, description: stateDescription });
    hideAndViewBlock("input-block_2", "description-text")();
  };
  const deleteCard = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    props.close(e);
    props.dropCard();
  };
  const addComment = () => {
    if (commentContent !== "") {
      const comment: CommentsInfo = {
        author: props.author,
        content: commentContent,
      };

      props.changeCardInfo({
        ...card,
        comments: [...stateComments, comment],
        commentsNum: card.commentsNum + 1,
      });
      setStateComments([...stateComments, comment]);
      console.log(stateComments);
      setCommentContent("");
    }
  };
  const deleteComments =
    (index: number) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const arr: CommentsInfo[] = [...stateComments];
      arr.splice(index, 1);

      props.changeCardInfo({
        ...card,
        comments: [...arr],
        commentsNum: card.commentsNum - 1,
      });
      setStateComments([...arr]);
    };
  const editComment = (index: number) => (newContent: string) => {
    const arr: CommentsInfo[] = [...stateComments];
    arr[index] = { author: arr[index].author, content: newContent };
    setStateComments([...arr]);
    props.changeCardInfo({
      ...card,
      comments: [...arr],
    });
  };
  return (
    <PopupContaner>
      <PopupWraper>
        <CloseBtn>
          <Button image={closeImg} event={props.close} />
        </CloseBtn>
        <InputBlock className="input-block_1" defaultDisplay="none">
          <input
            type="text"
            value={stateTitle}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setStateTitle(e.target.value);
            }}
          />
          <Button image={done} event={acceptChangesTitle} />
        </InputBlock>
        <TitleBlock>
          <Title>{props.title}</Title>
          <Button
            image={pencil}
            event={hideAndViewBlock("title-block", "input-block_1")}
          />
        </TitleBlock>
        <ColumnInfo>
          Колонка:<strong>{props.column}</strong>
        </ColumnInfo>
        <DescriptionBlock>
          <div className="description-image">
            <img src={description} />
          </div>
          <p>Описание</p>
          <Button
            image={pencil}
            event={hideAndViewBlock("description-text", "input-block_2")}
          />
        </DescriptionBlock>
        <InputBlock className="input-block_2" defaultDisplay="none">
          <input
            type="text"
            value={stateDescription}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setStateDescription(e.target.value);
            }}
          />
          <Button image={done} event={acceptChangesDescription} />
        </InputBlock>
        {card.description.length > 0 && (
          <DescriptionText>{props.description}</DescriptionText>
        )}
        <p>Комментарии</p>
        <CommentsBlock>
          {stateComments.map((item, index) => (
            <Comment
              author={props.author}
              content={item.content}
              editComment={editComment(index)}
              deleteComment={deleteComments(index)}
              index={index}
            />
          ))}
          <InputBlock className="comment-input" defaultDisplay="flex">
            <input
              type="text"
              value={commentContent}
              placeholder="Написать комментарий"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setCommentContent(e.target.value);
              }}
            />
            <Button image={send} event={addComment} />
          </InputBlock>
        </CommentsBlock>
        <DeleteBtn onClick={deleteCard}>Удалить карточку</DeleteBtn>
      </PopupWraper>
    </PopupContaner>
  );
}
export default CardPopup;