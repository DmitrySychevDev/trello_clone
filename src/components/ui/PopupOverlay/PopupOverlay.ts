import styled from "styled-components";
const PopupOverlay = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(17, 17, 17, 0.5);
  opacity: 1;
  transition: all 0.5s ease-in-out;
  z-index: 1;
`;
export default PopupOverlay;
