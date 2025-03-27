import React from "react";
import Header from "./components/Header.jsx";
import Game from "./components/Game.jsx";

// Entity Component
export function Entity({ health, name }) {
  return (
    <div>
      <h2>{name}</h2>
      <div className="healthbar">
        <div className="healthbar__value" style={{ width: `${health}%` }}></div>
      </div>
    </div>
  );
}

// GameOver Component
export function GameOver({ title, restartGame }) {
  return (
    <div>
      <h3>{title}</h3>
      <button onClick={restartGame}>Start New Game</button>
    </div>
  );
}

// Log Component
export function Log({ logs }) {
  return (
    <section id="log">
      <ul>
        {logs.map((log, index) => (
          <li
            key={index}
            className={`${log.isPlayer ? "log--player" : "log--monster"} ${
              log.isDamage ? "log--damage" : "log--heal"
            }`}
          >
            {log.isPlayer ? "Player" : "Monster"} {log.text}
          </li>
        ))}
      </ul>
    </section>
  );
}

function App() {
  return (
    <div>
      <Header gameName="Monster Slayer" />
      <Game />
    </div>
  );
}

export default App;