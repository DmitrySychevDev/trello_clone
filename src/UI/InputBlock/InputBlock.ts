import styled from "styled-components";
const InputBlock = styled.div.attrs((props) => ({
  className: props.className,
}))<{ defaultDisplay: string }>`
  display: ${(props) => props.defaultDisplay || "none"};
  width: 70%;
  gap: 30px;
  align-items: center;
`;
export default InputBlock;
