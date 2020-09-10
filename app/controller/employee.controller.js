const db = require('../config/db.config.js');
const Employee = db.employee;


exports.findAll = (req, res) => {
    employee.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] }
    })
        .then(employee => {
            res.json(employee);
            console.log(res.json(employee));
        })
        .catch(error => res.status(400).send(error))
};

exports.findByUserName = (req, res) => {
    return Employee.findAll({
        where: {
            username: req.params.username
        },
        attributes: { exclude: ["createdAt", "updatedAt"] }
    })
        .then(employee => {
                if(!employee){
                    return res.status(404).json({message: "user Not Found"})
                }
                return res.status(200).json(employee)
            }
        )
        .catch(error => res.status(400).send(error));
}

exports.update = (req, res) => {
    let updateValues =
        {
             vacationDays: req.body.vacationDays
        };
    Employee.update(updateValues, {where: {id: req.params.userid}}).then((result) => {
        console.log(req.body);
    });
};

exports.updateProfile = (req, res) => {
    let updateValuesP =
        {
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            address: req.body.address,
            email: req.body.email
        };
    Employee.update(updateValuesP, {where: {id: req.params.userid}}).then((result) => {
        console.log(req.body);
    });
};





// exports.update = (req, res) => {
//     let updateValues =
//         {
//             name: req.body.name,
//             adress: req.body.adress,
//             email: req.body.email,
//             phone_number: req.body.phoneNumber
//         };
//     User.update(updateValues, {where: {id_user: req.params.id_user}}).then((result) => {
//         console.log(req.body);
//     });
// };
