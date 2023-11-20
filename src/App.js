// App.js
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // ゲームの初期状態を設定
  const createInitialBoard = () => {
    let board = Array(8).fill(null).map(() => Array(8).fill(null));
    board[3][3] = 'white';
    board[3][4] = 'black';
    board[4][3] = 'black';
    board[4][4] = 'white';
    return board;
  };

  const [board, setBoard] = useState(createInitialBoard());
  const [currentPlayer, setCurrentPlayer] = useState('black');

  // 石をひっくり返す関数
  const flipTiles = (newBoard, row, col, color) => {
    const directions = [
      [-1, -1], [-1, 0], [-1, 1], // 上方向
      [0, -1],           [0, 1],  // 左右方向
      [1, -1], [1, 0], [1, 1]    // 下方向
    ];
  
    let tilesToFlip = [];
  
    directions.forEach(([dx, dy]) => {
      let x = col + dx;
      let y = row + dy;
      let tiles = [];
  
      while (x >= 0 && x < 8 && y >= 0 && y < 8 && newBoard[y][x] === (color === 'black' ? 'white' : 'black')) {
        tiles.push([y, x]);
        x += dx;
        y += dy;
      }
  
      if (x >= 0 && x < 8 && y >= 0 && y < 8 && newBoard[y][x] === color) {
        tilesToFlip.push(...tiles);
      }
    });
  
    tilesToFlip.forEach(([y, x]) => {
      newBoard[y][x] = color;
    });
  };

  // 勝利条件の判定
  const checkForWin = (board) => {
    let blackCount = 0;
    let whiteCount = 0;
    let emptyCount = 0;
  
    board.forEach(row => {
      row.forEach(cell => {
        if (cell === 'black') blackCount++;
        if (cell === 'white') whiteCount++;
        if (cell === null) emptyCount++;
      });
    });
  
    if (emptyCount === 0 || blackCount === 0 || whiteCount === 0) {
      if (blackCount > whiteCount) {
        console.log("Black wins!");
      } else if (whiteCount > blackCount) {
        console.log("White wins!");
      } else {
        console.log("Draw!");
      }
      return true; // ゲーム終了
    }
  
    return false; // ゲーム続行
  };  

  // セルがクリックされたときのハンドラー
  const handleCellClick = (row, col) => {
    if (board[row][col] !== null) return; // 既に石がある場合は何もしない

    let newBoard = [...board];
    newBoard[row][col] = currentPlayer;
    flipTiles(newBoard, row, col, currentPlayer);
    setBoard(newBoard);

    setCurrentPlayer(currentPlayer === 'black' ? 'white' : 'black');
  };

  // 勝利条件のチェック
    useEffect(() => {
      checkForWin(board);
    }, [board]);

  return (
    <div className="App">
      <h1>オセロゲーム</h1>
      <div className="board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="board-row">
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className={`cell ${cell}`}
                onClick={() => handleCellClick(rowIndex, colIndex)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
