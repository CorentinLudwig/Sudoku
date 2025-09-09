const startBtn = document.getElementById('startGame');
const homePage = document.getElementById('homePage');
const gameGrid = document.getElementById('gameGrid');
const showBtn = document.getElementById('showSolution');
const homeButton = document.getElementById('HomeButton')


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
        gameGrid.style.display = 'grid';
        gameGrid.style.setProperty('--size', size);
        showBtn.style.display = 'block';
        homeButton.style.display = 'block'


        // Définir les valeurs de chaque mini-grille
        const solvedGrid = createGrille(size);
        solve_sudoku_blocked(solvedGrid, size);
        const puzzleGrid = createPuzzle(solvedGrid, difficulty, size);

        print_grille(puzzleGrid, gameGrid)
    });
});

homeButton.addEventListener('click', () => {  
  homeButton.style.display = 'none';
  gameGrid.style.display = 'none';
  homePage.style.display = 'block';
  showBtn.style.display = 'none';

  gameGrid.innerHTML = '';

});