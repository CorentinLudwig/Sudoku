const button = document.getElementById('showSolution');
const solutionGrid = document.getElementById('solutionGrid');
const solutionPage = document.getElementById('solutionPage');
solutionGrid.style.setProperty('--size', size);


button.addEventListener('click', () => {
    console.log("button soluce appuer");
    solutionPage.style.display = 'block';

    button.disabled = true; // optional: prevent multiple clicks
    button.innerText = 'Solution Shown';
    
    console.log("button appuyer");
    

});
