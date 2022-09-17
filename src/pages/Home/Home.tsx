import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Column, Popup } from "../../components";
import { CardInfo, ColumnData, CommentsInfo } from "../../components/types";
import localStorageService from "../../LocalStorageService";

function Home() {
  const [name, setName] = useState<string>("User");
  const [comments, setComments] = useState<CommentsInfo[]>(
    localStorageService.getComments()
  ); //TODO добавить работу с localStorage
  const [popuIsOpen, setPopupIsOpen] = useState<boolean>(true);
  const [columns, setColumns] = useState<ColumnData[]>(
    localStorageService.getColumns()
  );
  const [cards, setCards] = useState<CardInfo[]>(
    localStorageService.getCards()
  );
  useEffect(() => {
    columns.forEach((col, index) => {
      localStorageService.setColumn(columns);
    });
  }, [columns]);

  useEffect(() => {
    columns.forEach((col, index) => {
      localStorageService.setComments(comments);
    });
  }, [comments]);

  useEffect(() => {
    columns.forEach((col, index) => {
      localStorageService.setCard(cards);
    });
  }, [cards]);

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

  const changeComments = (commentsParam: CommentsInfo[], isDelete: boolean) => {
    if (!isDelete) {
      commentsParam.forEach((comment) => {
        const index = comments
          .map((commentEl) => commentEl.id)
          .indexOf(comment.id);
        if (index !== -1) {
          setComments([
            ...comments.slice(0, index),
            comment,
            ...comments.slice(index + 1),
          ]);
        } else {
          setComments([...comments, comment]);
        }
      });
    } else
      setComments(
        comments.filter((comment) => comment.id !== commentsParam[0].id)
      );
  };

  const changeCards = (cardsParam: CardInfo[], isDelete: boolean) => {
    if (!isDelete) {
      cardsParam.forEach((card) => {
        const index = cards.map((cardEl) => cardEl.id).indexOf(card.id);
        if (index !== -1) {
          setCards([...cards.slice(0, index), card, ...cards.slice(index + 1)]);
        } else {
          setCards([...cards, card]);
        }
      });
    } else setCards(cards.filter((card) => card.id !== cardsParam[0].id));
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
            fixChangesOfCards={changeCards}
            fixChangesOfComments={changeComments}
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
