const Renderer = require('./view/renderer');
const mapFactory = require('./map/map-factory').preConfiguredInstance();
const Map = require('./map/map');
const generateSurvivor = require('./survivors/survivor-generator');

const STARTING_CONTENT = 80;
const STARTING_FOOD_AMOUNT = 15 ;

class Game {

    /**
     * @param {number} width
     * @param {number} height
     * @param {Point} tiles
     */
    static buildGame(width, height, tiles) {
        let game = new Game(width, height, tiles);

        for(let i=0; i<generateSurvivor.STARTING_SURVIVORS;i++) {
            game.survivors.push(generateSurvivor());
        }

        return game;
    }

    /**
     * @param width
     * @param height
     * @param {Point} tiles
     * @param systems
     */
    constructor(width, height, tiles, systems = []) {
        this.sprites = [];
        this.survivors = [];
        this.deadSurvivors = [];
        this.width = width;
        this.height = height;
        this.map = new Map(this, tiles);
        this.systems = systems;
        this.turns = 0;
        this.renderer = new Renderer(this);
        this.rate = 1000 / 1;

        this.food = STARTING_FOOD_AMOUNT;
        this.content = STARTING_CONTENT;
        this.deadSurvivors = [];

        this.properties = {};
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