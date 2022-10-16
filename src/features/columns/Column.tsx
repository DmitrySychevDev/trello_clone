import React, { useState, useEffect } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { done } from "../../images";
import { Card } from "../cards";
import styled from "styled-components";
import { Button, InputBlock, Input } from "../../components/ui";
import { CardInfo, ColumnData } from "../../types";
import { useAppSelector, useAppDispatch } from "../../App/hooks";
import { addCard, deleteCard } from "../cards/cardsSlice";
import {
  attachCardToColumn,
  updateColumn,
  unattachCardOfColumn,
} from "./columnsSlice";

interface ColumnProps {
  curentId: string;
  title: string;
  curentUser: string;
}

export function Column({ curentId, title, curentUser }: ColumnProps) {
  const cardsArrOnColumn = useAppSelector(
    (state) => state.columns.find((column) => column.id === curentId)?.cards
  );
  const cards = useAppSelector((state) =>
    state.cards.filter((card) => cardsArrOnColumn?.indexOf(card.id) !== -1)
  );
  const [value, setValue] = useState<string>("");
  const [titleState, setTitleState] = useState<string>(title);
  const [cardIsAdd, setCardIsAdd] = useState<boolean>(false);
  const [columnIsEdit, setColumnIsEdit] = useState<boolean>(false);

  const dispath = useAppDispatch();

  useEffect(() => {
    const column: ColumnData = {
      id: curentId,
      columnName: titleState,
      cards: cards.map((card) => card.id),
    };
    dispath(updateColumn(column));
  }, [titleState]);

  const dropCard = (id: string) => {
    return () => {
      dispath(deleteCard(id));
      dispath(unattachCardOfColumn({ columnId: curentId, cardId: id }));
    };
  };

  const acceptCard = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (value !== "") {
      const card: CardInfo = {
        id: nanoid(),
        title: value,
        author: curentUser,
        comments: [],
        description: "",
        commentsNum: 0,
      };
      setValue("");
      dispath(addCard(card));
      dispath(attachCardToColumn({ columnId: curentId, cardId: card.id }));
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
            column={titleState}
            dropCard={dropCard(item.id)}
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
  height: min-content;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px 20px;
  padding-bottom: 10px;
  border-radius: 10px;
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
