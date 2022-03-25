const data = require("../data/data");

class Data {
    constructor(data) {
        this.name = data.name;
        this.happy = data.happy
    }

    static get All() {
        const dataSet = data.map(newData => new Data(newData));

        return dataSet;
    }
}

module.exports = Data;
