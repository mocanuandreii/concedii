var express = require('express');
var path = require('path');
var app = express();
var rootPath = path.normalize(__dirname + '/../');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var handlebars = require('handlebars');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'testinsoftd@gmail.com',
        pass: 'insoftdev'
    }
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(rootPath + '/app'));

const db = require('../app/config/db.config.js');
require('../app/controller/employee.route.js')(app);
require('../app/controller/records.route.js')(app);
require('../app/controller/company.route.js')(app);
require('../app/controller/templates.route.js')(app);

app.get('/', function (req, res) {
    // ejs render automatically looks in the views folder
    res.sendFile(path.join(rootPath + '/app' + '/Login.html'));
});

app.post('/email', function (req, res) {

    var template = handlebars.compile(req.body.html);
    var replacements = {
        name: req.body.name,
        company_name: req.body.company_name,
        email: req.body.email,
        role: req.body.role,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        workingDays: req.body.workingDays,
        currentDate: req.body.currentDate
    };
    var htmlToSend = template(replacements);
    var mailOptions = {
        from: 'testinsoftd@gmail.com',
        to: req.body.email,
        subject: req.body.subject,
        text: 'That was easy!',
        html: htmlToSend
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
});

var host = 'localhost';
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${PORT}`);
});
