const db = require('../config/db.config.js');
const Records = db.records;

exports.create = (req, res) => {
    // Save to MariaDB database
    Records.create({
        company_id: req.body.company_id,
        user_id: req.body.user_id,
        created_at: req.body.created_at,
        period_from: req.body.period_from,
        period_to: req.body.period_to,
        workingDays: req.body.workingDays
    })
        .then(records => {
            // Send created customer to client
            res.json(records);
        })
        .catch(error => res.status(400).send(error))
};

exports.findAll = (req, res) => {
    records.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] }
    })
        .then(records => {
            res.json(records);
            console.log(res.json(records));
        })
        .catch(error => res.status(400).send(error))
};

exports.findByUserId = (req, res) => {
    return Records.findAll({
        where: {
            user_id: req.params.user_id
        },
        attributes: { exclude: ["createdAt", "updatedAt"] }
    })
        .then(records => {
                if(!records){
                    return res.status(404).json({message: "user Not Found"})
                }
                return res.status(200).json(records)
            }
        )
        .catch(error => res.status(400).send(error));
}
