module.exports = function(app) {

    const company = require('./company.controller.js');

    app.get('/api/company/:id', company.findById);

    //app.put('/api/user/:username', employee.update);

}