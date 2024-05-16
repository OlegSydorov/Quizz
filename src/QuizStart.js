import './index.css';
import React, {useState, useContext, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import Question from "./Question";
import QuestionsContext from './Contexts';


function QuizStart(){

    const[category, setCategory]=useState(0);
    const[categoriesList, setCategoriesList]=useState([]);
    const[difficulty, setDifficulty]=useState("");

    const[selectionCriteria, setSelectionCriteria]=useState(false);

    const[answeredQuestions, setAnsweredQuestions]=useState(new Set());
    
    const {questionsList}=useContext(QuestionsContext);
    const {setQuestionsList} = useContext(QuestionsContext);

    const navigate=useNavigate();
    
    useEffect(()=>{
       if (answeredQuestions.size==5){
        document.getElementById("answerSubmit").style.display="block";
       } 
    },[answeredQuestions]);   
    

    useEffect(()=>{
        //console.log("categories obtain useEffect start");
        getCategories();
    },[]);

    useEffect(()=>{
        //console.log("questions obtain useEffect start");
        if (selectionCriteria){
            document.getElementById("createBtn").disabled=true;	
            getQuestions(category, difficulty);
        }
        else{
            document.getElementById("createBtn").disabled=false;	
        }
    },[selectionCriteria]);

    async function getCategories() {
        const response = await fetch("https://opentdb.com/api_category.php");
        const responseText = await response.json();
        //console.log(responseText);
        //console.log(responseText["trivia_categories"]);
        setCategoriesList(responseText["trivia_categories"])
    }

    async function getQuestions(param1, param2){        
        const response = await fetch("https://opentdb.com/api.php?amount=5&category="+param1+"&difficulty="+param2+"&type=multiple");
        const responseText = await response.json();
        console.log(responseText);
        var newQuestions=[];        
        var counter=0;
        responseText["results"].map((item)=>{newQuestions.push(getQuestion(counter++, item));})
        //console.log("NEW questions: ", newQuestions);
        setQuestionsList(newQuestions);
    }

    function getQuestion(counter, rawItem){
        var id=counter;
        var text=rawItem["question"];
        var correctAnswer=rawItem["correct_answer"];
        var selectedAnswer='';
        var answers=[];
        answers.push(rawItem["correct_answer"]);
        for(var a of rawItem["incorrect_answers"]){
            answers.push(a);
        }
        return {id:id, text:text, correctAnswer:correctAnswer, selectedAnswer:selectedAnswer, answers:shuffleAnswers(answers)};        
    }

    function shuffleAnswers(arr){
        //console.log(arr);
        let currentIndex = arr.length;
        while (currentIndex != 0) {
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]];
        }
        //console.log(arr);
        return arr;
    }

    function changeCategory(event){
        setCategory(event.target.value);                
    }

    function changeDifficulty(event){
        setDifficulty(event.target.value);        
    }

    function questionSelect(questionId, selectedItem){
        var newList=[];
        questionsList.map((item)=>{
            if (questionId==item.id){
                item.selectedAnswer=selectedItem;                
            }
            newList.push(item);
        })
        setQuestionsList(newList);

        var newSet=new Set();
        for (const s of answeredQuestions){
            newSet.add(s);
        }
        newSet.add(questionId);
        //console.log("NEW SET of selected answers:", newSet);
        setAnsweredQuestions(newSet);
    }

    function submitAnswers(){
        //alert("Answers will be submitted");
        //console.log(questionsList);
        navigate("/results");
    }
    
    return (
        <div>
            <h1>QUIZ MAKER</h1>
        <form id="add-form" className="form-start" onSubmit={(e) => {
            e.preventDefault();
             if (category!=0 && difficulty.length>0){
                 //console.log(category,difficulty);
                 setSelectionCriteria(true);                 
             }
            }}>
                <select name="categorySelect" className="select-left" id="categorySelect" onChange={changeCategory}>
                    <option value="">Select a category</option>
                    {categoriesList && categoriesList.map((item)=>
                        <option key={item.id} value={item.id}>{item.name}</option>
                    )}
                </select>
                <select name="difficultySelect" className="select-right" id="difficultySelect" onChange={changeDifficulty}>
                    <option value="" >Select difficulty</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
                <button id="createBtn" className="button-create">Create</button>
        </form>
        {questionsList.length>0 && questionsList.map((item)=>           
                <Question key={item.id} data={item} onSelect={questionSelect}/>                
           )}
            <button id="answerSubmit" type="button" style={{display:"none",}} className="center-button" onClick={submitAnswers}>
                    SUBMIT
                </button>
        </div>
    )

}

export default QuizStart;