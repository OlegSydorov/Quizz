import React from 'react';
import './index.css';

function AnsweredQuestion({data, onSelect}){

    return (
        <div id={"question_div"+data.id.toString()}>
            <p style={{fontWeight:"bolder"}}> {data.text}</p>
            {data.answers.map((item, index)=>
                <button key={index} id={data.id.toString()+index.toString()} className="answer-button" type="button" value={item} 
                style={{backgroundColor:item==data.correctAnswer?"#00FF00":item==data.selectedAnswer?"#FF0000":"#FFFFFF"}}>{item}</button>                
            )}                
        </div>
    )
}

export default AnsweredQuestion;