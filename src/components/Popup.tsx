import React,{useState} from "react";
 interface PopupProps{
    event:Function; 
        };
function Popup({event}:PopupProps){
      return(
        <div className="popup-contener">
            <div className="popup-wraper">
                <form className="form-popup">
                    <label className="form__text">Enter your name</label>
                    <input className="form__input" id="name" type="text" ></input>
                    <button className="form__btn" onClick={(e)=>{
                        e.preventDefault();
                        const name:string=(document.getElementById("name") as HTMLInputElement).value;
                        event(name);
                        const popupBlock:any=document.querySelector(".popup-contener");
                        popupBlock.style.opacity=0;
                        setTimeout(() => {
                            popupBlock.remove();
                        }, 500);
                    }}>Enter</button>
                </form>
            </div>
        </div>
    );
}
export default Popup;