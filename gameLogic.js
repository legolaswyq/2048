function Game(size) {
    this.size = size;
    this.cells = this.emptyCells();
}


Game.prototype.execute = function () {
    this.addRandomTile();
    this.addRandomTile();
    this.updateScreen();
    window.addEventListener("keydown",)
}

Game.prototype.updateScreen = function () {
    let grid = document.querySelectorAll(".grid_cell");
    for(let i = 0; i < grid.length; i++){
        grid[i].innerHTML = this.cells[i];
    }
}

Game.prototype.emptyCells = function () {
    var cells = [];
    let len = this.size * this.size;
    for(let i = 0; i < len ; i++){
        cells.push(null);
    }
    return cells;
}

Game.prototype.availableCells = function () {
    let availableCells = [];
    for(let i = 0; i < this.cells.length; i++){
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

