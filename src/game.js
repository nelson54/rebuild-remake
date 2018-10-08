const Renderer = require('./view/renderer');
const mapFactory = require('./map/map-factory').preConfiguredInstance();
const Map = require('./map/map');
const generateSurvivor = require('./survivors/survivor-generator');
const SeededRandom = require('./seeded-random');

const STARTING_CONTENT = 80;
const STARTING_FOOD_AMOUNT = 50;

class Game {

    /**
     * @param {number} width
     * @param {number} height
     * @param {Point} tiles
     * @param seed
     */
    static buildGame(width, height, tiles, seed = Math.random()) {
        let seededRandom = new SeededRandom(seed);
        let game = new Game(width, height, tiles, seededRandom);

        for(let i=0; i<generateSurvivor.STARTING_SURVIVORS;i++) {
            game.survivors.push(generateSurvivor(seededRandom));
        }

        return game;
    }

    /**
     * @param width
     * @param height
     * @param {Point} tiles
     * @param systems
     * @param {SeededRandom} seededRandom
     */
    constructor(width, height, tiles, seededRandom) {
        this.sprites = [];
        this.survivors = [];
        this.deadSurvivors = [];
        this.width = width;
        this.height = height;

        this.seededRandom = seededRandom;

        this.map = new Map(this, tiles);
        this.systems = [];
        this.turns = 0;
        this.renderer = new Renderer(this);

        this.food = STARTING_FOOD_AMOUNT;
        this.content = STARTING_CONTENT;
        this.deadSurvivors = [];

        this.properties = {};

        this.rate = 1000 / 1;
    }

    start() {
        let lastTime = Date.now();
        this.running = setInterval(()=> {
            lastTime = this.runTick(lastTime);
        }, this.rate)
    }

    stop() {
        clearTimeout(this.running);
    }

    runTick(lastTime) {
        let currentTime = Date.now(),
            change = (currentTime - lastTime) / this.rate;
        console.log(`Starting turn: ${this.turns++}`);
        this.tick(change);

        return currentTime;
    }

    tick(rate) {
        this.systems.forEach((system) => {
            this.map.forEach((tile) => {
                if(system.isTileSystem) {
                    system.processTile(tile);
                }
            });

            if(system.isGameSystem) {
                system.processGame(this);
            }

            system.cleanup();
        });

        this.renderer.drawScene();
    }

    addSystem(system) {
        this.systems.push(system);
    }
}

module.exports = Game;