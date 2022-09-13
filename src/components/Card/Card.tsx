import React, { useState } from "react";
import pencil from "../../images/draw.png";
import description from "../../images/description.png";
import comment from "../../images/comment.png";
import { Button } from "../../UI";
import styled from "styled-components";
import { CardInfo, CommentsInfo } from "../types";
import { CardPopup } from "../";

const CardWraper = styled.div`
  word-break: break-all;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 5px;
`;
const CardConteaner = styled.div`
  background-color: #d3d3d3;
  width: 95%;
`;
const CardTextBlock = styled.div`
  width: 85%;
`;
const IconsBlock = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 10px;
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
interface CardProps extends CardInfo {
  dropCard: () => void;
}
function Card(props: CardProps) {
  const [popupVisible, setPopupVisible] = useState<boolean>(false);
  const [cardInfo, setCardInfo] = useState<CardInfo>({
    title: props.title,
    author: props.author,
    column: props.column,
    comments: props.comments,
    description: props.description,
    commentsNum: props.commentsNum,
  });
  const chadgecard = (param: CardInfo) => {
    setCardInfo(param);
  };
  function editCard(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    setPopupVisible(true);
  }
  function closePopup(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    setPopupVisible(false);
  }
  return (
    <CardConteaner>
      <CardWraper>
        <CardTextBlock>
          <p>{cardInfo.title}</p>
        </CardTextBlock>
        <div>
          <Button image={pencil} event={editCard}></Button>
        </div>
        {popupVisible && (
          <CardPopup
            title={cardInfo.title}
            author={cardInfo.author}
            column={cardInfo.column}
            comments={cardInfo.comments}
            description={cardInfo.description}
            commentsNum={cardInfo.commentsNum}
            changeCardInfo={chadgecard}
            close={closePopup}
            dropCard={props.dropCard}
          />
        )}
      </CardWraper>
      <IconsBlock>
        {" "}
        {cardInfo.description.length > 0 && (
          <Icon>
            <img src={description} />
          </Icon>
        )}
        {cardInfo.commentsNum > 0 && (
          <CommentIcon>
            <img src={comment} /> <p>{cardInfo.commentsNum}</p>
          </CommentIcon>
        )}
      </IconsBlock>
    </CardConteaner>
  );
}
export default Card;
