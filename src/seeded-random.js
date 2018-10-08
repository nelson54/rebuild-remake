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