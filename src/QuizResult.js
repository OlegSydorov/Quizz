import {Navigate, Outlet, useNavigate} from "react-router-dom";
import React, {useState, useContext, useEffect} from 'react';
import AnsweredQuestion from "./AnsweredQuestion";
import QuestionsContext from './Contexts';


function QuizResult(){
    
    const [correctAnswers, setCorrectAnswers]=useState({score:0, color:"#FFFF00"});
    const {questionsList}=useContext(QuestionsContext);
    const {setQuestionsList} = useContext(QuestionsContext);
    const navigate = useNavigate();

    useEffect(()=>{
        let corrAnswerCount=0;
        questionsList.forEach((item)=>item.correctAnswer==item.selectedAnswer&&corrAnswerCount++);
        //console.log(corrAnswerCount);
        setCorrectAnswers({score:corrAnswerCount, color:corrAnswerCount<2?"#FF0000":corrAnswerCount>3?"#00FF00":"#FFFF00"});
    },[]);

    function restartClick(){
        setQuestionsList([]);
        navigate("/");
    }
    return (
        <div>
            <h1>RESULTS</h1>  
            {questionsList.map((item)=><AnsweredQuestion key={item.id} data={item}/>)}
            <br/>
            <div style={{backgroundColor:correctAnswers.color}} className="score-div">
                You scored {correctAnswers.score} out of 5
            </div>
            <br/>
            <button id="restartButton" type="button"  className="center-button" onClick={restartClick}>
                    CREATE A NEW QUIZZ
            </button>
        </div>
    )

}

export default QuizResult;