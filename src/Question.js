import React, {useState} from 'react';
import './index.css';

function Question({data, onSelect}){

    var colorList=[];
    for(let i=0; i<data.answers.length; i++){
        colorList.push("#FFFFFF");
    }
    const[btnColor, setBtnColor]=useState(colorList);

    function onAnswerClick(event){
        onSelect(data.id, event.target.value);     
        setBtnColor(btnColor.map((item, index)=>item=index==event.target.id?"#CCCCFF":"#FFFFFF"));
    }

    return (
        <div id={"question_div"+data.id.toString()}>
            <p style={{fontWeight:"bolder"}}> {data.text}</p>
            {data.answers.map((item, index)=>
                <button type="button" key={index} id={index} value={item} className="answer-button" style={{backgroundColor:btnColor[index]}} onClick={onAnswerClick}>{item}</button>
            )}                
        </div>
    )
}

export default Question;