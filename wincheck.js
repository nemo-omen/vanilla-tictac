const winConditions = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [2,4,7],
  [3,4,9],
  [1,5,9],
  [2,5,7]
];

/**
 * Checks a given array of integers for winning combinations
 * @param {Array: number} cellArray 
 */
export function winCheck(cellArray) {
  let winningPlayer = 0;
  let winningCellIndexes = [];
  
  if(cellArray[0] === cellArray[1] && cellArray[1] === cellArray[2] && cellArray[0] !== null) {
    winningPlayer = cellArray[0];
    winningCellIndexes = [0,1,2];
  }
  
  if(cellArray[3] === cellArray[4] && cellArray[4] === cellArray[5] && cellArray[3] !== null) {
    winningPlayer = cellArray[3];
    winningCellIndexes = [3,4,5];
  }
  
  if(cellArray[6] === cellArray[7] && cellArray[7] === cellArray[8] && cellArray[6] !== null) {
    winningPlayer = cellArray[6];
    winningCellIndexes = [6,7,8];
  }
  
  if(cellArray[0] === cellArray[3] && cellArray[3] === cellArray[6] && cellArray[0] !== null) {
    winningPlayer = cellArray[0];
    winningCellIndexes = [0,3,6];
  }
  
  if(cellArray[1] === cellArray[4] && cellArray[4] === cellArray[7] && cellArray[1] !== null) {
    winningPlayer = cellArray[1];
    winningCellIndexes = [1,4,7];
  }
  
  if(cellArray[2] === cellArray[5] && cellArray[5] === cellArray[8] && cellArray[2] !== null) {
    winningPlayer = cellArray[2];
    winningCellIndexes = [2,5,8];
  }

  if(cellArray[0] === cellArray[4] && cellArray[4] === cellArray[8] && cellArray[0] !== null) {
    winningPlayer = cellArray[0];
    winningCellIndexes = [0,4,8];
  }

  if(cellArray[2] === cellArray[4] && cellArray[4] === cellArray[6] && cellArray[2] !== null) {
    winningPlayer = cellArray[2];
    winningCellIndexes = [2,4,6];
  }

  if(winningCellIndexes.length === 0 && !cellArray.includes(null)) {
    winningPlayer = 3;
  }

  return {
    winningPlayer,
    winningCellIndexes
  };
}