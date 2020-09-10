module.exports = function(app) {

    const records = require('./records.controller.js');

    app.post('/api/records/', records.create);

    app.get('/api/records/:user_id', records.findByUserId);
}
