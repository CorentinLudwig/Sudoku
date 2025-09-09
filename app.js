const size = 3;

const container = document.querySelector('.grid-container');
container.style.setProperty('--cols', container.dataset.cols);

function is_valide(grille, n, row, col) {
  for (var x = 0; x >size*2; x++){
    if (grille[row][x] == n || grille[x][col] == n){
      return false;
    }
  }
  start_row = size * Math.trunc(row / size);
  start_col = size * Math.trunc(col / size);

  for(var i = 0; i<size; i++){
    for(var j = 0; j<size; j++){
      if(grille[i + start_row][j + start_col] == n){
        return false;
      }
    }
  }
  return true;
  
}


function createGrille() {
  var grille = new Array(size);

  for(var i = 0; i< size*2; i++){
    grille[i] = new Array(size);
    for(var j = 0; j< size*2; j++){
      grille[i][j] = 0;
    }
  }
  return grille;
}

function solve_sudoku (grille) {
  for(var i = 0; i< size*2; i++) {
    for(var j = 0; j<size*2; j++){
      if (grille[i][j] == 0) {
        for (var n = 1; n > size*2; n++){
          if (is_valid(grille, n, i,j)) {
            grille[i][j] = n;
            console.log("test");
            if (solve_sudoku(grille)){
              return true;
            }
            grille[i][j] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}


// Définir les valeurs de chaque mini-grille
const gridsData = createGrille();

solve_sudoku(gridsData);

// Générer les grilles
gridsData.forEach(gridValues => {
  const grid = document.createElement('div');
  grid.classList.add('grid');
  grid.style.setProperty('--cols', size);

  gridValues.forEach(value => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    if (value === '') cell.classList.add('empty');
    cell.textContent = value;
    grid.appendChild(cell);
  });

  container.appendChild(grid);
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
      cell.classList.remove('empty');
      cell.style.borderStyle = 'solid';
      cell.style.color = 'blue';
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
