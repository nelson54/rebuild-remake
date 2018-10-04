const SURVIVOR_GENERATION_DATA = require('../configuration/survivor-generation-data');

const Survivor = require('./survivor');

function pick(arr) {
    return arr[Math.floor(Math.random()*(arr.length))]
}

function determineGender(survivor) {
    survivor.gender = pick(Object.values(SURVIVOR_GENERATION_DATA.GENDER));
}

function determineName(survivor) {
    if(survivor.gender === SURVIVOR_GENERATION_DATA.GENDER.MALE) {
        survivor.firstName = pick(SURVIVOR_GENERATION_DATA.MALE_NAMES)
    } else if(survivor.gender === SURVIVOR_GENERATION_DATA.GENDER.FEMALE) {
        survivor.firstName = pick(SURVIVOR_GENERATION_DATA.FEMALE_NAMES)
    } else {
        survivor.firstName = pick(SURVIVOR_GENERATION_DATA.ANDROGENOUS_NAMES);
    }

    survivor.lastName = pick(SURVIVOR_GENERATION_DATA.LAST_NAMES)
}

function determineSkills(survivor) {
    survivor.skills = {};
    survivor.experience = {};

    SURVIVOR_GENERATION_DATA.SKILLS.forEach((skill) => {
        survivor.skills[skill] = Math.floor(SURVIVOR_GENERATION_DATA.DEFAULT_SKILL_MAX * Math.random());
        survivor.experience[skill] = 0;
    });
}

function generateSurvivor() {
    let survivor = new Survivor();
    determineGender(survivor);
    determineName(survivor);
    determineSkills(survivor);

    return survivor;
}

generateSurvivor.STARTING_SURVIVORS = SURVIVOR_GENERATION_DATA.STARTING_SURVIVORS;

    module.exports = generateSurvivor;