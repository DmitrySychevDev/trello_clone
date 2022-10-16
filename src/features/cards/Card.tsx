import React, { useState } from "react";
import { pencil, commentImg, descriptionImg } from "../../images";
import { Button, InputBlock, Input } from "../../components/ui";
import { done } from "../../images";
import styled from "styled-components";
import { CardInfo } from "../../types";
import { CardPopup } from "./";
import { updateCard } from "./cardsSlice";
import { useAppSelector, useAppDispatch } from "../../App/hooks";

interface CardProps {
  curentUser: string;
  id: string;
  dropCard: () => void;
  column: string;
}

function Card(props: CardProps) {
  const card = useAppSelector(
    (state) => state.cards.find((card) => card.id === props.id) as CardInfo
  );
  const dispath = useAppDispatch();
  const [popupVisible, setPopupVisible] = useState<boolean>(false);
  const [cardTitleIsEdit, setCardTitleIsEdit] = useState<boolean>(false);
  const [cardTitleState, setCardTitleState] = useState<string>(card.title);

  function editCard(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    setPopupVisible(true);
  }

  function closePopup() {
    setPopupVisible(false);
  }

  function acceptNewTitle(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    setCardTitleIsEdit((cardTitleIsEdit) => !cardTitleIsEdit);
    dispath(updateCard({ ...card, title: cardTitleState }));
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
            <p>{card.title}</p>
          </CardTextBlock>
        )}
        {!cardTitleIsEdit && <Button image={pencil} event={editCard}></Button>}
        {popupVisible && (
          <CardPopup
            cardId={card.id}
            column={props.column}
            curentUser={props.curentUser}
            close={closePopup}
            dropCard={props.dropCard}
          />
        )}
      </CardWraper>
      <IconsBlock>
        {!!card.description.length && (
          <Icon>
            <img alt="description" src={descriptionImg} />
          </Icon>
        )}
        {!!card.commentsNum && (
          <CommentIcon>
            <img alt="comment" src={commentImg} /> <p>{card?.commentsNum}</p>
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
