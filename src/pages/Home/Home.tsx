import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Column, Popup } from "../../components";
import { CardInfo, ColumnData } from "../../components/types";
import { useLocalStorage } from "../../hooks";

function Home() {
  const [localData, setLocalData] = useLocalStorage<ColumnData[]>("data", [
    { columnName: "TODO", cards: [] },
    { columnName: "In Progress", cards: [] },
    { columnName: "Testing", cards: [] },
    { columnName: "Done", cards: [] },
  ]);
  const [name, setName] = useState<string>("User");
  const [popuIsOpen, setPopupIsOpen] = useState<boolean>(true);
  const [columns, setColumns] = useState<ColumnData[]>(
    localData
      ? localData
      : [
          { columnName: "TODO", cards: [] },
          { columnName: "In Progress", cards: [] },
          { columnName: "Testing", cards: [] },
          { columnName: "Done", cards: [] },
        ]
  );
  console.log(name);
  useEffect(() => {
    setLocalData(columns);
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
            authorProp={name}
            title={val.columnName}
            curentUser={name}
            change={editColumn(index)}
            cardsArr={val.cards}
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
