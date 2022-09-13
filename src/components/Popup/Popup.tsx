import styled from "styled-components";
import { PopupContaner } from "../../UI";
interface PopupProps {
  callback: Function;
}
const acceptName = (setName: Function) => {
  return function (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    const name: string = (document.getElementById("name") as HTMLInputElement)
      .value;
    setName(name);
    const popupBlock: any = document.querySelector(".popup-contener");
    popupBlock.style.opacity = 0;
    setTimeout(() => {
      popupBlock.remove();
    }, 500);
  };
};

const PopupWraper = styled.div`
  position: absolute;
  top: 25%;
  left: 35%;
  width: 349px;
  height: 339px;
  background-color: #ffffff;
  border-radius: 26px;
  padding-top: 89px;
`;
const Input = styled.input.attrs({
  type: "text",
  id: "name",
})`
  width: 201px;
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
function Popup({ callback }: PopupProps) {
  return (
    <PopupContaner className="popup-contener">
      <PopupWraper>
        <FormPopup>
          <Label>Enter Your name</Label>
          <Input />
          <AcceptNameBtn onClick={acceptName(callback)}>Enter</AcceptNameBtn>
        </FormPopup>
      </PopupWraper>
    </PopupContaner>
  );
}
export default Popup;
