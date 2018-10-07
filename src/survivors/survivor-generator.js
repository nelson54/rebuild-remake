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

function determineSkinColor(survivor) {
    survivor.fitzpatrickType = pick(SURVIVOR_GENERATION_DATA.FITZPATRICK_SCALE);
}

function determineSkills(survivor) {
    survivor.skills = {};
    survivor.experience = {};

    SURVIVOR_GENERATION_DATA.SKILLS.forEach((skill) => {
        survivor.skills[skill] = Math.floor(SURVIVOR_GENERATION_DATA.DEFAULT_SKILL_MAX * Math.random());
        survivor.experience[skill] = 0;
    });
}

function determineFace(survivor) {
    let face = '';

    if(survivor.gender === SURVIVOR_GENERATION_DATA.GENDER.MALE) {
        face += pick(['boy', 'man']);
    } else if(survivor.gender === SURVIVOR_GENERATION_DATA.GENDER.FEMALE) {
        face += pick(['girl', 'woman']);
    } else if(survivor.gender === SURVIVOR_GENERATION_DATA.GENDER.NONBINARY) {
        face += pick(['boy', 'man','girl', 'woman']);
    }

    face += "-" + survivor.fitzpatrickType;

    survivor.face = face;
}

function generateSurvivor() {
    let survivor = new Survivor();

    determineGender(survivor);
    determineName(survivor);
    determineSkills(survivor);
    determineSkinColor(survivor);
    determineFace(survivor);

    return survivor;
}

generateSurvivor.STARTING_SURVIVORS = SURVIVOR_GENERATION_DATA.STARTING_SURVIVORS;

module.exports = generateSurvivor;