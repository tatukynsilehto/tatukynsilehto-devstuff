import React, { useState } from 'react';
import './App1.css';

// Helper function to get a random position
function getRandomPosition() {
  return Math.floor(Math.random() * 4);
}

// Helper function to add a random "2" or "4" to the grid
function addRandomNumber(grid) {
  let newGrid = [...grid];
  let added = false;

  while (!added) {
    const row = getRandomPosition();
    const col = getRandomPosition();
    if (newGrid[row][col] === 0) {
      newGrid[row][col] = Math.random() > 0.5 ? 2 : 4;
      added = true;
    }
  }
  return newGrid;
}

// Initialize the grid with two random numbers
function generateInitialGrid() {
  let grid = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ];
  grid = addRandomNumber(grid);
  grid = addRandomNumber(grid);
  return grid;
}

// Helper functions to move and merge rows
function slide(row) {
  let newRow = row.filter(val => val); // Remove all zeroes
  while (newRow.length < 4) {
    newRow.push(0); // Add zeroes at the end
  }
  return newRow;
}

function combine(row) {
  for (let i = 0; i < row.length - 1; i++) {
    if (row[i] !== 0 && row[i] === row[i + 1]) {
      row[i] *= 2;
      row[i + 1] = 0;
    }
  }
  return row;
}

// Main function to handle a move in one direction
function moveGrid(grid, direction) {
  let newGrid = [...grid];
  
  if (direction === 'left') {
    for (let i = 0; i < 4; i++) {
      newGrid[i] = slide(combine(slide(newGrid[i])));
    }
  } else if (direction === 'right') {
    for (let i = 0; i < 4; i++) {
      newGrid[i] = slide(combine(slide(newGrid[i].reverse()))).reverse();
    }
  } else if (direction === 'up') {
    for (let col = 0; col < 4; col++) {
      let colArr = [newGrid[0][col], newGrid[1][col], newGrid[2][col], newGrid[3][col]];
      let newCol = slide(combine(slide(colArr)));
      for (let row = 0; row < 4; row++) {
        newGrid[row][col] = newCol[row];
      }
    }
  } else if (direction === 'down') {
    for (let col = 0; col < 4; col++) {
      let colArr = [newGrid[0][col], newGrid[1][col], newGrid[2][col], newGrid[3][col]];
      let newCol = slide(combine(slide(colArr.reverse()))).reverse();
      for (let row = 0; row < 4; row++) {
        newGrid[row][col] = newCol[row];
      }
    }
  }

  return newGrid;
}

function App1() {
  const [grid, setGrid] = useState(generateInitialGrid());

  const handleKeyPress = (e) => {
    let newGrid = [...grid];
    if (e.key === 'ArrowUp') {
      newGrid = moveGrid(grid, 'up');
    } else if (e.key === 'ArrowDown') {
      newGrid = moveGrid(grid, 'down');
    } else if (e.key === 'ArrowLeft') {
      newGrid = moveGrid(grid, 'left');
    } else if (e.key === 'ArrowRight') {
      newGrid = moveGrid(grid, 'right');
    }

    // Check if the grid actually changed before adding a new number
    if (JSON.stringify(grid) !== JSON.stringify(newGrid)) {
      newGrid = addRandomNumber(newGrid);
    }
    setGrid(newGrid);
  };

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [grid]);

  return (
    <div className="App1">
      <h1>2048</h1>
      <div className="grid-container">
        {grid.map((row, rowIndex) => (
          <div className="grid-row" key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <div className="grid-cell" key={cellIndex} data-value={cell}>
                {cell !== 0 ? cell : ''}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App1;