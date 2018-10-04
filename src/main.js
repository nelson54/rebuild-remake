const Point = require('./point'),
    Game = require('./game'),
    SystemLoader = require('./systems/system-loader');

window.addEventListener('DOMContentLoaded', () => {
    let game = Game.buildGame(800, 600, new Point(10, 10));

    SystemLoader
        .create()
        .loadSystems()
        .forEach((system) => game.addSystem(system));

    game.start();
});