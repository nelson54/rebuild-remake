(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports={
  "buildings": [
    {
      "type": "house",
      "priority": 200,
      "frequency": 0.1,
      "size": 1,
      "maxFood": 5
    },
    {
      "type": "farm",
      "priority": 100,
      "frequency": 0.05,
      "size": 1,
      "maxFood": 1
    }
  ]
}
},{}],2:[function(require,module,exports){
module.exports={
  "STARTING_SURVIVORS": 5,
  "DEFAULT_SKILL_MAX" : 2,
  "ANDROGENOUS_NAMES" : [
    "Casey", "Riley", "Jessie", "Jackie", "Avery", "Jaime", "Peyton", "Kerry", "Jody", "Kendall",
    "Payton", "Skyler", "Frankie", "Pat", "Quinn", "Harley", "Reese", "Robbie", "Tommie", "Justice", "Kris", "Carey",
    "Emerson", "Blair", "Amari", "Elisha", "Sage", "Emery", "Stevie", "Rowan", "Ollie", "Shea", "Jaylin", "Phoenix",
    "Charley", "Armani", "Devyn", "Ivory", "Kendal", "Baby", "Mckinley", "Finley", "Milan", "Tory", "Shay", "Shiloh",
    "Lavern", "Sky", "Reilly", "Leighton", "Santana", "Arden", "Campbell", "Channing", "Kamari", "Alva", "Clair",
    "Lavon", "Kenyatta", "Britt", "Vernell", "Michal", "Austyn", "Rian", "Dominque", "Remy", "Jammie", "Ricki",
    "Jordin", "Trinidad", "Ryley", "Carrol", "Landry", "Lorin", "Yael", "Codi", "Sloan", "Jael", "Kodi", "Azariah",
    "Dakotah", "Lorenza", "Artie", "Maxie", "Torey", "Tai", "Kalani", "Codie", "Storm", "Jaedyn", "Merritt", "Allyn",
    "Jourdan", "Yuri", "Ellery", "Oakley", "Gentry", "Ellison", "Arin", "Sol"
  ],
  "FEMALE_NAMES" : [
    "Sophia", "Emma", "Olivia", "Ava", "Mia", "Isabella", "Riley", "Aria", "Zoe", "Charlotte", "Lily",
    "Layla", "Amelia", "Emily", "Madelyn", "Aubrey", "Adalyn", "Madison", "Chloe", "Harper", "Abigail", "Aaliyah",
    "Avery", "Evelyn", "Kaylee", "Ella", "Ellie", "Scarlett", "Arianna", "Hailey", "Nora", "Addison", "Brooklyn",
    "Hannah", "Mila", "Leah", "Elizabeth", "Sarah", "Eliana", "Mackenzie", "Peyton", "Maria", "Grace", "Adeline",
    "Elena", "Anna", "Victoria", "Camilla", "Lillian", "Natalie"
  ],
  "MALE_NAMES" : [
    "Jackson", "Aiden", "Lucas", "Liam", "Noah", "Ethan", "Mason", "Caden", "Oliver", "Elijah", "Grayson", "Jacob",
    "Michael", "Benjamin", "Carter", "James", "Jayden", "Logan", "Alexander", "Caleb", "Ryan", "Luke", "Daniel", "Jack",
    "William", "Owen", "Gabriel", "Matthew", "Connor", "Jayce", "Isaac", "Sebastian", "Henry", "Muhammad", "Cameron",
    "Wyatt", "Dylan", "Nathan", "Nicholas", "Julian", "Eli", "Levi", "Isaiah", "Landon", "David", "Christian", "Andrew",
    "Brayden", "John", "Lincoln"
  ],
  "LAST_NAMES" : [
    "Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor",
    "Anderson", "Thomas", "Jackson", "White", "Harris", "Martin", "Thompson", "Garcia", "Martinez", "Robinson", "Clark",
    "Rodriguez", "Lewis", "Lee", "Walker", "Hall", "Allen", "Young", "Hernandez", "King", "Wright", "Lopez", "Hill",
    "Scott", "Green", "Adams", "Baker", "Gonzalez", "Nelson", "Carter", "Mitchell", "Perez", "Roberts", "Turner",
    "Phillips", "Campbell", "Parker", "Evans", "Edwards", "Collins", "Stewart", "Sanchez", "Morris", "Rogers", "Reed",
    "Cook", "Morgan", "Bell", "Murphy", "Bailey", "Rivera", "Cooper", "Richardson", "Cox", "Howard", "Ward", "Torres",
    "Peterson", "Gray", "Ramirez", "James", "Watson", "Brooks", "Kelly", "Sanders", "Price", "Bennett", "Wood",
    "Barnes", "Ross", "Henderson", "Coleman", "Jenkins", "Perry", "Powell", "Long", "Patterson", "Hughes", "Flores",
    "Washington", "Butler", "Simmons", "Foster", "Gonzales", "Bryant", "Alexander", "Russell", "Griffin", "Diaz",
    "Hayes"
  ],
  "GENDER" : {
    "MALE" : "Male",
    "FEMALE" : "Female",
    "NONBINARY": "Non-binary"
  },
  "FITZPATRICK_SCALE": [
    "type-1",
    "type-2",
    "type-3",
    "type-4",
    "type-5",
    "type-6"
  ],
  "SKILLS" : ["CONSTRUCTION", "DEFENSE", "SCAVENGING", "SCIENCE", "LEADERSHIP"]
}
},{}],3:[function(require,module,exports){
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
},{"./map/map":17,"./map/map-factory":16,"./seeded-random":20,"./survivors/survivor-generator":21,"./view/renderer":35}],4:[function(require,module,exports){
const Point = require('./point'),
    Game = require('./game'),
    SystemLoader = require('./systems/system-loader');

window.addEventListener('DOMContentLoaded', () => {
    let game = Game.buildGame(800, 600, new Point(10, 10), 10);

    SystemLoader
        .create()
        .loadSystems()
        .forEach((system) => game.addSystem(system));

    game.start();
});
},{"./game":3,"./point":19,"./systems/system-loader":32}],5:[function(require,module,exports){
const BaseBuilding = require('./base-building');

module.exports = class House extends BaseBuilding {
    constructor() {
        super();

        this.image = 'apartment';
    }

    get housing() {
        return 2;
    }
};
},{"./base-building":7}],6:[function(require,module,exports){
const BaseBuilding = require('./base-building');

module.exports = class Bank extends BaseBuilding {

    constructor() {
        super();

        this.image = 'bank';
    }
};
},{"./base-building":7}],7:[function(require,module,exports){
module.exports = class BaseBuilding {
    constructor(tile) {
        this.tile = tile;

        this.image = 'unknown';
        this.redraw = true;
    }

    get housing() {
        return 0;
    }

    get food() {
        return 0;
    }

    get defense() {
        return 0;
    }
}



;
},{}],8:[function(require,module,exports){
const Farm = require('./farm'),
    GasStation = require('./gas-station'),
    Hospital = require('./hospital'),
    House = require('./house'),
    PoliceStation = require('./police-station'),
    Laboratory = require('./laboratory'),
    Bank = require('./bank'),
    TradeSchool = require('./trade-school'),
    Apartment = require('./apartment')
;

let buildingConstructors = [
    Farm,
    GasStation,
    Hospital,
    House,
    PoliceStation,
    Laboratory,
    Bank,
    TradeSchool,
    Apartment
];

module.exports = class BuildingFactory {

    /**
     * @param {SeededRandom} seededRandom
     */
    constructor(seededRandom) {
        this.seededRandom = seededRandom;
    }

    pickConstructor() {
        return buildingConstructors[Math.floor(buildingConstructors.length * this.seededRandom.random())]
    }

    /**
     * @param {Tile} tile
     */
    createBuilding(tile, map) {
        console.log('dog');
        return new (this.pickConstructor())(tile, map);
    }
};
},{"./apartment":5,"./bank":6,"./farm":9,"./gas-station":10,"./hospital":11,"./house":12,"./laboratory":13,"./police-station":14,"./trade-school":15}],9:[function(require,module,exports){
const BaseBuilding = require('./base-building');

module.exports = class Farm extends BaseBuilding {

    constructor() {
        super();

        this.image = 'farm';
    }

    get food() {
        return 1;
    }
};
},{"./base-building":7}],10:[function(require,module,exports){
const BaseBuilding = require('./base-building');

module.exports = class GasStation extends BaseBuilding {
    constructor() {
        super();
        this.image = 'gas-station';
    }
};
},{"./base-building":7}],11:[function(require,module,exports){
const BaseBuilding = require('./base-building');

module.exports = class GasStation extends BaseBuilding {
    constructor() {
        super();

        this.image = 'hospital';
    }
};
},{"./base-building":7}],12:[function(require,module,exports){
const BaseBuilding = require('./base-building');

module.exports = class House extends BaseBuilding {
    constructor() {
        super();

        this.image = 'house';
    }

    get housing() {
        return 1;
    }
};
},{"./base-building":7}],13:[function(require,module,exports){
const BaseBuilding = require('./base-building');

module.exports = class Laboratory extends BaseBuilding {

    constructor() {
        super();

        this.image = 'laboratory';
    }
};
},{"./base-building":7}],14:[function(require,module,exports){
const BaseBuilding = require('./base-building');

module.exports = class GasStation extends BaseBuilding {
    constructor() {
        super();

        this.image = 'police-station';
    }
};
},{"./base-building":7}],15:[function(require,module,exports){
const BaseBuilding = require('./base-building');

module.exports = class Farm extends BaseBuilding {

    constructor() {
        super();

        this.image = 'trade-school';
    }
};
},{"./base-building":7}],16:[function(require,module,exports){
const Map = require('./map');
    Farm = require('./buildings/farm'),
    House = require('./buildings/house');

class MapFactory {
    /**
     * @param {buildings} configuration
     */
    constructor(configuration) {
        this.configuration = configuration;
    }

    static preConfiguredInstance() {
        return new MapFactory(require('../configuration/map-generator-configuration'));
    }

    /**
     * @param {Point} size
     * @return {Map}
     */
    buildMap(size) {

        let map = new Map(size);

        for(let buildingConfig in this.configuration.buildings) {

        }

        return map;
    }

    /**
     *
     * @param {type, priority, frequency, size, maxFood} buildingConfig
     */
    generateBuildings(buildingConfig) {

    }
}

module.exports = MapFactory;
},{"../configuration/map-generator-configuration":1,"./buildings/farm":9,"./buildings/house":12,"./map":17}],17:[function(require,module,exports){
const Tile = require('./tile'),
Apartment = require('./buildings/apartment'),
PoliceStation = require('./buildings/police-station'),
Farm = require('./buildings/farm'),
House = require('./buildings/house'),
BuildingFactory = require('./buildings/building-factory'),
Point = require('../point');

const EXTERNAL_SURVIVOR_RATE = .4,
    EXTERNAL_SUPPLY_RATE = .4;

class Map {

    static buildTiles(game, width, height, map) {
        let seededRandom = game.seededRandom,
            buildingFactory = new BuildingFactory(seededRandom),
            columns = [],
            tilesById = {};

        for(let x=0; x<width; x++) {
            let rows = [];
            for(let y=0; y<height; y++) {
                let point = new Point(x, y),
                tile = new Tile(game, point, map);
                tile.building = buildingFactory.createBuilding(tile, map);
                tilesById[tile.id] = tile;
                if(seededRandom.random() < EXTERNAL_SUPPLY_RATE) {
                    tile.hasFood = true;
                }

                if(seededRandom.random() < EXTERNAL_SURVIVOR_RATE) {
                    tile.hasPeople = true;
                }

                rows.push(tile)
            }
            columns.push(rows);
        }

        map.tilesById = tilesById;

        return columns;
    }

    /**
     * @param {Map} map
     */
    static addStartingCity(map) {
        let center = map.center;

        let topLeft = map.tiles[center.x-1][center.y-1],
            topRight = map.tiles[center.x][center.y-1],
            bottomLeft = map.tiles[center.x-1][center.y],
            bottomRight = map.tiles[center.x][center.y];

        topLeft.building = new Apartment(topLeft);
        topRight.building = new Farm(topRight);
        bottomLeft.building = new PoliceStation(bottomLeft);
        bottomRight.building = new House(bottomRight);

        Map.prepareCityTile(topLeft);
        Map.prepareCityTile(topRight);
        Map.prepareCityTile(bottomLeft);
        Map.prepareCityTile(bottomRight);

    }

    static prepareCityTile(tile) {
        tile.isScouted = true;
        tile.isCity = true;
        tile.properties.zombies = 0;
        tile.hasPeople = 0;
        tile.hasGear = 0;
        Map.scoutAdjacent(tile);
    }

    static scoutAdjacent(tile) {
        Map.findAdjacent(tile).map((adjacentTile) => {
            adjacentTile.isScouted = true;
        })
    }

    static findTilesAdjacentToCity(map) {
        let tilesById = map.filter((tile) => {
            return tile.isCity
        }).map((tile) => {
            return Map.findAdjacent(tile)
        }).reduce((accumulator, tiles) => {
            return tiles.filter(tile => {
                return !tile.isCity
            }).reduce((accumulator, tile) => {
                accumulator[tile.id] = tile;
                return accumulator;
            }, accumulator)
        }, {});

        return Object.values(tilesById) || []
    }

    static findAdjacent(tile) {
        let map = tile.map;
        let tiles = [];
        Map.addMapIfTileExists(map, tile.x-1, tile.y-1, tiles); //top Left
        Map.addMapIfTileExists(map, tile.x-1, tile.y, tiles);   //left
        Map.addMapIfTileExists(map, tile.x-1, tile.y+1, tiles); //bottom Left

        Map.addMapIfTileExists(map, tile.x, tile.y-1, tiles);   //top
        Map.addMapIfTileExists(map, tile.x, tile.y+1, tiles);   //bottom

        Map.addMapIfTileExists(map, tile.x+1, tile.y-1, tiles); //top Right
        Map.addMapIfTileExists(map, tile.x+1, tile.y, tiles);   //right
        Map.addMapIfTileExists(map, tile.x+1, tile.y+1, tiles); //bottom Right

        return tiles;
    }

    static addMapIfTileExists(map, x, y, tiles) {
        if (x>0 && y>0) {
            tiles.push(map.get(x, y))
        }
    }

    /**
     * @param game
     * @param {Point} size
     */
    constructor(game, size) {
        this.game = game;
        this.size = size;
        this.tiles = Map.buildTiles(game, size.x, size.y, this);

        Map.addStartingCity(this);
    }

    get(x, y) {
        return this.tiles[x][y];
    }

    get emptyTiles() {
        let tile;
        let emptyTiles = [];

        for(let x=0; x<this.size.x; x++) {
            for(let y=0; y<this.size.y; y++) {
                tile = this.tiles[x][y];
                if(!tile.hasBuilding()) {
                    emptyTiles.push(tile);
                }
            }
        }
    }

    forEach(func) {
        for(let x=0; x<this.size.x; x++) {
            for(let y=0; y<this.size.y; y++) {
                func(this.tiles[x][y], x, y);
            }
        }
    }

    map(func) {
        let arr = [];
        this.forEach((tile, x, y) => arr.push(func(tile, x, y)));
        return arr;
    }

    filter(func) {
        let arr = [];
        this.forEach((tile, x, y)=> {
            if(func(tile, x, y)) {
                arr.push(tile)
            }
        });
        return arr;
    }

    /**
     * @param {Point} point
     * @return {Tile}
     */
    getTile(point) {
        return this.tiles[point.x][point.y]
    }

    get length() {
        return this.size.x * this.size.y;
    }

    get randomCityTile() {
        let cityTiles = this.cityTiles;

        return cityTiles[Math.floor((cityTiles.length) * (this.game.seededRandom.random()))];
    }

    get cityTiles() {
        return this.filter((tile) => {
            return tile.isCity === true;
        })
    }

    /**
     * @returns {Point}
     */
    get center() {
        return this.size
            .divide(2)
            .round()
    }
}

module.exports = Map;
},{"../point":19,"./buildings/apartment":5,"./buildings/building-factory":8,"./buildings/farm":9,"./buildings/house":12,"./buildings/police-station":14,"./tile":18}],18:[function(require,module,exports){
const Point = require('../point');

const STARTING_ZOMBIE_RATE = 5;

module.exports = class Tile {

    /**
     * @param {Game} game
     * @param {Point} position
     */
    constructor(game, position, map) {
        this.id = game.seededRandom.guid();
        this.game = game;
        this.position = position;
        this.properties = {zombies: STARTING_ZOMBIE_RATE};
        this.map = map;
        this.isCity = false;
        this.isScouted = false;
    }

    get x() {
        return this.position.x;
    }

    set x(x) {
        this.position.x = x;
    }

    get y() {
        return this.position.y;
    }

    set y(y) {
        this.position.y = y;
    }

    get food() {
        return this.building.food;
    }

    setBuilding(building) {
        this.building = building;
    }

    hasBuilding() {
        return !!this.building;
    }

    isEdge() {
        return (this.x === 0) ||
            (this.y === 0) ||
            (this.x === (this.game.map.size.x - 1)) ||
            (this.y === (this.game.map.size.x - 1));
    }
};
},{"../point":19}],19:[function(require,module,exports){
/**
 * @class Point
 */
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * @param {Point} point
     */
    add(point) {
        return new Point(this.x + point.x, this.y + point.y);
    }

    /**
     * @param {Point} point
     */
    subtract(point) {
        return new Point(this.x - point.x, this.y - point.y);
    }

    divide(n) {
        return new Point(this.x/n, this.y/n)
    }

    round() {
        return new Point(Math.round(this.x), Math.round(this.y));
    }
}

module.exports = Point;
},{}],20:[function(require,module,exports){
module.exports = class SeededRandom {
    constructor(seed) {
        this.initialSeed = seed;
        this.seed = seed * 1000;
    }

    random() {
        let x = Math.sin(this.seed++) * 10000;
        return x - Math.floor(x);
    }

    guid() {
        return this.s4() +
            this.s4() + '-' +
            this.s4() + '-' +
            this.s4() + '-' +
            this.s4() + '-' +
            this.s4() +
            this.s4() +
            this.s4();
    }

    s4() {
        return Math.floor((1 + this.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
};
},{}],21:[function(require,module,exports){
const SURVIVOR_GENERATION_DATA = require('../configuration/survivor-generation-data');

const Survivor = require('./survivor');

function generateSurvivor(seededRandom) {
    let survivor = new Survivor();

    function pick(arr) {
        return arr[Math.floor(seededRandom.random()*(arr.length))]
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
            survivor.skills[skill] = Math.floor(SURVIVOR_GENERATION_DATA.DEFAULT_SKILL_MAX * seededRandom.random());
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

    determineGender(survivor);
    determineName(survivor);
    determineSkills(survivor);
    determineSkinColor(survivor);
    determineFace(survivor);

    return survivor;
}

generateSurvivor.STARTING_SURVIVORS = SURVIVOR_GENERATION_DATA.STARTING_SURVIVORS;

module.exports = generateSurvivor;
},{"../configuration/survivor-generation-data":2,"./survivor":22}],22:[function(require,module,exports){
module.exports = class Survivor {
    constructor() {
        this.isAlive = true;
    }
};

},{}],23:[function(require,module,exports){
const SystemInterface = require('./system-interface');
const survivorGenerator = require('../survivors/survivor-generator');

const SURVIVOR_SPAWN_RATE = .1;

/**
 * Automated survivor spawn when this system is running
 * @type {module.AdditionalSurvivorSystem}
 */
module.exports = class AdditionalSurvivorSystem extends SystemInterface {

    processGame(game) {
        let seededRandom = game.seededRandom;

        if(seededRandom.random() < SURVIVOR_SPAWN_RATE) {
            game.survivors.push(survivorGenerator(seededRandom))
        }
    }
};
},{"../survivors/survivor-generator":21,"./system-interface":31}],24:[function(require,module,exports){
const SystemInterface = require('./system-interface');

const FULL_DANGER_THRESHOLD = 30;

module.exports = class DangerSystem extends SystemInterface {
    constructor(seededRandom) {
        super(seededRandom);
        this.isGameSystem = false;
    }

    processTile(tile) {
        tile.properties.danger = (tile.properties.zombies / FULL_DANGER_THRESHOLD);
    }
};
},{"./system-interface":31}],25:[function(require,module,exports){
const SystemInterface = require('./system-interface');

/**
 * Cleans up dead survivors from survivor list when deceased.
 *
 * @type {module.SkillSystem}
 */

const MAX_STARVATION = 3;

module.exports = class DeathSystem extends SystemInterface {

    processGame(game) {
        game.survivors = game.survivors.filter((survivor)=> {
            if(survivor.isAlive) {
                return true;
            } else {
                game.deadSurvivors.push(survivor);
                return false;
            }
        })
    }
};
},{"./system-interface":31}],26:[function(require,module,exports){
const SystemInterface = require('./system-interface');

/**
 * Handles food consumption and starvation.
 *
 * @type {module.SkillSystem}
 */
const MAX_STARVATION = 2;

module.exports = class FoodSystem extends SystemInterface {

    constructor() {
        super();
        this.cleanup();
    }

    processTile(tile) {
        if(tile.isCity) {
            this.foodProduction += tile.food;
        }
    }

    processGame(game) {
        let previousFoodAmount = game.food + 0;
        game.food -= Math.floor(game.survivors.length * .66);

        if(game.food <= 0) {
            let starvationCount = Math.round(MAX_STARVATION * game.seededRandom.random());

            for (let i = 0; i < starvationCount; i++) {
                game.survivors[Math.floor(game.survivors.length * game.seededRandom.random())].isAlive = false;
            }

            game.food = 0;
        }

        game.food += this.foodProduction;

        game.properties.foodDelta = game.food - previousFoodAmount;
    }

    cleanup() {
        this.foodProduction = 0;
    }
};
},{"./system-interface":31}],27:[function(require,module,exports){
const SystemInterface = require('./system-interface'),
Map = require('../map/map');

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
const GLOBAL_DEFENSE_MULTIPLIER = 10;

module.exports = class MacroDangerSystem extends SystemInterface {

    constructor(seededRandom) {
        super(seededRandom);
        this.cleanup();
    }

    processTile(tile) {
        if(tile.isCity) {
            this.buildingDefense += BASE_BUILDING_DEFENSE;
            ++this.safeTiles;
        }
    }

    processGame(game) {

        let surroundingZombies = Map.findTilesAdjacentToCity(game.map)
            .map(tile => {
                return tile.properties.zombies;
            })
            .reduce((accumulator, zombies) => {
                accumulator += zombies;
                return accumulator;
            }, 0);

        let averageZombies = this.globalZombies / this.unsafeTiles;
        let totalAverageZombies = averageZombies * this.unsafeTiles;


        game.properties.surroundingZombies = surroundingZombies;
        game.properties.buildingDefense = (this.buildingDefense * GLOBAL_DEFENSE_MULTIPLIER) / this.safeTiles;
        game.properties.survivorDefense = (this.calculateSurvivorDefense(game)) / this.safeTiles;
        game.properties.totalAverageZombies = totalAverageZombies;
        game.properties.dangerRating = surroundingZombies / (game.properties.buildingDefense + game.properties.survivorDefense);
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
},{"../map/map":17,"./system-interface":31}],28:[function(require,module,exports){
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
},{"./system-interface":31}],29:[function(require,module,exports){
const SystemInterface = require('./system-interface');

const ZOMBIE_SPAWN_RATE = 2;

/**
 * Spawns zombies at a random percentage of the ZOMBIE SPAWN RATE
 *
 * @type {module.SpawnSystem}
 */
module.exports = class SpawnSystem extends SystemInterface {
    constructor() {
        super();
        this.isGameSystem = false;
    }

    processTile(tile) {
        let game = tile.game;

        if(tile.isEdge()) {
            tile.properties.zombies += Math.floor(ZOMBIE_SPAWN_RATE * game.seededRandom.random())
        }
    }
};
},{"./system-interface":31}],30:[function(require,module,exports){
const SystemInterface = require('./system-interface');
const survivorGenerator = require('../survivors/survivor-generator');

const SURVIVOR_SPAWN_RATE = .15;

/**
 * @type {module.SurvivorInfoSystem}
 */
module.exports = class SurvivorInfoSystem extends SystemInterface {
    constructor() {
        super();

        this.gameInfoContainer = document.createElement('div');
        this.gameInfoContainer.setAttribute('id', 'game-info-container');
        document.body.appendChild(this.gameInfoContainer);

        this.survivorInfoContainer = document.createElement('div');
        this.survivorInfoContainer.setAttribute('id', 'survivor-info-container');
        document.body.appendChild(this.survivorInfoContainer);

    }

    processGame(game) {

        this.addGameInfo(game);
        this.addSurvivorInfo(game);

    }

    addGameInfo(game) {

        let foodUsed = game.properties.foodDelta;

        let gameInfoInnerHtml = "" +
            `<div id="gameInfo">
                <h3>Game Info</h3>
                
                <p><strong>Turn: </strong> ${game.turns}</p>
                <p><strong>Food: </strong> ${game.food} (${foodUsed})</p>
                <p><strong>Defense from buildings: </strong> ${game.properties.buildingDefense}</p>
                <p><strong>Defense from survivors: </strong> ${game.properties.survivorDefense}</p>
                
                <p><strong>Total Defense: </strong> ${game.properties.buildingDefense + game.properties.survivorDefense}</p>
                
                
                <p><strong>Total Surrounding Zombies: </strong> ${game.properties.surroundingZombies}</p>
                
                <p><strong>Total Average Zombies: </strong> ${Number.parseFloat(game.properties.totalAverageZombies).toFixed(2)}</p>
                <p><strong>Total Danger Rating: </strong> ${Number.parseFloat(game.properties.dangerRating * 100).toFixed(2)}%</p>
            </div>
            <hr class='clear'>
            `;

        if(gameInfoInnerHtml !== this.gameInfoInnerHtmlPreviousHtml) {
            this.gameInfoContainer.innerHTML = this.gameInfoInnerHtmlPreviousHtml = gameInfoInnerHtml;
        }
    }


    addSurvivorInfo(game) {
        let survivorInfoInnerHtml = "" +
            `<div id="survivors">
                <h3>Survivors (${game.survivors.length})</h3>
                <ul>
                    ${game.survivors.map((survivor)=> SurvivorInfoSystem.survivorHtml(survivor)).join("\n")}
                </ul>
            </div>
            <div id="dead">
                <h3>Graveyard (${game.deadSurvivors.length})</h3>
                <ul>
                    ${game.deadSurvivors.map((survivor) => SurvivorInfoSystem.survivorHtml(survivor)).join("\n")}
                </ul>
            </div>
            `;

        if(survivorInfoInnerHtml !== this.survivorInfoInnerHtmlPreviousHtml) {
            this.survivorInfoContainer.innerHTML = this.survivorInfoInnerHtmlPreviousHtml = survivorInfoInnerHtml;
        }
    }

    /**
     *
     * @param {Survivor} survivor
     */
    static survivorHtml(survivor) {
        return "" +
            `<li>
                <img height="32" width="32" src="/rebuild-remake/public/images/${survivor.face}.png"
                <strong>${survivor.firstName} ${survivor.lastName}</strong>
            </li>
            `;
    }
};
},{"../survivors/survivor-generator":21,"./system-interface":31}],31:[function(require,module,exports){
module.exports = class SystemInterface {


    constructor() {
        this.isGameSystem = true;
        this.isTileSystem = true;
    }

    /***
     * @param {Game} game
     */
    processGame(game) {

    }

    /***
     * @param {Tile} tile
     */
    processTile(tile) {

    }

    cleanup() {

    }
};
},{}],32:[function(require,module,exports){
const DangerSystem = require('./danger-system');
const MacroDangerSystem = require('./macro-danger-system');
const SpawnSystem = require('./spawn-system');
const ZombieMovementSystem = require('./zombie-movement-system');
const ZombieDeathSystem = require('./zombie-death-system');
const SkillSystem = require('./skill-system');
const AdditionalSurvivorSystem = require('./additional-survivor-system');
const FoodSystem = require('./food-system');
const DeathSystem = require('./death-system');
const SurvivorInfoSystem = require('./survivor-info-system');
/**
 * Prepares game systems
 *
 * @type {module.SystemLoader}
 */
module.exports = class SystemLoader {

    static create() {
        return new SystemLoader();
    }

    // TODO need to add a lifecycle system some lifecycles need to be updated during player phase like calculating the macro danger as survivors are reassigned tasks
    loadSystems() {
        return [
            // START OF TURN PHASE
            new SpawnSystem(),
            new DangerSystem(),
            new MacroDangerSystem(),

            // PLAYER PHASE

            // END OF TURN PHASE
            new ZombieDeathSystem(),
            new ZombieMovementSystem(),
            new SkillSystem(),

            new FoodSystem(),
            new DeathSystem(),
            new AdditionalSurvivorSystem(),

            new SurvivorInfoSystem()
        ]
    }
};
},{"./additional-survivor-system":23,"./danger-system":24,"./death-system":25,"./food-system":26,"./macro-danger-system":27,"./skill-system":28,"./spawn-system":29,"./survivor-info-system":30,"./zombie-death-system":33,"./zombie-movement-system":34}],33:[function(require,module,exports){
const SystemInterface = require('./system-interface');
const DEATH_RATE = .02;

/**
 *
 * @type {module.ZombieDeathSystem}
 */
module.exports = class ZombieDeathSystem extends SystemInterface {
    constructor() {
        super();
        this.isGameSystem = false;
    }

    processTile(tile) {
        let game = tile.game;
        if(!tile.isCity && tile.properties.zombies > 0) {
            let deathAmount = Math.round(tile.properties.zombies * (DEATH_RATE * game.seededRandom.random()));

            tile.properties.zombies -= deathAmount;
        }
    }
};


},{"./system-interface":31}],34:[function(require,module,exports){
const SystemInterface = require('./system-interface');
const Point = require('../point');
const MOVEMENT_RATE = .05;

/**
 * Determines zombie movement rate and pathfinding for zombies
 *
 * @type {module.ZombieMovementSystem}
 */
module.exports = class ZombieMovementSystem extends SystemInterface {
    constructor() {
        super();
        this.isGameSystem = false;
    }

    processTile(tile) {
        let seededRandom = tile.game.seededRandom;
        if(!tile.isCity && tile.properties.zombies > 0) {
            let target = this.getTargetTile(tile);

            if(!target.isCity) {
                let movementAmount = Math.round(tile.properties.zombies * (MOVEMENT_RATE * seededRandom.random()));

                tile.properties.zombies -= movementAmount;
                target.properties.zombies += movementAmount;
            }
        }
    }

    getTargetTile(tile) {
        let direction = this.getDirectionToCity(tile);

        return tile.game.map.tiles[tile.x + direction.x][tile.y + direction.y];
    }

    getDirectionToCity(tile) {
        let point = new Point(0, 0),
            distance = tile.game.map.randomCityTile.position
                .subtract(tile.position),
            seededRandom = tile.game.seededRandom;


        if(distance.x > 0) {
            point.x = 1;
        } else if(distance.x < 0) {
            point.x = -1;
        }

        if(distance.y > 1) {
            point.y = 1
        } else if(distance.y < 0) {
            point.y = -1;
        }

        if((point.x + point.y) === 2) {
            if(seededRandom.random() > .5) {
                point.x = 0;
            } else {
                point.y = 0;
            }
        }

        return point;
    }
};


},{"../point":19,"./system-interface":31}],35:[function(require,module,exports){
const EMOTICON_SIZE = 32;

class Renderer {

    /**
     * @param {Game} game
     */
    constructor(game) {
        this.game = game;

        this.game = game;
        let canvas = this.canvas = document.createElement('canvas');
        canvas.width = game.width;
        canvas.height = game.height;
        document.body.appendChild(canvas);

        this.root = '/rebuild-remake/public';

        this.hasSupplyImage = new Image();
        this.hasSupplyImage.src = this.root + `/images/has-apple.png`;

        this.hasPeopleImage = new Image();
        this.hasPeopleImage.src = this.root + `/images/has-people.png`;

        this.context = canvas.getContext('2d');
    }

    static dangerToColor(danger) {
        if (danger > .9) {
            return 'rgba(175, 14, 0, .5)';
        } else if (danger > .8) {
                return 'rgba(175, 53, 152, .5)';
        } else if (danger > .7) {
            return 'rgba(207, 133, 59, .5)';
        } else if (danger > .5) {
            return 'rgba(207, 198, 53, .5)';
        } else if (danger > .2) {
            return 'rgba(0,   163, 74, .5)';
        } else if (danger > 0) {
            return 'rgba(3, 107, 163,  .5)';
        } else {

        }
    }

    drawScene() {
        let tileWidth = this.game.width / this.game.map.tiles.length,
            tileHeight = this.game.height / this.game.map.tiles[0].length;

        this.context.clearRect(0, 0, this.game.width, this.game.height);

        this.game.map.forEach((tile) => {
            let building = tile.building,
                x = tile.x * tileWidth,
                y = tile.y * tileHeight;

            if(building.redraw) {
                building.isLoaded = false;
                building.canvasImage = new Image();
                building.canvasImage.src = this.root +`/images/${building.image}.png`;

                building.canvasImage.onload = ()=>{
                    building.isLoaded = true;

                    building.drawPosition = {
                        x: x + ( (tileWidth - EMOTICON_SIZE) / 2),
                        y: y + ( (tileHeight - EMOTICON_SIZE) / 2)
                    };
                };

                building.redraw = false;
            }

            if(!tile.isCity) {
                this.context.fillStyle = Renderer.dangerToColor(tile.properties.danger);
                this.context.fillRect(x, y, tileWidth, tileHeight);

            }

            if(building.isLoaded) {
                this.context.drawImage(building.canvasImage, building.drawPosition.x, building.drawPosition.y, EMOTICON_SIZE, EMOTICON_SIZE);

                if(tile.hasFood && !tile.isCity) {
                    this.context.drawImage(this.hasSupplyImage, building.drawPosition.x-6, building.drawPosition.y-3, 16, 16);
                }

                if(tile.hasPeople && !tile.isCity) {
                    this.context.drawImage(this.hasPeopleImage, building.drawPosition.x, building.drawPosition.y, 16, 16);
                }
            }

            if(!tile.isScouted) {
                this.context.fillStyle = 'rgb(0, 0, 0, .5)';
                this.context.fillRect(x, y, tileWidth, tileHeight);
            }
        });

        this.game.sprites.forEach((sprite) => {
            this.draw(sprite);
        });
    }

    /**
     * @param {Sprite} sprite
     */
    draw(sprite) {
        this.context.fillStyle = sprite.color;
        this.context.fillRect(sprite.position.x, sprite.position.y, sprite.size.x, sprite.size.y);
    }
}

module.exports = Renderer;
},{}]},{},[4]);
