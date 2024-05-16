import './App.css';
import './index.css';
import {BrowserRouter as Router, Routes, Route, Navigate, Redirect} from 'react-router-dom';
import React, {useState, useContext} from 'react';
import QuizStart from './QuizStart';
import QuizResult from './QuizResult';
import QuestionsContext from './Contexts';

function App() {
  const[questionsList, setQuestionsList]=useState([]);
  return (
    <div className="App">
      <QuestionsContext.Provider value={{questionsList, setQuestionsList}}>
       <Router>
        <Routes>
          <Route index element={<QuizStart/>}/>
          <Route exact path="/results" element={<QuizResult/>}/>
        </Routes>
      </Router>
      </QuestionsContext.Provider>
    </div>
  );
}

export default App; 