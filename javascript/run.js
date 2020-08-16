window.addEventListener("load", function () {
    var game = new Game(4);
    game.execute();
    window.addEventListener("keydown",function(event){movement.call(game,event.keyCode)})
})