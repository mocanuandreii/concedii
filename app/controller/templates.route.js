module.exports = function(app) {

    const templates = require('./templates.controller.js');

    app.get('/api/template/:title', templates.findByTitle);
}
