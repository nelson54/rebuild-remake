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