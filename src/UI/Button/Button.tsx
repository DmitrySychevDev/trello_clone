import React from "react";
import styled from "styled-components";
interface Props {
  image: string;
  event: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const UiButton = styled.button`
  border: none;
  background-color: #ffffff;
  z-index: 20;
  img {
    width: 20px;
    height: 20px;
  }
`;
function Button({ image, event }: Props) {
  return (
    <UiButton onClick={event}>
      <img src={image} />
    </UiButton>
  );
}
export default Button;
