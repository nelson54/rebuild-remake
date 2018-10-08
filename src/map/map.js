const Tile = require('./tile'),
Apartment = require('./buildings/apartment'),
PoliceStation = require('./buildings/police-station'),
Farm = require('./buildings/farm'),
House = require('./buildings/house'),
BuildingFactory = require('./buildings/building-factory'),
Point = require('../point');

const EXTERNAL_SURVIVOR_RATE = .4,
    EXTERNAL_SUPPLY_RATE = .4;

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}



class Map {

    static buildTiles(game, width, height, map) {
        let buildingFactory = new BuildingFactory();
        let columns = [];
        for(let x=0; x<width; x++) {
            let rows = [];
            for(let y=0; y<height; y++) {
                let point = new Point(x, y),
                tile = new Tile(game, point);
                tile.building = buildingFactory.createBuilding(tile, map);

                if(Math.random() < EXTERNAL_SUPPLY_RATE) {
                    tile.hasFood = true;
                }

                if(Math.random() < EXTERNAL_SURVIVOR_RATE) {
                    tile.hasPeople = true;
                }

                rows.push(tile)
            }
            columns.push(rows);
        }

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

        Map.prepareCityTile(topLeft, map);
        Map.prepareCityTile(topRight, map);
        Map.prepareCityTile(bottomLeft, map);
        Map.prepareCityTile(bottomRight, map);

    }

    static prepareCityTile(tile, map) {
        tile.isScouted = true;
        tile.isCity = true;
        tile.properties.zombies = 0;
        tile.hasPeople = 0;
        tile.hasGear = 0;
        Map.scoutAdjacent(tile, map);
    }

    static scoutAdjacent(tile, map) {
        map.tiles[tile.x-1][tile.y-1].isScouted=true; //top Left
        map.tiles[tile.x-1][tile.y].isScouted=true; //left
        map.tiles[tile.x-1][tile.y+1].isScouted=true; //bottom Left
        map.tiles[tile.x][tile.y-1].isScouted=true; //top
        map.tiles[tile.x+1][tile.y-1].isScouted=true; //top Right
        map.tiles[tile.x+1][tile.y].isScouted=true; //right
        map.tiles[tile.x+1][tile.y+1].isScouted=true; //bottom Right
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

        return cityTiles[Math.floor((cityTiles.length) * (Math.random()))];
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