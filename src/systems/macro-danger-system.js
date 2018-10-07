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
const BASE_BUILDING_DEFENSE = 10;
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
        let defenseValue = (this.calculateDefense(game) * GLOBAL_DEFENSE_MULTIPLIER) / this.safeTiles;
        let averageZombies = this.globalZombies / this.unsafeTiles;
        let totalAverageZombies = averageZombies * this.unsafeTiles;
        console.log(`Defense Rating: ${defenseValue}`);
        console.log(`Average Zombies: ${totalAverageZombies}`);
        console.log(`Macro Danger Rating: ${totalAverageZombies / defenseValue}`);
        console.log(`Total Food: ${game.food}`);
        console.log(`Total Living Survivors: ${game.survivors.length}`);
        console.log(`Total Dead Survivors: ${game.deadSurvivors.length}`);
    }

    cleanup() {
        this.buildingDefense = 0;
        this.safeTiles = 0;
        this.unsafeTiles = 0;
        this.globalZombies = 0;
    }

    calculateDefense(game) {
        let defense = this.buildingDefense;

        game.survivors.forEach((survivor) => {
            let survivorDefense = BASE_SURVIVOR_DEFENSE;
            defense += survivorDefense * (survivor.skills.DEFENSE + 1);
        });

        return defense;
    }


};