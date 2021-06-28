import './scss/main.scss';
import { x, o } from './tokens.js';
import { winCheck } from './wincheck.js';

const board = document.getElementById('board');

const horizontalOverlay = document.getElementById("win-overlay-horizontal");
const verticalOverlay = document.getElementById("win-overlay-vertical");
const resetOverlay = document.getElementById("reset");

let cellNumbers = [];

let cells = [];

const playerInputs = document.querySelectorAll('input[type=radio]');


const gameState = {
  currentPlayer: 1,
  lastPlayed: null,
  cellState: [],
  winner: null,
  winningCells: []
};

/**
 * Populates the game cells in the board to the given number of maxCells
 * @param {Number} maxCells 
 * @returns void
 */
function populateCells(maxCells) {
  if(maxCells <= 0) {
    // if we have no more cells to populate, we can
    // attach event listeners to the gameCells
    cells = Array.from(document.querySelectorAll('.cell'));
    
    setCellListeners();
    setCellLabels();
    return;
  }
  cellNumbers.push(`cell-${maxCells.toString()}`);
  gameState.cellState.push(null);
  board.innerHTML += `<button class="cell" id="cell-${cellNumbers.length}"></button>`;
  populateCells(maxCells - 1);
}

/**
 * Attaches click listeners to all game cells
 */
function setCellListeners() {
  cells.forEach((cell) => {
    cell.addEventListener('click',(event) => {
      if(gameState.currentPlayer === 1) {
        setToken(event.target, gameState.currentPlayer);
      }
    });
  });
}

function setCellLabels() {
  const buttons = Array.from(document.querySelectorAll('button'));

    buttons.forEach((cell) => {
      let labelText = setCellLabelByIndex(cells.indexOf(cell));
      labelText += ' Empty.'
      cell.setAttribute('aria-label', labelText);
    });
}


function setCellLabelByIndex(index) {
  let labelText = '';

  if(index <= 2) {
    labelText = `Row ${setRowLabel(index)}, cell ${(index + 1).toString()}.`;
  } else if(index <= 5 && index > 2) {
    labelText = `Row ${setRowLabel(index)}, cell ${(index - 2).toString()}.`;
  } else {
    labelText = `Row ${setRowLabel(index)}, cell ${(index - 5).toString()}.`;
  }

  return labelText;
}

function setRowLabel(index) {
  let rowName = '';
  if(index <= 2) {
    rowName = "one";
  } else if(index <=5 && index > 2) {
    rowName = 'two';
  } else {
    rowName = 'three';
  }
  return rowName;
}

/**
 * Updates the innerHTML of the given cell (a button element)
 * also updates gamestate.lastPlayed & gameState.cellState
 * returns void if cell is already taken or if gameState.winner !== null
 * @param {ButtonElement} cell 
 * @param {Number} player 
 * @returns void
 */
function setToken(cell, player) {
  const cellIndex = cells.indexOf(cell);

  // make sure there's not a winner
  if(gameState.winner !== null) {
    return;
  }
  
  // make sure the cell is not taken
  if(gameState.cellState[cellIndex] !== null) {
    return;
  }

  // update lastPlayed with current player
  gameState.lastPlayed = player;

  // set cellState index to current player
  gameState.cellState[cellIndex] = player;

  
  // update innerHTML
  cell.innerHTML = player === 1 ? x : o;
  const token = document.createElement('div');

  let currentLabelText = cell.getAttribute('aria-label');

  currentLabelText = currentLabelText.replace(' Empty.', ` ${player === 1 ? 'X' : 'O'}.`);

  cell.setAttribute('aria-label', currentLabelText);
  updateWinnerState(winCheck(gameState.cellState));
}

function updateWinnerState(winStateObject) {
  if(winStateObject.winningPlayer !== 0) {
    gameState.winner = winStateObject.winningPlayer;
    gameState.winningCells = winStateObject.winningCellIndexes;
    drawWinLine(gameState.winningCells);
  } else {
    if(gameState.currentPlayer === 1) {
      gameState.currentPlayer = 2;
      setTimeout(() => {
        nextMove();
      }, 1000);
    } else if(gameState.currentPlayer === 2) {
      gameState.currentPlayer = 1;
    }
  }
}

function nextMove() {
  if(gameState.cellState.includes(null)) {
    const moveIndex = Math.floor(Math.random() * (cells.length - 1));
    if(gameState.cellState[moveIndex] === null) {
      setToken(cells[moveIndex], 2)
    } else {
      nextMove();
    }
  }
}

function displayReset() {
  let button = document.createElement('button');
  let resetTitle = document.createElement('h2');

  button.innerText = 'Play Again';
  button.setAttribute('aria-label', 'Play Again');
  button.classList.add('reset-button');

  resetTitle.classList.add('reset-title');
  
  button.addEventListener('click', (event) => {
    resetGame();
  });
  
  if(gameState.winner === 1) {
    resetTitle.innerText = 'YOU WIN!';
    resetTitle.classList.add('win-title')
  } else if(gameState.winner === 2) {
    resetTitle.innerText = 'YOU LOSE';
    resetTitle.classList.add('lose-title')
  } else if(gameState.winner === 3) {
    resetTitle.innerText = 'DRAW';
    resetTitle.classList.add('draw-title')
  }

  
  resetTitle.setAttribute('role', 'alert');
  resetOverlay.style.pointerEvents = 'auto';
  setTimeout(() => {
    resetOverlay.appendChild(resetTitle);
    resetOverlay.appendChild(button);
  }, 1000);
}

function drawWinLine(indexArray) {
  let line = '';
  
  if(indexArray[0] === 0 && indexArray[indexArray.length - 1] === 8) {
    line = `
      <div class="win-line d-line"></div>
    `;
    horizontalOverlay.innerHTML += line;
  } else if(indexArray[0] === 2 && indexArray[indexArray.length - 1] === 6) {
    line = `<div class="win-line e-line"></div>`;
    horizontalOverlay.innerHTML += line;
  } else if(indexArray[2] - indexArray[1] < 2) {
    if(indexArray[0] === 0) {
      line = `<div class="win-line a-line"></div>`;
    } else if(indexArray[0] === 3) {
      line = `<div class="win-line b-line"></div>`;
    } else if(indexArray[0] === 6) {
      line = `<div class="win-line c-line"></div>`;
    }
    horizontalOverlay.innerHTML += line;
  } else {
    if(indexArray[0] === 0) {
      line = `<div class="win-line a-line"></div>`;
    } else if(indexArray[0] === 1) {
      line = `<div class="win-line b-line"></div>`;
    } else if(indexArray[0] === 2) {
      line = `<div class="win-line c-line"></div>`;
    }
    verticalOverlay.innerHTML += line;
  }
  displayReset();
}

function resetGame() {
  const elements = [horizontalOverlay, verticalOverlay, resetOverlay, board];

  cells.forEach((cell) => {
    cell.innerHTML = '';
  });

  elements.forEach((element) => {
    element.innerHTML = '';
  });

  resetOverlay.style.pointerEvents = 'none';

  gameState.lastPlayed = null;
  gameState.cellState = [];
  gameState.winner = null;
  gameState.winningCells = [];
  gameState.currentPlayer = 1;
  populateCells(9);
}

// populate game cells when window loads
window.onload = () => {
  populateCells(9);
}