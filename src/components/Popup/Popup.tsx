import styled from "styled-components";
import React, { useState } from "react";
import { PopupOverlay } from "../ui";
interface PopupProps {
  setUser: Function;
  close: Function;
}

function Popup({ setUser, close }: PopupProps) {
  const closeEvent = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    close();
  };
  const onModalClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  };
  const acceptName = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    close();
    if (!!value) {
      setUser(value);
    }
  };
  const [value, setValue] = useState<string>("");
  return (
    <PopupOverlay onClick={closeEvent}>
      <PopupWraper onClick={onModalClick}>
        <FormPopup>
          <Label>Enter Your name</Label>
          <Input
            type="text"
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setValue(e.target.value);
            }}
          />
          <AcceptNameBtn onClick={acceptName}>Enter</AcceptNameBtn>
        </FormPopup>
      </PopupWraper>
    </PopupOverlay>
  );
}
const PopupWraper = styled.div`
  position: absolute;
  top: 25%;
  left: 35%;
  width: 349px;
  height: 339px;
  background-color: #ffffff;
  border-radius: 26px;
  padding-top: 89px;
  z-index: 5;
`;
const Input = styled.input`
  width: 200px;
  height: 36px;
  padding-left: 10px;
  border-radius: 26px;
`;
const AcceptNameBtn = styled.button`
  width: 152px;
  height: 33px;
  border-radius: 20px;
  background-color: black;
  color: #ffffff;
`;
const Label = styled.label`
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
`;
const FormPopup = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 22px;
`;
export default Popup;
