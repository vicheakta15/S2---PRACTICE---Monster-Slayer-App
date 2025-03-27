import React, { useState } from "react";
import { Entity, GameOver, Log } from "../App.jsx";

// ---------------------------------------------------------------------------------------------------------- 
// HELPER FUNCTIONS
// ----------------------------------------------------------------------------------------------------------

// Generate a random values in the range {min, max}
function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Create an attack log
function createLogAttack(isPlayer, damage) {
  return {
    isPlayer: isPlayer,
    isDamage: true,
    text: ` takes ${damage} damages`,
  };
}

// Create a healing log
function createLogHeal(healing) {
  return {
    isPlayer: true,
    isDamage: false,
    text: ` heal ${healing} life points`,
  };
}

function Game() {
  // ---------------------------------------------------------------------------------------------------------- 
  // STATES & VARIABLES
  // ----------------------------------------------------------------------------------------------------------
  const [playerHealth, setPlayerHealth] = useState(100);
  const [monsterHealth, setMonsterHealth] = useState(100);
  const [logs, setLogs] = useState([]);
  const [turnCount, setTurnCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [result, setResult] = useState("");

  // Computed value for special attack availability
  const isSpecialAttackAvailable = turnCount > 0 && turnCount % 3 === 0;

  // ---------------------------------------------------------------------------------------------------------- 
  // BUTTONS EVENT FUNCTIONS
  // ----------------------------------------------------------------------------------------------------------

  const handleAttack = () => {
    const playerDamage = getRandomValue(5, 12);
    const monsterDamage = getRandomValue(8, 15);

    setMonsterHealth((prev) => Math.max(0, prev - playerDamage));
    setPlayerHealth((prev) => Math.max(0, prev - monsterDamage));
    setLogs((prev) => [
      createLogAttack(true, playerDamage),
      createLogAttack(false, monsterDamage),
      ...prev,
    ]);
    setTurnCount((prev) => prev + 1);
    checkGameEnd();
  };

  const handleSpecialAttack = () => {
    const playerDamage = getRandomValue(10, 25);
    const monsterDamage = getRandomValue(8, 15);

    setMonsterHealth((prev) => Math.max(0, prev - playerDamage));
    setPlayerHealth((prev) => Math.max(0, prev - monsterDamage));
    setLogs((prev) => [
      createLogAttack(true, playerDamage),
      createLogAttack(false, monsterDamage),
      ...prev,
    ]);
    setTurnCount((prev) => prev + 1);
    checkGameEnd();
  };

  const handleHeal = () => {
    const healAmount = getRandomValue(8, 20);
    const monsterDamage = getRandomValue(8, 15);

    setPlayerHealth((prev) => Math.min(100, prev + healAmount));
    setPlayerHealth((prev) => Math.max(0, prev - monsterDamage));
    setLogs((prev) => [
      createLogHeal(healAmount),
      createLogAttack(false, monsterDamage),
      ...prev,
    ]);
    setTurnCount((prev) => prev + 1);
    checkGameEnd();
  };

  const handleGiveUp = () => {
    setPlayerHealth(0);
    setGameOver(true);
    setResult("You Lost");
    setLogs((prev) => [{ isPlayer: true, isDamage: true, text: " gives up" }, ...prev]);
  };

  const restartGame = () => {
    setPlayerHealth(100);
    setMonsterHealth(100);
    setLogs([]);
    setTurnCount(0);
    setGameOver(false);
    setResult("");
  };

  // Helper to check game end
  const checkGameEnd = () => {
    if (playerHealth <= 0 && monsterHealth <= 0) {
      setGameOver(true);
      setResult("Draw Game");
    } else if (playerHealth <= 0) {
      setGameOver(true);
      setResult("You Lost");
    } else if (monsterHealth <= 0) {
      setGameOver(true);
      setResult("You Won");
    }
  };

  // ---------------------------------------------------------------------------------------------------------- 
  // JSX FUNCTIONS
  // ----------------------------------------------------------------------------------------------------------

  // ---------------------------------------------------------------------------------------------------------- 
  // MAIN TEMPLATE
  // ----------------------------------------------------------------------------------------------------------
  return (
    <section className="container">
      <Entity health={playerHealth} name="Player" />
      <Entity health={monsterHealth} name="Monster" />
      {!gameOver && (
        <div id="controls">
          <button onClick={handleAttack}>ATTACK</button>
          <button onClick={handleSpecialAttack} disabled={!isSpecialAttackAvailable}>
            SPECIAL ATTACK
          </button>
          <button onClick={handleHeal}>HEAL</button>
          <button onClick={handleGiveUp}>GIVE UP</button>
        </div>
      )}
      {gameOver && <GameOver title={result} restartGame={restartGame} />}
      <Log logs={logs} />
    </section>
  );
}

export default Game;