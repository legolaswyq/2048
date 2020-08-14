window.addEventListener("load", function () {


    (function initial_game() {
        let len = 2;
        for (let i = 0; i < len; i++) {
            addNewRandomTile();
        }
    })();


    function addNewRandomTile() {
        let cells = document.querySelectorAll(".grid_cell");
        let availableCells = [];
        cells.forEach((cell) => {
            if (cell.innerHTML === "") {
                availableCells.push(cell);
            }
        })

        let len = availableCells.length;
        console.log(len);
        if (len) {
            let index = Math.floor(Math.random() * len);
            let random = Math.random() > 0.9 ? 4 : 2;
            availableCells[index].innerHTML = random;
        }
    }

    window.addEventListener("keydown", function (event) {
        console.log(event.keyCode);
        //38 up
        //40 down
        //37 left
        //39 right

    })



});
