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
        if(!tile.isCity && tile.properties.zombies > 0) {
            let target = this.getTargetTile(tile);

            if(!target.isCity) {
                let movementAmount = Math.round(tile.properties.zombies * (MOVEMENT_RATE * Math.random()));

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
                .subtract(tile.position);


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
            if(Math.random() > .5) {
                point.x = 0;
            } else {
                point.y = 0;
            }
        }

        return point;
    }
};

