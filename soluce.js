const button = document.getElementById('showSolution');
const solutionGrid = document.getElementById('solutionGrid');
solutionGrid.style.setProperty('--size', size);


button.addEventListener('click', () => {
    console.log("button soluce appuer");
    solutionGrid.style.display = 'grid'; // reveal solution
    button.disabled = true; // optional: prevent multiple clicks
    button.innerText = 'Solution Shown';
    
    console.log("button appuyer");
    

});
