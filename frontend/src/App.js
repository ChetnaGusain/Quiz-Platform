// src/App.js
import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles
import QuizHost from './components/QuizHost';
import QuizParticipant from './components/QuizParticipant';
import Leaderboard from './components/Leaderboard';

function App() {
  return (
    <div className="App">
      <QuizHost />
      <QuizParticipant />
      <Leaderboard />
    </div>
  );
}

export default App;
