import styled from "styled-components";
import React, { useState } from "react";
import { Popup } from "../../components";
import { Column } from "../../features/columns/Column";
import { useAppSelector } from "../../App/hooks";

function Home() {
  const [name, setName] = useState<string>("User");
  const [popuIsOpen, setPopupIsOpen] = useState<boolean>(true);
  const columns = useAppSelector((state) => state.columns);
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
            curentId={val.id}
            key={index}
            title={val.columnName}
            curentUser={name}
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
