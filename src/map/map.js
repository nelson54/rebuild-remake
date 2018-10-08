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