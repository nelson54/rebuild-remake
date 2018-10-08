const SystemInterface = require('./system-interface');

/**
 * Calculates the "Macro danger rating" which is the global chance of *something* bad happening. Eventually will work
 * with catastrophe systems to do badness.
 *
 * Currently not used by anything.
 *
 * Eventually this class will be broken up into many systems but I'm doing everything in the same place so it's easier
 * to tweak combat related issues.
 *
 * @type {module.MacroDangerSystem}
 */

const BASE_SURVIVOR_DEFENSE = 10;
const BASE_BUILDING_DEFENSE = 20;
const GLOBAL_DEFENSE_MULTIPLIER = 100;

module.exports = class MacroDangerSystem extends SystemInterface {

    constructor() {
        super();
        this.cleanup();
    }

    processTile(tile) {
        if(tile.properties.zombies > 0) {
            ++this.unsafeTiles;
        } else {
            this.buildingDefense += BASE_BUILDING_DEFENSE;
            ++this.safeTiles;
        }

        this.globalZombies += tile.properties.zombies;
    }

    processGame(game) {
        let averageZombies = this.globalZombies / this.unsafeTiles;
        let totalAverageZombies = averageZombies * this.unsafeTiles;

        game.properties.buildingDefense = (this.buildingDefense * GLOBAL_DEFENSE_MULTIPLIER) / this.safeTiles;
        game.properties.survivorDefense = (this.calculateSurvivorDefense(game)) / this.safeTiles;
        game.properties.totalAverageZombies = totalAverageZombies;
        game.properties.dangerRating = totalAverageZombies / (game.properties.buildingDefense + game.properties.survivorDefense);
    }

    cleanup() {
        this.buildingDefense = 0;
        this.safeTiles = 0;
        this.unsafeTiles = 0;
        this.globalZombies = 0;
    }

    calculateSurvivorDefense(game) {
        let defense = 0;

        game.survivors.forEach((survivor) => {
            let survivorDefense = BASE_SURVIVOR_DEFENSE;
            defense += survivorDefense * (survivor.skills.DEFENSE + 1);
        });

        return defense;
    }


};