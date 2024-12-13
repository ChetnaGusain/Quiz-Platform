// src/components/Leaderboard.js
import React, { useState, useEffect } from 'react';
import { ListGroup, Card } from 'react-bootstrap';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    socket.on('leaderboard', (data) => {
      setLeaderboard(data);
    });

    return () => socket.off('leaderboard');
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Leaderboard</h2>
      <Card className="shadow p-3">
        <ListGroup>
          {leaderboard.length > 0 ? (
            leaderboard.map((player, index) => (
              <ListGroup.Item key={index} className="d-flex justify-content-between">
                <strong>{player.name}</strong>
                <span>{player.score} points</span>
              </ListGroup.Item>
            ))
          ) : (
            <ListGroup.Item>No participants yet!</ListGroup.Item>
          )}
        </ListGroup>
      </Card>
    </div>
  );
}

export default Leaderboard;
