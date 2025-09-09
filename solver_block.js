
// Get global row and column from block index and cell index
function getGlobalCoords(blockIndex, cellIndex, size) {
    const blockRow = Math.floor(blockIndex / size);
    const blockCol = blockIndex % size;
    const innerRow = Math.floor(cellIndex / size);
    const innerCol = cellIndex % size;

    const row = blockRow * size + innerRow;
    const col = blockCol * size + innerCol;
    return { row, col };
}

// Convert row,col to blockIndex and cellIndex
function getBlockCoords(row, col, size) {
    const blockRow = Math.floor(row / size);
    const blockCol = Math.floor(col / size);
    const innerRow = row % size;
    const innerCol = col % size;

    const blockIndex = blockRow * size + blockCol;
    const cellIndex = innerRow * size + innerCol;
    return { blockIndex, cellIndex };
}


function is_valid_blocked(grille, n, row, col, size) {
    const N = size ** 2;

    // Check row
    for (let c = 0; c < N; c++) {
        const { blockIndex, cellIndex } = getBlockCoords(row, c, size);
        if (grille[blockIndex][cellIndex] === n) return false;
    }

    // Check column
    for (let r = 0; r < N; r++) {
        const { blockIndex, cellIndex } = getBlockCoords(r, col, size);
        if (grille[blockIndex][cellIndex] === n) return false;
    }

    // Check subgrid (block)
    const blockRow = Math.floor(row / size);
    const blockCol = Math.floor(col / size);
    const blockIndex = blockRow * size + blockCol;
    for (let i = 0; i < N; i++) {
        const r = Math.floor(i / size);
        const c = i % size;
        if (grille[blockIndex][r * size + c] === n) return false;
    }

    return true;
}

 function solve_sudoku_blocked(grille, size) {
    const N = size ** 2;

    for (let row = 0; row < N; row++) {
        for (let col = 0; col < N; col++) {
            const { blockIndex, cellIndex } = getBlockCoords(row, col, size);

            if (grille[blockIndex][cellIndex] === 0) {
                const numbers = shuffle([...Array(N).keys()].map(x => x + 1));

                for (let n of numbers) {
                    if (is_valid_blocked(grille, n, row, col, size)) {
                        grille[blockIndex][cellIndex] = n;
                        if (solve_sudoku_blocked(grille, size)) return true;
                        grille[blockIndex][cellIndex] = 0; // backtrack
                    }
                }

                return false; // no valid number found
            }
        }
    }

    return true; // solved
}