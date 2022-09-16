import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Column, Popup } from "../../components";
import { CardInfo, ColumnData, CommentsInfo } from "../../components/types";
import singleton from "../../LocalStorageService";

function Home() {
  const [name, setName] = useState<string>("User");
  const [comments, setComments] = useState<CommentsInfo[]>(
    singleton.getComments()
  ); //TODO добавить работу с localStorage
  const [popuIsOpen, setPopupIsOpen] = useState<boolean>(true);
  const [columns, setColumns] = useState<ColumnData[]>(singleton.getColumns());
  const [cards, setCards] = useState<CardInfo[]>(singleton.getCards());
  useEffect(() => {
    columns.forEach((col, index) => {
      singleton.setColumn(col, index);
    });
  }, [columns]);

  const editColumn = (index: number) => {
    return (data: ColumnData) => {
      const arr = [...columns];
      arr[index] = data;
      setColumns([...arr]);
    };
  };

  const closePopup = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setPopupIsOpen((popuIsOpen) => !popuIsOpen);
  };

  return (
    <div className="App">
      {popuIsOpen && (
        <Popup
          setUser={(nameParam: string) => {
            setName(nameParam);
          }}
          close={closePopup}
        />
      )}
      <Columns>
        {columns.map((val, index) => (
          <Column
            key={index}
            index={index}
            title={val.columnName}
            curentUser={name}
            change={editColumn(index)}
            cardsArr={val.cards}
            fullCardsArr={cards}
            fullCommentsArr={comments}
          />
        ))}
      </Columns>
    </div>
  );
}

const Columns = styled.div`
  display: flex;
  justify-content: space-around;
  padding-top: 20px;
`;

export default Home;
