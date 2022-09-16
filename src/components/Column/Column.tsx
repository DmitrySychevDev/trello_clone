import React, { useState, useEffect } from "react";
import uniqid from "uniqid";
import done from "../../images/done.png";
import { Card } from "../";
import styled from "styled-components";
import singleton from "../../LocalStorageService";
import { Button, InputBlock, Input } from "../ui";
import { CardInfo, ColumnData, CommentsInfo } from "../types";

interface ColumnProps {
  title: string;
  curentUser: string;
  change: Function;
  cardsArr: string[];
  fullCardsArr: CardInfo[];
  fullCommentsArr: CommentsInfo[];
  index: number;
}

function Column({
  title,
  curentUser,
  index,
  change,
  cardsArr,
  fullCardsArr,
  fullCommentsArr,
}: ColumnProps) {
  const [cards, setCards] = useState<CardInfo[]>(
    fullCardsArr.filter((card) => cardsArr.indexOf(card.id) !== -1)
  );
  const [value, setValue] = useState<string>("");
  const [titleState, setTitleState] = useState<string>(title);
  const [cardIsAdd, setCardIsAdd] = useState<boolean>(false);
  const [columnIsEdit, setColumnIsEdit] = useState<boolean>(false);

  useEffect(() => {
    const cardArr = cards.map<CardInfo>((element) => {
      element.column = titleState;
      console.log(titleState);
      return { ...element };
    });
    setCards([...cardArr]);
    singleton.setCard(cardArr, false);

    const column: ColumnData = {
      columnName: titleState,
      cards: cards.map((card) => card.id),
    };
    singleton.setColumn(column, index);
    change(column);
  }, [titleState]);

  useEffect(() => {
    const column: ColumnData = {
      columnName: titleState,
      cards: cards.map((card) => card.id),
    };
    singleton.setCard(cards, false);
    //fixChandesCards([...singleton.getCards()]);
    singleton.setColumn(column, index);
    change(column);
  }, [cards]);

  const dropCard = (id: string) => {
    return () => {
      let arr: CardInfo[] = [...cards];
      arr = [...arr.filter((card) => card.id !== id)];
      const column: ColumnData = {
        columnName: titleState,
        cards: cards.map((card) => card.id),
      };
      setCards([...arr]);
      console.log(cards);
      singleton.setCard([...cards.filter((card) => card.id === id)], true);
    };
  };

  const acceptCard = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (value !== "") {
      const card: CardInfo = {
        id: uniqid(),
        title: value,
        author: undefined,
        column: titleState,
        comments: [],
        description: "",
        commentsNum: 0,
      };
      setValue("");
      setCards([...cards, card]);
      const column: ColumnData = {
        columnName: titleState,
        cards: cards.map((card) => card.id),
      };
      singleton.setCard([card], false);
      setCardIsAdd((cardIsAdd) => !cardIsAdd);
    }
  };

  const editColumnTitle = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setValue(titleState);
    setColumnIsEdit((columnIsEdit) => !columnIsEdit);
  };

  const acceptNewTitle = () => {
    setTitleState(value);
    setValue("");
    setColumnIsEdit((columnIsEdit) => !columnIsEdit);
  };

  return (
    <WraperColumn>
      {columnIsEdit && (
        <InputBlock>
          <Input
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setValue(e.target.value);
            }}
          />
          <Button image={done} event={acceptNewTitle} />
        </InputBlock>
      )}
      {!columnIsEdit && (
        <TitleBlock onClick={editColumnTitle}>
          <h3>{titleState}</h3>
        </TitleBlock>
      )}
      <WrapeCards>
        {cards.map((item, index) => (
          <Card
            id={item.id}
            key={item.id}
            author={item.author}
            title={item.title}
            column={item.column}
            comments={item.comments}
            description={item.description}
            commentsNum={item.commentsNum}
            dropCard={dropCard(item.id)}
            curentUser={curentUser}
            fullCommentsArr={fullCommentsArr}
          />
        ))}
      </WrapeCards>
      {cardIsAdd && (
        <InputBlock>
          <input
            type="text"
            className="card-title"
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setValue(e.target.value);
            }}
          />
          <Button image={done} event={acceptCard} />
        </InputBlock>
      )}
      <div>
        <button
          className="column__btn"
          onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            setCardIsAdd((cardIsAdd) => !cardIsAdd);
          }}
        >
          Создать карточку
        </button>
      </div>
    </WraperColumn>
  );
}
const WraperColumn = styled.div`
  width: 272px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px 20px;
  padding-bottom: 10px;
`;
const WrapeCards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
`;
const TitleBlock = styled.div`
  cursor: pointer;
`;
export default Column;
