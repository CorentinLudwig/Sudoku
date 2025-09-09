

const size = 3;

const Difficulty = Object.freeze({
  EASY: { name: "Easy", remove: 35 },    // Keep 46 numbers
  MEDIUM: { name: "Medium", remove: 45 },// Keep 36 numbers
  HARD: { name: "Hard", remove: 55 }     // Keep 26 numbers
});

function createPuzzle(grid, difficulty) {
  const puzzle = grid.map(row => [...row]); // clone the grid
  const sizeSquared = size ** 2;
  var cellToRemove = difficulty.remove;

  while (cellToRemove > 0) {
    const row = Math.floor(Math.random() * sizeSquared);
    const col = Math.floor(Math.random() * sizeSquared);
    if (puzzle[row][col] !== 0) {
      puzzle[row][col] = 0;
      cellToRemove--;
    }
  }
  return puzzle;
}



const container = document.querySelector('.grid-container');
container.style.setProperty('--size', size);

// Définir les valeurs de chaque mini-grille
const solvedGrid = createGrille(size);
solve_sudoku_blocked(solvedGrid);
const puzzleGrid = createPuzzle(solvedGrid, Difficulty.EASY);


// Générer les grilles
puzzleGrid.forEach((block, blockIndex) => {
  const blockRow = Math.floor(blockIndex / size);
  const blockCol = blockIndex % size;

  const blockDiv = document.createElement('div');
  blockDiv.classList.add('grid');           // mini-grid container
  blockDiv.style.setProperty('--size', size);

  block.forEach((value, cellIndex) => {
    const innerRow = Math.floor(cellIndex / size);
    const innerCol = cellIndex % size;

    const row = blockRow * size + innerRow; // global row
    const col = blockCol * size + innerCol; // global col

    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.row = row;   // store global coords
    cell.dataset.col = col;

    if (value === 0 || value === '') {
      cell.classList.add('empty');
      cell.textContent = '';
    } else {
      cell.textContent = value;
    }

    blockDiv.appendChild(cell);
  });

  container.appendChild(blockDiv);
});

// Ajouter l'interaction sur les cellules vides
container.addEventListener('click', e => {
  const cell = e.target;
  if (!cell.classList.contains('empty') || cell.querySelector('input')) return;

  const input = document.createElement('input');
  input.type = 'text';
  input.maxLength = 1;
  input.autofocus = true;

  cell.textContent = '';
  cell.appendChild(input);

  input.addEventListener('blur', () => {
    if (input.value.trim() !== '') {
      cell.textContent = input.value.trim();
      cell.style.borderStyle = 'solid';
      

      const row = parseInt(cell.dataset.row, 10);
      const col = parseInt(cell.dataset.col, 10)

      puzzleGrid[row][col] = input.value.trim();

      if( solvedGrid[row][col] == input.value.trim()){
        cell.style.color = 'blue';
      } else {
        cell.style.color = 'red';
      }

    } else {
      cell.textContent = '';
      cell.classList.add('empty');
    }
  });

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') input.blur();
    if (e.key === 'Escape') {
      cell.textContent = '';
      cell.classList.add('empty');
    }
  });
});
