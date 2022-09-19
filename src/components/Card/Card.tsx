import React, { useState, useEffect } from "react";
import pencil from "../../images/draw.png";
import description from "../../images/description.png";
import comment from "../../images/comment.png";
import { Button, InputBlock, Input } from "../ui";
import done from "../../images/done.png";
import styled from "styled-components";
import { CardInfo, CommentsInfo } from "../types";
import { CardPopup } from "./Components";

interface CardProps extends CardInfo {
  curentUser: string;
  dropCard: () => void;
  fullCommentsArr: CommentsInfo[];
  column: string;
  fixChangesOfCards: Function;
  fixChangesOfComments: Function;
}

function Card(props: CardProps) {
  const [popupVisible, setPopupVisible] = useState<boolean>(false);
  const [cardTitleIsEdit, setCardTitleIsEdit] = useState<boolean>(false);
  const [cardTitleState, setCardTitleState] = useState<string>(props.title);
  const [commentsState, setCommentsState] = useState<CommentsInfo[]>(
    props.fullCommentsArr.filter(
      (comment) => props.comments.indexOf(comment.id) !== -1
    )
  );
  const [cardInfo, setCardInfo] = useState<CardInfo>({
    id: props.id,
    title: props.title,
    author: props.author,
    comments: props.comments,
    description: props.description,
    commentsNum: props.commentsNum,
  });
  // useEffect(() => {
  //   setCardInfo({ ...cardInfo, column: props.column });
  // }, [props.column]);

  useEffect(() => {
    if (!props.author) setCardInfo({ ...cardInfo, author: props.curentUser });
  }, [props.curentUser]);

  const chadgecard = (param: CardInfo) => {
    setCardInfo(param);
    props.fixChangesOfCards([param], false);
  };

  function editCard(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    setPopupVisible(true);
  }

  function closePopup() {
    setPopupVisible(false);
  }

  function acceptNewTitle(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    setCardInfo({ ...cardInfo, title: cardTitleState });
    setCardTitleIsEdit((cardTitleIsEdit) => !cardTitleIsEdit);
    props.fixChangesOfCards([{ ...cardInfo, title: cardTitleState }], false);
  }
  return (
    <CardConteaner>
      <CardWraper>
        {cardTitleIsEdit && (
          <InputBlock>
            <Input
              value={cardTitleState}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setCardTitleState(e.target.value);
              }}
            />
            <Button image={done} event={acceptNewTitle} />
          </InputBlock>
        )}
        {!cardTitleIsEdit && (
          <CardTextBlock
            onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
              setCardTitleIsEdit((cardTitleIsEdit) => !cardTitleIsEdit);
            }}
          >
            <p>{cardInfo.title}</p>
          </CardTextBlock>
        )}
        {!cardTitleIsEdit && <Button image={pencil} event={editCard}></Button>}
        {popupVisible && (
          <CardPopup
            id={cardInfo.id}
            title={cardInfo.title}
            author={cardInfo.author}
            column={props.column}
            comments={cardInfo.comments}
            description={cardInfo.description}
            commentsNum={cardInfo.commentsNum}
            curentUser={props.curentUser}
            commentsArr={props.fullCommentsArr}
            changeCardInfo={chadgecard}
            close={closePopup}
            dropCard={props.dropCard}
            fixChangesOfCards={props.fixChangesOfCards}
            fixChangesOfComments={props.fixChangesOfComments}
          />
        )}
      </CardWraper>
      <IconsBlock>
        {!!cardInfo.description.length && (
          <Icon>
            <img src={description} />
          </Icon>
        )}
        {!!cardInfo.commentsNum && (
          <CommentIcon>
            <img src={comment} /> <p>{cardInfo.commentsNum}</p>
          </CommentIcon>
        )}
      </IconsBlock>
    </CardConteaner>
  );
}
const CardWraper = styled.div`
  word-break: break-all;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
`;
const CardConteaner = styled.div`
  background-color: #d3d3d3;
  width: 95%;
`;
const CardTextBlock = styled.div`
  width: 85%;
  cursor: pointer;
`;
const IconsBlock = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 10px;
  padding-left: 10px;
`;
const Icon = styled.div`
  img {
    width: 20px;
    height: 20px;
  }
`;
const CommentIcon = styled.div`
  display: flex;
  gap: 5px;
  font-size: 10px;
  img {
    width: 20px;
    height: 20px;
  }
`;
export default Card;
