const Model = require('../src/model');
const ModelData = require('../src/modelData');
const CookieParser = require('../src/cookieParser');

function getCookies(req) {
    return CookieParser.parseCookies(req.headers.cookie);
}

class IndexModel extends Model {

    Get(req) {
        return new ModelData({
            peopleName: getCookies(req).name || 'anonymous'
        });
    }

    Post(req) {

        let data = new ModelData();

        const { name } = req.body;

        if (!name) {
            return data.setData({
                peopleName: getCookies(req).name || 'anonymous',
                error: 'No name! Type your name and send the form!'
            });
        }

        data.setCookie('name', name);
        return data.setData({
            peopleName: name,
        });
    }

}

module.exports = IndexModel;