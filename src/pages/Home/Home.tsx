import styled from "styled-components";
import React, { useState } from "react";
import { Column, Popup } from "../../components";
const Columns = styled.div`
  display: flex;
  justify-content: space-around;
  padding-top: 20px;
`;
function Home() {
  const [name, setName] = useState<string>("User");
  const columns: string[] = ["TODO", "In Progress", "Testing", "Done"];

  return (
    <div className="App">
      <Popup
        callback={(nameParam: string) => {
          setName(nameParam);
        }}
      />
      <Columns>
        {columns.map((val, index) => (
          <Column key={index} authorProp={name} num={index} title={val} />
        ))}
      </Columns>
    </div>
  );
}
export default Home;
