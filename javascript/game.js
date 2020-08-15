window.addEventListener("load", function () {

    (function init() {
        var newGame = new GameMaster();
        let emptyCells = newGame.grid.availableCells();
        addRandomTile(emptyCells, newGame.grid);
        emptyCells = newGame.grid.availableCells();
        addRandomTile(emptyCells, newGame.grid);
        updateGrid(newGame.grid.cells);

        window.addEventListener("keydown", function (event) {
            console.log(event.keyCode);
            //38 up
            //40 down
            //37 left
            //39 right
            switch (event.keyCode) {
                case 38:
                    moveUp(newGame.grid);
                    break;
                case 40:
                    moveDown(newGame.grid);
                    break;
                case 37:
                    moveLeft(newGame.grid);
                    break;
                case 39:
                    moveRight(newGame.grid);
                    break;
                default:
                    break;
            }
        })
    })();

    function GameMaster() {
        this.grid = new Grid(4);
    };



    function updateGrid(cells) {
        let gridCells = document.querySelectorAll(".grid_cell");
        gridCells.forEach((cell) => {
            cell.innerHTML = null;
        })
        let index = 0;
        for (let i = 0; i < 4; i++) {
            let row = cells[i];
            for (let j = 0; j < 4; j++) {
                if (row[j] !== null) {
                    gridCells[index].innerHTML = row[j].value;
                }
                index++;
            }
        }
    }

    function addRandomTile(emptyCells, grid) {
        let len = emptyCells.length;
        let randomIndex = emptyCells[Math.floor(Math.random() * len)];
        console.log(randomIndex);
        let position = {
            x: Math.floor(randomIndex / grid.size),
            y: Math.floor(randomIndex % grid.size)
        };
        let value = Math.random > 0.9 ? 4 : 2;
        let tile = new Tile(position, value);
        grid.cells[position.x][position.y] = tile;
        return grid.cells;
    }




    function moveUp(grid) {
        let cells = grid.cells;
        for (let i = 1; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (cells[i][j] == null) continue;
                let k = i - 1;
                while (k > 0) {
                    if (cells[k][j] !== null) break;
                    k--;
                }
                let value = cells[i][j].value;
                cells[i][j] = null;
                if (cells[k][j] == null) {
                    let position = {
                        x: k,
                        y: j
                    }
                    cells[k][j] = new Tile(position, value);
                } else if (value === cells[k][j].value) {
                    cells[k][j] = null;
                    let position = {
                        x: k,
                        y: j
                    }
                    cells[k][j] = new Tile(position,value*2)
                } else {
                    let position = {
                        x: k + 1,
                        y: j
                    }
                    cells[k + 1][j].innerHTML = new Tile(position, value);
                }
            }
        }
        grid.cells = cells;
        let availableCells = grid.availableCells();
        addRandomTile(availableCells, grid);
        updateGrid(grid.cells);
    }

    function moveDown(grid) {
        let cells = grid.cells;
        for (let i = 2; i >= 0 ; i--) {
            for (let j = 0; j < 4; j++) {
                if (cells[i][j] == null) continue;
                let k = i + 1;
                while (k < 3) {
                    if (cells[k][j] !== null) break;
                    k++;
                }
                let value = cells[i][j].value;
                cells[i][j] = null;
                if (cells[k][j] == null) {
                    let position = {
                        x: k,
                        y: j
                    }
                    cells[k][j] = new Tile(position, value);
                } else if (value === cells[k][j].value) {
                    cells[k][j] = null;
                    let position = {
                        x: k,
                        y: j
                    }
                    cells[k][j] = new Tile(position,value*2)
                } else {
                    let position = {
                        x: k + 1,
                        y: j
                    }
                    cells[k + 1][j].innerHTML = new Tile(position, value);
                }
            }
        }
        grid.cells = cells;
        let availableCells = grid.availableCells();
        addRandomTile(availableCells, grid);
        updateGrid(grid.cells);
    }

    function moveLeft(grid) {
        let cells = grid.cells;
        for (let i = 1; i < 4 ; i++) {
            for (let j = 0; j < 4; j++) {
                if (cells[j][i] == null) continue;
                let k = i - 1;
                while (k > 0) {
                    if (cells[j][k] !== null) break;
                    k--;
                }
                let value = cells[j][i].value;
                cells[j][i] = null;
                if (cells[j][k] == null) {
                    let position = {
                        x: j,
                        y: k
                    }
                    cells[j][k] = new Tile(position, value);
                } else if (value === cells[j][k].value) {
                    cells[j][k] = null;
                    let position = {
                        x: j,
                        y: k
                    }
                    cells[j][k] = new Tile(position,value*2)
                } else {
                    let position = {
                        x: j ,
                        y: k + 1
                    }
                    cells[j][k+1].innerHTML = new Tile(position, value);
                }
            }
        }

        grid.cells = cells;
        let availableCells = grid.availableCells();
        addRandomTile(availableCells, grid);
        updateGrid(grid.cells);
    }

    function moveRight(grid) {
        let cells = grid.cells;
        for (let i = 2; i >=0 ; i--) {
            for (let j = 0; j < 4; j++) {
                if (cells[j][i] == null) continue;
                let k = i + 1;
                while (k < 3) {
                    if (cells[j][k] !== null) break;
                    k++;
                }
                let value = cells[j][i].value;
                cells[j][i] = null;
                if (cells[j][k] == null) {
                    let position = {
                        x: j,
                        y: k
                    }
                    cells[j][k] = new Tile(position, value);
                } else if (value === cells[j][k].value) {
                    cells[j][k] = null;
                    let position = {
                        x: j,
                        y: k
                    }
                    cells[j][k] = new Tile(position,value*2)
                } else {
                    let position = {
                        x: j ,
                        y: k + 1
                    }
                    cells[j][k+1].innerHTML = new Tile(position, value);
                }
            }
        }

        grid.cells = cells;
        let availableCells = grid.availableCells();
        addRandomTile(availableCells, grid);
        updateGrid(grid.cells);
    }
});
