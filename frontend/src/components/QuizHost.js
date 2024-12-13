// src/components/QuizHost.js
import React, { useState, useEffect } from 'react';
import { Button, Alert } from 'react-bootstrap';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

function QuizHost() {
  const [quizState, setQuizState] = useState('Not Started');
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    socket.on('question', (newQuestion) => {
      setQuestion(newQuestion);
    });

    socket.on('quizEnd', () => {
      setQuizState('Quiz Ended');
    });

    return () => socket.off('question');
  }, []);

  const startQuiz = () => {
    socket.emit('startQuiz');
    setQuizState('Started');
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Quiz Host</h2>
      <Button variant="primary" onClick={startQuiz} size="lg" className="d-block w-100">
        Start Quiz
      </Button>
      <Alert variant={quizState === 'Started' ? 'success' : 'danger'} className="mt-3">
        {quizState}
      </Alert>
      {question && (
        <div className="mt-4">
          <h4>{question.text}</h4>
        </div>
      )}
    </div>
  );
}

export default QuizHost;
