 function createGrille(grilleSize) {
  var grille = new Array(grilleSize ** 2);

  for (var i = 0; i < grilleSize ** 2; i++) {

    grille[i] = new Array(grilleSize ** 2)
    for (var j = 0; j < grilleSize ** 2; j++) {
      grille[i][j] = 0;
    }
  }
  return grille
}

 function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}