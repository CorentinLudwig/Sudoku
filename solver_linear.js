
function is_valid(grille, n, row, col) {
  for (var x = 0; x < size ** 2; x++) {
    if (grille[row][x] == n || grille[x][col] == n) {
      return false;
    }
  }
  var start_row = size * Math.trunc(row / size);
  var start_col = size * Math.trunc(col / size);

  for (var i = 0; i < size; i++) {
    for (var j = 0; j < size; j++) {
      if (grille[i + start_row][j + start_col] == n) {
        return false;
      }
    }
  }
  return true;

}

 function solve_sudoku(grille) {
  for (var i = 0; i < size ** 2; i++) {
    for (var j = 0; j < size ** 2; j++) {
      if (grille[i][j] == 0) {
        let numbers = shuffle([...Array(size ** 2).keys()].map(x => x + 1));
        for (let n of numbers) {
          if (is_valid(grille, n, i, j)) {
            grille[i][j] = n;
            console.log("test is valid");
            if (solve_sudoku(grille)) {
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