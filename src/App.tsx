import { useEffect, useState } from "react";
import "./App.css";
import Square from "./components/Square";

type Scores = {
  [key: string]: number;
};

const INITIAL_GAME_STATE = ["", "", "", "", "", "", "", "", ""];
const INITIAL_SCORES: Scores = { X: 0, O: 0 };
const WINNING_COMBO = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
function App() {
  const [gameState, setgameState] = useState(INITIAL_GAME_STATE);
  const [currentPlayer, setcurrentPlayer] = useState("X");
  const [scores, setScores] = useState(INITIAL_SCORES);

  useEffect(() => {
    const storedScores = localStorage.getItem("scores");
    if (storedScores) {
      setScores(JSON.parse(storedScores));
    }
  }, [gameState]);

  useEffect(() => {
    if (gameState === INITIAL_GAME_STATE) {
      return;
    }
    checkForWinner();
  }, [gameState]);

  const ResetBoard = () => {
    setgameState(INITIAL_GAME_STATE);
  };

  const handleWin = () => {
    alert(`Ganaste ${currentPlayer === "O" ? "Bolita" : "Equisita"}`);

    const newPlayerScore = scores[currentPlayer] + 1;
    const newScores = { ...scores };
    newScores[currentPlayer] = newPlayerScore;
    setScores(newScores);
    localStorage.setItem("scores", JSON.stringify(newScores));
    ResetBoard();
  };

  const handleDraw = () => {
    alert("Empataron estos paticos");
    ResetBoard();
  };

  const checkForWinner = () => {
    let roundWon = false;

    for (let i = 0; i < WINNING_COMBO.length; i++) {
      const winCombo = WINNING_COMBO[i];

      const a = gameState[winCombo[0]];
      const b = gameState[winCombo[1]];
      const c = gameState[winCombo[2]];

      if ([a, b, c].includes("")) {
        continue;
      }

      if (a === b && b === c) {
        roundWon = true;
        break;
      }
    }

    if (roundWon) {
      setTimeout(() => handleWin(), 500);
      return;
    }

    if (!gameState.includes("")) {
      setTimeout(() => handleDraw(), 500);
      return;
    }

    changePlayer();
  };

  const changePlayer = () => {
    setcurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  const handleClick = (event: any) => {
    const cellIndex = Number(event.target.getAttribute("data-cell-index"));

    const currentValue = gameState[cellIndex];

    if (currentValue) {
      return;
    }

    const newValues = [...gameState];
    newValues[cellIndex] = currentPlayer;
    setgameState(newValues);
  };
  return (
    <div className="h-screen p-8 text-slate-800 bg-gradient-to-l from-cyan-500 to-blue-500">
      <h1 className="text-center text-5xl mb-4 font-semibold text-white">
        Hola
      </h1>
      <div>
        <div className="grid grid-cols-3 gap-3 mx-auto w-96">
          {gameState.map((player, index) => (
            <Square key={index} onClick={handleClick} {...{ index, player }} />
          ))}
        </div>
        <div className="mx-auto w-96 text-2xl">
          <p className="text-white mt-5 ">
            Next Player : <span>{currentPlayer}</span>{" "}
          </p>
          <p className="text-white mt-5 ">
            Jugador X Gana: <span>{scores["X"]}</span>
          </p>
          <p className="text-white mt-5 ">
            Jugador O Gana: <span>{scores["O"]}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
