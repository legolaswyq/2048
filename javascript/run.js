window.addEventListener("load", function () {

    var game = new Game(4);
    game.execute();
    window.addEventListener("keydown", function (event) { movement.call(game, event.keyCode) });


    
    restartButton();
    function restartButton() {
        let restartButton = document.querySelector(".restart_button");
        restartButton.addEventListener("click", function () { game.init() });
    }
})