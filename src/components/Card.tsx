import React from "react";
import pencil from "../images/draw.png"
interface cardProps{
    author:string;
    title:string[];
}
function Card(props:cardProps){
    interface commentInfo{
        text:string;
        author:string;
    }
    interface info{
        author:string;
        title:string[];
        comments:commentInfo[];
        description:string;
        comentNum:number;
    }
    console.log("card render");
    return(
    <div className="card">
        <div className="card-text-block">
        {props.title.map((item,index)=>(<p>{item}</p>))}
        </div>
        <div>
        <button className="edit-card-btn"><img src={pencil}/></button>
        </div>
    </div>
    );
}
export default Card;