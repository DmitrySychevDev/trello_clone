import React,{useState} from "react";
import "../styles/Column.css";
import done from "../images/done.png"
import Card from './Card'

interface ColumnProps{
    title:string;
    num:number;
    author:string;
}

function Column(props:ColumnProps)
{
    interface cardInfo{
        title:string[];
        author:string;
    }
    const[cards,setCards]=useState<cardInfo[]>([]);
    let [cardsNum,setCardsNum]=useState<number>(0);
    console.log(cards);
    const [value,setValue]=useState<string>("");
    return(
        <div className="column">
            <div>
                <h3>{props.title}</h3>
            </div>
            <div className="cards-block">
                    {cards.map((item,index)=>(<Card key={index} author={item.author} title={item.title}/>))}
            </div>
            <div className="column__input">
                <textarea className="card-title" value={value} onChange={(e:React.ChangeEvent<HTMLTextAreaElement>)=>{setValue(e.target.value)}} />
                <button className="card_title_accept" onClick={(e)=>{
                    const inputBlock:any=document.querySelectorAll(".column__input").item(props.num);
                    if(value!=""){
                    let cardsArr:cardInfo[]=cards;
                    setValue("");
                    const card:cardInfo={
                        title:value.split("\n"),
                        author:props.author
                    }
                    cardsArr.push(card);
                    setCards(cardsArr);
                    setCardsNum(++cardsNum);
                }
                    inputBlock.style.display="none";

                }}>
                    <img src={done}/>
                </button>
            </div>
            <div>
                <button className="column__btn" onClick={(e)=>{
                    e.preventDefault();
                    const input:any=document.querySelectorAll(".column__input").item(props.num);
                    input.style.display="flex";
                
                }}>Создать карточку</button>
            </div>
        </div>
    )
}
export default Column;