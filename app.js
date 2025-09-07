const container = document.querySelector('.grid-container');
container.style.setProperty('--cols', container.dataset.cols);

// Définir les valeurs de chaque mini-grille
const gridsData = [
  ['1','2','','1'],
  ['4','5','6','1'],
  ['4','5','6','1'],
  ['4','5','6','1']
];

// Générer les grilles
gridsData.forEach(gridValues => {
  const grid = document.createElement('div');
  grid.classList.add('grid');

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
