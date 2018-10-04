const Tile = require('./tile'),
Point = require('../point');

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

class Map {

    static buildTiles(game, width, height) {
        let columns = [];
        for(let x=0; x<width; x++) {
            let rows = [];
            for(let y=0; y<height; y++) {
                let point = new Point(x, y);
                rows.push(new Tile(game, point))
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

        topLeft.isCity = true;
        topLeft.properties.zombies = 0;

        topRight.isCity = true;
        topRight.properties.zombies = 0;

        bottomLeft.isCity = true;
        bottomLeft.properties.zombies = 0;

        bottomRight.isCity = true;
        bottomRight.properties.zombies = 0;

    }

    /**
     * @param game
     * @param {Point} size
     */
    constructor(game, size) {
        this.game = game;
        this.size = size;
        this.tiles = Map.buildTiles(game, size.x, size.y);

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