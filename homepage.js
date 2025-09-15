
const homePage = document.getElementById('homePage');
const gameGrid = document.getElementById('gameGrid');
const showBtn = document.getElementById('showSolution');
const homeButton = document.getElementById('HomeButton');
const gamePage = document.getElementById('gamePage');
let solvedGrid;
let puzzleGrid;


document.querySelectorAll('.playBtn').forEach(btn => {
    btn.addEventListener('click', () => {
        const level = btn.dataset.level;
        let difficulty;

        switch(level) {
            case 'easy': difficulty = Difficulty.EASY; break;
            case 'medium': difficulty = Difficulty.MEDIUM; break;
            case 'hard': difficulty = Difficulty.HARD; break;
        }

        console.log(difficulty.name);
        

        homePage.style.display = 'none';
        gamePage.style.display = 'block';
        gameGrid.style.setProperty('--size', size);


        // Définir les valeurs de chaque mini-grille
        solvedGrid = createGrille(size); 
        solve_sudoku_blocked(solvedGrid, size);
        puzzleGrid = createPuzzle(solvedGrid, difficulty, size);

        print_grille(puzzleGrid, gameGrid);
        print_grille(solvedGrid, solutionGrid);
    });
});

homeButton.addEventListener('click', () => {  
  homePage.style.display = 'block';
  solutionPage.style.display = 'none';
  gamePage.style.display = 'none';
  button.disabled = false;

  gameGrid.innerHTML = '';
  solutionGrid.innerHTML = '';

});
