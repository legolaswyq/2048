function Game(size) {
    this.size = size;
    this.cells = this.emptyCells();
}


Game.prototype.execute = function () {
    this.addRandomTile();
    this.addRandomTile();
    this.updateScreen();
    setBackground(this.cells);
}

Game.prototype.init = function () {
    this.cells = this.emptyCells();
    this.addRandomTile();
    this.addRandomTile();
    this.updateScreen();
}

Game.prototype.updateScreen = function () {
    let grid = document.querySelectorAll(".grid_cell");
    for (let i = 0; i < grid.length; i++) {
        grid[i].innerHTML = this.cells[i];
    }
}

Game.prototype.emptyCells = function () {
    var cells = [];
    let len = this.size * this.size;
    for (let i = 0; i < len; i++) {
        cells.push(null);
    }
    return cells;
}

Game.prototype.availableCells = function () {
    let availableCells = [];
    for (let i = 0; i < this.cells.length; i++) {
        if (this.cells[i] === null) {
            availableCells.push(i);
        }
    }
    return availableCells;
}

Game.prototype.addRandomTile = function () {
    let availableCells = this.availableCells();
    let len = availableCells.length;
    if (len < 1) return;
    let index = Math.floor(Math.random() * len);
    let random = availableCells[index];
    let value = Math.random() > 0.9 ? 4 : 2;
    this.cells[random] = value;
}

function movement(keyCode) {
    let previewCells = getPreviewCells(this.cells);

    switch (keyCode) {
        case 38:
            this.cells = moveUp(this.cells);
            break;
        case 40:
            this.cells = moveDown(this.cells);
            break;
        case 37:
            this.cells = moveLeft(this.cells);
            break;
        case 39:
            this.cells = moveRight(this.cells);
            break;
        default:
            break;
    }
    if (gameOver(this.cells)) {
        alert("gameOver");
    }
    if (stateChange(previewCells, this.cells)) {
        this.addRandomTile();
    }

    this.updateScreen();
    setBackground(this.cells);
}

function setBackground(cells) {
    let grid_cells = document.querySelectorAll(".grid_cell");
    for(let i = 0; i < grid_cells.length; i++){
        grid_cells[i].className = "grid_cell";
    }
    console.log(grid_cells);
    for (let i = 0; i < cells.length; i++) {
        switch (cells[i]) {
            case 2:
                grid_cells[i].classList.add("one");
                break;
            case 4:
                grid_cells[i].classList.add("two");
                break;
            case 8:
                grid_cells[i].classList.add("three");
                break;
            case 16:
                grid_cells[i].classList.add("four");
                break;
            case 32:
                grid_cells[i].classList.add("five");
                break;
            case 64:
                grid_cells[i].classList.add("six");
                break;
            case 128:
                grid_cells[i].classList.add("seven");
                break;
            case 256:
                grid_cells[i].classList.add("eight");
                break;
            case 512:
                grid_cells[i].classList.add("night");
                break;
            case 1024:
                grid_cells[i].classList.add("ten");
                break;
            case 2048:
            case 4096:
                grid_cells[i].classList.add("eleven");
                break;

            default:
                break;
        }
    }
}

function gameOver(cells) {
    let matrix = [];
    let index = 0;
    let isGameOver = true;

    //if there is empty cells game continue
    for (let i = 0; i < cells.length; i++) {
        if (cells[i] === null) {
            isGameOver = false;
            return isGameOver;
        }
    }


    //convent into 2-d matrix
    for (let i = 0; i < 4; i++) {
        let row = matrix[i] = [];
        for (let j = 0; j < 4; j++) {
            row.push(cells[index++]);
        }
    }

    //check horizontal and vertical if there are two tile is same value
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (j < 3 && matrix[i][j] === matrix[i][j + 1]) {
                isGameOver = false;
                return isGameOver;
            }
            if (i < 3 && matrix[i][j] === matrix[i + 1][j]) {
                isGameOver = false;
                return isGameOver;
            }
        }
    }

    return isGameOver;
}

function getPreviewCells(cells) {
    let previewCells = [];
    for (let i = 0; i < cells.length; i++) {
        previewCells.push(cells[i]);
    }
    return previewCells;
}

function stateChange(preview, newCells) {
    let flag = false;
    for (let i = 0; i < preview.length; i++) {
        if (preview[i] !== newCells[i]) {
            flag = true;
            break;
        }
    }
    return flag;
}


function moveUp(cells) {
    let merge = [], matrix = [];
    let index = 0;
    for (let i = 0; i < 4; i++) {
        let row = merge[i] = [];
        let row1 = matrix[i] = [];
        for (let j = 0; j < 4; j++) {
            row.push(true);
            row1.push(cells[index++]);
        }
    }
    for (let i = 1; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (matrix[i][j] == null) continue;
            let k = i - 1;
            while (k > 0) {
                if (matrix[k][j] !== null) break;
                k--;
            }

            if (matrix[k][j] === null) {
                matrix[k][j] = matrix[i][j];
                matrix[i][j] = null;
            }

            if (merge[k][j] && matrix[k][j] == matrix[i][j]) {
                matrix[k][j] *= 2;
                merge[k][j] = false;
                matrix[i][j] = null;
            }

            if ((!merge[k][j] || matrix[k][j] !== matrix[i][j]) && matrix[k + 1][j] === null) {
                matrix[k + 1][j] = matrix[i][j];
                matrix[i][j] = null;
            }
        }
    }
    let newCells = [];
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            newCells.push(matrix[i][j]);
        }
    }

    return newCells;
}

function moveDown(cells) {
    let down = [], afterMove = [], newCells = [];
    down = upsideDown(cells);
    afterMove = moveUp(down);
    newCells = upsideDown(afterMove);
    return newCells;
}

function moveLeft(cells) {
    let left = turnRight(cells);
    let afterMove = moveUp(left);
    let newCells = turnLeft(afterMove);
    return newCells;
}

function moveRight(cells) {
    let right = turnLeft(cells);
    let afterMove = moveUp(right);
    let newCells = turnRight(afterMove);
    return newCells;
}

function upsideDown(cells) {
    let newCells = [];
    for (let i = 12; i >= 0; i -= 4) {
        for (let j = 0; j < 4; j++) {
            newCells.push(cells[i + j]);
        }
    }
    return newCells;
}

function turnLeft(cells) {
    let newCells = [];
    for (let i = 3; i >= 0; i--) {
        for (let j = 0; j <= 12; j += 4) {
            newCells.push(cells[i + j]);
        }
    }
    return newCells;
}

function turnRight(cells) {
    let newCells = [];
    for (let i = 12; i < 16; i++) {
        for (let j = 0; j <= 12; j += 4) {
            newCells.push(cells[i - j]);
        }
    }
    return newCells;
}