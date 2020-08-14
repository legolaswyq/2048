window.addEventListener("load", function () {

    (function init() {
        var newGame = new GameMaster();
        let emptyCells = newGame.grid.availableCells();
        addRandomTile(emptyCells, newGame.grid);
        emptyCells = newGame.grid.availableCells();
        addRandomTile(emptyCells, newGame.grid);
        updateGrid(newGame.grid);
    })();

    function GameMaster() {
        this.grid = new Grid(4);
    };

    

    function updateGrid(grid) {
        let gridCells = document.querySelectorAll(".grid_cell");
        let len = grid.size;
        let index = 0;
        for(let i = 0; i < len; i++){
            let row = grid.cells[i];
            for (let j = 0; j < len; j++){
                if (row[j] !== null) {
                    gridCells[index].innerHTML = row[j].value;
                }
                index++;
            }
        }
    }

    function addRandomTile(emptyCells,grid) {
        let len = emptyCells.length;
        let randomIndex = emptyCells[Math.floor(Math.random() * len)];
        console.log(randomIndex);
        let position = {
            x : Math.floor(randomIndex / grid.size),
            y : Math.floor(randomIndex % grid.size)
        };
        let value = Math.random > 0.9 ? 4 : 2;
        let tile = new Tile(position, value);
        grid.cells[position.x][position.y] = tile;
        return grid.cells;
    }

    // function addNewRandomTile() {
    //     let cells = document.querySelectorAll(".grid_cell");
    //     let availableCells = [];
    //     cells.forEach((cell) => {
    //         if (cell.innerHTML === "") {
    //             availableCells.push(cell);
    //         }
    //     })

    //     let len = availableCells.length;
    //     console.log(len);
    //     if (len) {
    //         let index = Math.floor(Math.random() * len);
    //         let random = Math.random() > 0.9 ? 4 : 2;
    //         availableCells[index].innerHTML = random;
    //     }
    // }

    // window.addEventListener("keydown", function (event) {
    //     console.log(event.keyCode);
    //     //38 up
    //     //40 down
    //     //37 left
    //     //39 right

    // })



});
