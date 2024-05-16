import React from 'react';
import './index.css';

function Question({data, onSelect}){

    function onAnswerClick(event){
        
        var children = document.getElementById("question_div"+data.id.toString()).children;
        for (var i = 0; i < children.length; i++) {
            var childElement=children[i];
            childElement.style.background="#FFFFFF";
        }
        var button = document.getElementById(event.target.id);
        button.style.background="#CCCCFF";
        onSelect(data.id, event.target.value);
    }

    return (
        <div id={"question_div"+data.id.toString()}>
            <p style={{fontWeight:"bolder"}}> {data.text}</p>
            {data.answers.map((item, index)=>
                <button key={index} id={data.id.toString()+index.toString()} className="answer-button" type="button" onClick={onAnswerClick} value={item}>{item}</button>                
            )}                
        </div>
    )
}

export default Question;