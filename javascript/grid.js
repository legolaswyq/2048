function Grid(size, previewState) {
    //here size is 4
    this.size = size;
    this.cells = previewState ? previewState : this.empty();
    return this;
}

Grid.prototype.empty = function () {
    var cells = [];

    let len = this.size;
    for(let i = 0; i < len; i++){
        let row = cells[i] = [];
        
        for(let i = 0; i < len; i++){
            row.push(null);
        }
    }
    return cells;
}


Grid.prototype.availableCells = function () {
    let emptyCells = [];
    let index = 0;
    for(let i = 0; i < 4; i++){
        for (let j = 0; j < 4; j++){
            if (this.cells[i][j] == null) {
                emptyCells.push(index);
            }
            index++;
        }
    }
    return emptyCells;
}

