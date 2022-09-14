import React, { useState, useEffect } from "react";
import done from "../../images/done.png";
import { Card } from "../";
import styled from "styled-components";
import { Button, InputBlock } from "../ui";
import { CardInfo, ColumnData } from "../types";

interface ColumnProps {
  title: string;
  curentUser: string;
  authorProp: string;
  change: Function;
  cardsArr: CardInfo[];
}

function Column({
  title,
  curentUser,
  authorProp,
  change,
  cardsArr,
}: ColumnProps) {
  const [cards, setCards] = useState<CardInfo[]>(cardsArr);
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
    const column: ColumnData = {
      columnName: titleState,
      cards: [...cards],
    };
    change(column);
  }, [titleState]);
  useEffect(() => {
    const column: ColumnData = {
      columnName: titleState,
      cards: [...cards],
    };
    change(column);
  }, [cards]);
  const dropCard = (index: number) => {
    return () => {
      const arr: CardInfo[] = [...cards];
      arr.splice(index, 1);
      const column: ColumnData = {
        columnName: titleState,
        cards: [...cards],
      };
      change(column);
      setCards([...arr]);
      console.log(cards);
    };
  };

  const acceptCard = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (value !== "") {
      const card: CardInfo = {
        title: value,
        author: authorProp,
        column: titleState,
        comments: [],
        description: "",
        commentsNum: 0,
      };
      setValue("");
      setCards([...cards, card]);
      const column: ColumnData = {
        columnName: titleState,
        cards: [...cards],
      };
      setCardIsAdd((cardIsAdd) => !cardIsAdd);
      change(column);
    }
  };

  const changeCards = (index: number) => {
    return (card: CardInfo) => {
      setCards([...cards.slice(0, index), card, ...cards.slice(index + 1)]);
    };
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
          <input
            type="text"
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
            key={index}
            author={item.author}
            title={item.title}
            column={item.column}
            comments={item.comments}
            description={item.description}
            commentsNum={item.commentsNum}
            dropCard={dropCard(index)}
            fixCardChage={changeCards(index)}
            curentUser={curentUser}
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
