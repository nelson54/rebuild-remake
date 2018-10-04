const SystemInterface = require('./system-interface');

/**
 * Checks for survivor skill level ups
 *
 * @type {module.SkillSystem}
 */
module.exports = class SkillSystem extends SystemInterface {

    constructor() {
        super();
    }

    processGame(game) {
        game.survivors.forEach((survivor)=> this.calculateSkillChanges(survivor))
    }

    calculateSkillChanges(survivor) {
        Object.keys(survivor.skills).forEach((skillName)=>{
            let skillLevel = survivor.skills[skillName];
            let skillThresholdForLevel = Math.ceil(skillLevel/2) + 1;

            if(survivor.experience[skillName] > skillThresholdForLevel) {
                survivor.skills[skillName]++
            }
        })
    }
};