import React, { useState, useEffect } from "react"
import Square from "./components/Square"
import "./App.css"
import Footer from "./components/Footer"

const calculateWinner = (squares) => {
  //  array representing winning combinations
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  // check each winning combination
  for (const line of lines) {
    const [a, b, c] = line
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a] // return the marker of the winner
    }
  }

  return null // null if no winner
}
// fxn to render each square on the board
const renderSquare = (index, squares, isXNext, handleClick) => {
  return (
    <Square
      value={squares && squares[index]}
      onClick={() => handleClick(index)}
    />
  )
}

const App = () => {
  const [squares, setSquares] = useState(Array(9).fill(null))
  const [playerX, setPlayerX] = useState({ name: "Player X", marker: "🩷" })
  const [playerO, setPlayerO] = useState({ name: "Player O", marker: "🩶" })
  const [isXNext, setIsXNext] = useState(true)
  const [winner, setWinner] = useState(null)

  const handleClick = (index) => {
    // check if there is already a winner or the square is already filled
    if (calculateWinner(squares) || squares[index]) {
      return
    }
    // update the squares array with the current players marker
    const newSquares = [...squares]
    newSquares[index] = isXNext ? playerX.marker : playerO.marker
    setSquares(newSquares)

    // toggle current player
    setIsXNext(!isXNext)
  }

  const restartGame = () => {
    // reset game state
    setSquares(Array(9).fill(null))
    setIsXNext(true)
    setWinner(null)
  }

  //  useeffect to check for a winner or a draw after each move
  useEffect(() => {
    const currentWinner = calculateWinner(squares)

    if (currentWinner) {
      setWinner(currentWinner)
    } else if (squares.every((square) => square !== null)) {
      setWinner("draw")
    }
  }, [squares])

  // to display an alert when there is a winner or a draw
  useEffect(() => {
    if (winner) {
      if (winner === "draw") {
        alert("Game Over - It's a draw!")
      } else {
        alert(`Winner: ${winner}`)
      }
    }
  }, [winner])

  //  handle marker selection change for players
  const handleSelectChange = (player, selectedEmoji) => {
    if (player === "Player X") {
      setPlayerX({ ...playerX, marker: selectedEmoji })
    } else {
      setPlayerO({ ...playerO, marker: selectedEmoji })
    }
  }

  return (
    <div>
      <h1>Tic Tac Toe</h1>
      <div className="player-dropdown">
        <div>
          <label>
            {playerX.name}
            <select
              value={playerX.marker}
              onChange={(e) => handleSelectChange(playerX.name, e.target.value)}
            >
              <option value="🩷">🩷</option>
              <option value="🐷">🐷</option>
              <option value="🌷">🌷</option>
              <option value="👑">👑</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            {playerO.name}
            <select
              value={playerO.marker}
              onChange={(e) => handleSelectChange(playerO.name, e.target.value)}
            >
              <option value="🩶">🩶</option>
              <option value="🐰">🐰</option>
              <option value="🌪️">🌪️</option>
              <option value="💍">💍</option>
            </select>
          </label>
        </div>
      </div>
      <div className="board">
        <div className="board-row">
          {renderSquare(0, squares, isXNext, handleClick)}
          {renderSquare(1, squares, isXNext, handleClick)}
          {renderSquare(2, squares, isXNext, handleClick)}
        </div>
        <div className="board-row">
          {renderSquare(3, squares, isXNext, handleClick)}
          {renderSquare(4, squares, isXNext, handleClick)}
          {renderSquare(5, squares, isXNext, handleClick)}
        </div>
        <div className="board-row">
          {renderSquare(6, squares, isXNext, handleClick)}
          {renderSquare(7, squares, isXNext, handleClick)}
          {renderSquare(8, squares, isXNext, handleClick)}
        </div>
      </div>
      <div className="status">
        {winner
          ? winner === "draw"
            ? "Game Over - It's a draw!"
            : `Winner: ${winner}`
          : `Current player: ${isXNext ? playerX.name : playerO.name}`}
      </div>
      <div className="button-container">
        <button onClick={restartGame}>Restart Game</button>
      </div>
      <Footer />
    </div>
  )
}

export default App
