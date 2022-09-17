import React, { useState, useEffect } from "react";
import { PopupOverlay, Button, InputBlock, Input } from "../../../ui";
import styled from "styled-components";
import description from "../../../../images/description.png";
import done from "../../../../images/done.png";
import pencil from "../../../../images/draw.png";
import send from "../../../../images/send.png";
import closeImg from "../../../../images/close.png";
import uniqid from "uniqid";
import { CardInfo, CommentsInfo } from "../../../types";
import { Comment } from "../";

interface CardPopupProps extends CardInfo {
  curentUser: string;
  changeCardInfo: Function;
  close: Function;
  dropCard: () => void;
  commentsArr: CommentsInfo[];
  column: string;
  fixChangesOfCards: Function;
  fixChangesOfComments: Function;
}
function CardPopup(props: CardPopupProps) {
  const card: CardInfo = {
    id: props.id,
    title: props.title,
    author: props.author,
    comments: props.comments,
    description: props.description,
    commentsNum: props.commentsNum,
  };

  const [stateDescription, setStateDescription] = useState<string>(
    props.description
  );
  const [stateComments, setStateComments] = useState<CommentsInfo[]>(
    props.commentsArr.filter(
      (comment) => props.comments.indexOf(comment.id) !== -1
    )
  );
  const [commentContent, setCommentContent] = useState<string>("");
  const [stateTitle, setStateTitle] = useState<string>(props.title);
  const [titleEdit, setTitleEdit] = useState<boolean>(false);
  const [descriptionEdit, setDescriptionEdit] = useState<boolean>(false);

  // useEffect(() => {
  //   props.fixChangesOfComments([...stateComments], false);
  // }, [stateComments]);

  const acceptChangesTitle = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    props.changeCardInfo({ ...card, title: stateTitle });
    setTitleEdit((titleEdit) => !titleEdit);
  };

  const acceptChangesDescription = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    props.changeCardInfo({ ...card, description: stateDescription });
    setDescriptionEdit((descriptionEdit) => !descriptionEdit);
  };

  const deleteCard = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    props.close(e);
    props.dropCard();
  };

  const addComment = () => {
    if (commentContent !== "") {
      const comment: CommentsInfo = {
        id: uniqid(),
        author: undefined,
        content: commentContent,
      };

      props.changeCardInfo({
        ...card,
        comments: [...stateComments.map((comm) => comm.id), comment.id],
        commentsNum: card.commentsNum + 1,
      });
      setStateComments([...stateComments, comment]);
      setCommentContent("");
      props.fixChangesOfComments([comment], false);
    }
  };

  const deleteComments =
    (id: string) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const arr = [...stateComments];
      props.changeCardInfo({
        ...card,
        comments: arr
          .filter((comment) => comment.id !== id)
          .map((comm) => comm.id),
        commentsNum: card.commentsNum - 1,
      });
      setStateComments([...arr.filter((comm) => comm.id !== id)]);
      props.fixChangesOfComments(
        arr.filter((comment) => comment.id === id),
        true
      );
    };

  const editComment =
    (index: number) => (newContent: string, newAuthor: string) => {
      const arr: CommentsInfo[] = [...stateComments];
      arr[index] = {
        id: arr[index].id,
        author: newAuthor,
        content: newContent,
      };
      setStateComments([...arr]);
      props.fixChangesOfComments([...arr], false);
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
            <Title>{props.title}</Title>
            <Button
              image={pencil}
              event={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                setTitleEdit((titleEdit) => !titleEdit);
              }}
            />
          </TitleBlock>
        )}
        <Author>
          Автор:<strong>{props.author}</strong>
        </Author>
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
          <DescriptionText>{props.description}</DescriptionText>
        )}
        <p>Комментарии</p>
        <CommentsBlock>
          {stateComments.map((item, index) => (
            <Comment
              id={item.id}
              author={item.author}
              content={item.content}
              curentUser={props.curentUser}
              editComment={editComment(index)}
              deleteComment={deleteComments(item.id)}
              index={index}
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
            <Button image={send} event={addComment} />
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
