const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// Leaderboard storage
let leaderboard = [];

// Questions list
const questions = [
  { text: "What is 2 + 2?", options: ["3", "4", "5", "6"], correct: "4" },
  { text: "Capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], correct: "Paris" },
  { text: "Who wrote 'Hamlet'?", options: ["Shakespeare", "Dickens", "Austen", "Twain"], correct: "Shakespeare" },
  { text: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Venus", "Jupiter"], correct: "Mars" }
];

let currentQuestionIndex = 0;

io.on('connection', (socket) => {
  console.log('New participant connected:', socket.id);

  leaderboard.push({ socketId: socket.id, name: `Player ${leaderboard.length + 1}`, score: 0 });

  socket.on('startQuiz', () => {
    currentQuestionIndex = 0;
    sendQuestionToParticipants(); // Send first question when quiz starts
  });

  socket.on('submitAnswer', (data) => {
    const player = leaderboard.find((p) => p.socketId === socket.id);
    if (player && data.answer === questions[currentQuestionIndex - 1].correct) {
      player.score += 10; // Add points for correct answer
    }
    io.emit('leaderboard', leaderboard); // Update leaderboard

    // After submitting answer, send next question
    sendQuestionToParticipants();
  });

  socket.on('disconnect', () => {
    leaderboard = leaderboard.filter((p) => p.socketId !== socket.id);
    io.emit('leaderboard', leaderboard);
    console.log('Participant disconnected:', socket.id);
  });
});

const sendQuestionToParticipants = () => {
  if (currentQuestionIndex < questions.length) {
    io.emit('question', questions[currentQuestionIndex]);
    currentQuestionIndex++;
  } else {
    io.emit('quizEnd', leaderboard); // End of quiz when no questions left
  }
};

server.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
