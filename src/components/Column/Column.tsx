import React, { useState } from "react";
import done from "../../images/done.png";
import { Card } from "../";
import styled from "styled-components";
import { Button, InputBlock } from "../../UI";
import { CardInfo } from "../types";

interface ColumnProps {
  title: string;
  num: number;
  authorProp: string;
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
function Column({ title, num, authorProp }: ColumnProps) {
  const addCard = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const input: any = document.querySelectorAll(".column__input").item(num);
    input.style.display = "flex";
  };
  const [cards, setCards] = useState<CardInfo[]>([]);
  const [value, setValue] = useState<string>("");
  const [titleState, setTitleState] = useState<string>(title);
  const dropCard = (index: number) => {
    return () => {
      const arr: CardInfo[] = [...cards];
      arr.splice(index, 1);
      setCards([...arr]);
    };
  };
  const acceptCard = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const inputBlock: any = document
      .querySelectorAll(".column__input")
      .item(num);
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
    }
    inputBlock.style.display = "none";
  };
  const editColumnTitle = () => {
    const inputBlock: any = document
      .querySelectorAll(".colunm-title-input")
      .item(num);
    setValue(titleState);
    const titleBlock: any = document
      .querySelectorAll(".column-title")
      .item(num);
    titleBlock.style.display = "none";
    inputBlock.style.display = "flex";
  };
  const acceptNewTitle = () => {
    const inputBlock: any = document
      .querySelectorAll(".colunm-title-input")
      .item(num);
    setTitleState(value);
    title = titleState;
    const titleBlock: any = document
      .querySelectorAll(".column-title")
      .item(num);
    titleBlock.style.display = "block";
    inputBlock.style.display = "none";
    setValue("");
  };
  return (
    <WraperColumn>
      <InputBlock className="colunm-title-input" defaultDisplay="none">
        <input
          type="text"
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value);
          }}
        />
        <Button image={done} event={acceptNewTitle} />
      </InputBlock>
      <div className="column-title" onClick={editColumnTitle}>
        <h3>{titleState}</h3>
      </div>
      <WrapeCards>
        {cards.map((item, index) => (
          <Card
            author={item.author}
            title={item.title}
            column={item.column}
            comments={item.comments}
            description={item.description}
            commentsNum={item.commentsNum}
            dropCard={dropCard(index)}
          />
        ))}
      </WrapeCards>
      <InputBlock className="column__input" defaultDisplay="none">
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
      <div>
        <button className="column__btn" onClick={addCard}>
          Создать карточку
        </button>
      </div>
    </WraperColumn>
  );
}
export default Column;
