module.exports = function(app) {

    const employee = require('./employee.controller.js');

    app.get('/api/user/:username', employee.findByUserName);

    app.post('/api/employee/:userid', employee.update);

    app.post('/api/updateProfile/:userid', employee.updateProfile);


    //app.put('/api/user/:username', employee.update);

}