// src/components/QuizParticipant.js
import React, { useState, useEffect } from 'react';
import { Button, Alert } from 'react-bootstrap';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

function QuizParticipant() {
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Listen for new question from the server
    socket.on('question', (newQuestion) => {
      setQuestion(newQuestion);
      setSubmitted(false); // Reset submitted flag when a new question is received
    });

    // Listen for quiz end signal
    socket.on('quizEnd', () => {
      alert('The quiz has ended!');
    });

    return () => socket.off('question');
  }, []);

  const submitAnswer = () => {
    socket.emit('submitAnswer', { answer });
    setSubmitted(true);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Quiz Participant</h2>
      {question ? (
        <div>
          <h4>{question.text}</h4>
          {question.options.map((option, index) => (
            <Button
              key={index}
              variant="outline-primary"
              className="mt-2"
              onClick={() => setAnswer(option)}
              disabled={submitted}
            >
              {option}
            </Button>
          ))}
          <div className="mt-3">
            <Button onClick={submitAnswer} variant="success" disabled={submitted}>
              Submit Answer
            </Button>
          </div>
          {submitted && (
            <Alert variant="info" className="mt-3">
              Answer submitted!
            </Alert>
          )}
        </div>
      ) : (
        <Alert variant="warning">Waiting for the quiz to start...</Alert>
      )}
    </div>
  );
}

export default QuizParticipant;
