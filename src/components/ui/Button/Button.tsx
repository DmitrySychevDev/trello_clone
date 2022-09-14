import React from "react";
import styled from "styled-components";
interface Props {
  image: string;
  event: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

function Button({ image, event }: Props) {
  return (
    <UiButton onClick={event}>
      <img src={image} />
    </UiButton>
  );
}
const UiButton = styled.button`
  border: none;
  background-color: #ffffff;
  z-index: 20;
  cursor: pointer;
  img {
    width: 20px;
    height: 20px;
  }
`;
export default Button;
