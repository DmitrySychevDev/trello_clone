import React from 'react';
import styled from "styled-components"
import './App.css';
import './components/Popup';
import Popup from './components/Popup';
import Column from './components/Column';

import {useState} from 'react';

function App() {
  const [name,setName]=useState<string>("User");
  console.log(name);
  let columns:string[]=["TODO","In Progress","Testing","Done"];
  return (
    <div className="App">
      <Popup event={(nameParam:string)=>{ setName(nameParam);}}/>
      <div className='column-block'>
        {
        columns.map((val,index)=>(<Column key={index} author={name} num={index} title={val}/>))
        }
      </div>
    </div>
  );
}

export default App;
