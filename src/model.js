
const ModelData = require('./modelData');

class Model {

    Get(req) {
        return new ModelData();
    }

    Post(req) {
        return new ModelData();
    }

}

module.exports = Model;