module.exports = async function (req, res, next) {
    let method = req.method;

    switch(method) {
        case 'GET':
            req.input = req.query;
            break;
        case 'PUT':
        case 'DELETE':
        case 'POST':
            req.input = req.body;
            break;
        default:
            req.input = {};
            break;
    }
    next();
};