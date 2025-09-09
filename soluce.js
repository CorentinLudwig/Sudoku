const button = document.getElementById('showSolution');
const solutionGrid = document.getElementById('solutionGrid');
solutionGrid.style.setProperty('--size', size);


button.addEventListener('click', () => {
    solutionGrid.style.display = 'grid'; // reveal solution
    button.disabled = true; // optional: prevent multiple clicks
    button.innerText = 'Solution Shown';
    print_grille(solvedGrid, solutionGrid)
    console.log("button appuyer");
    

});