const db = require('../config/db.config.js');
const Company = db.company;


exports.findAll = (req, res) => {
    Company.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] }
    })
        .then(company => {
            res.json(company);
            console.log(res.json(company));
        })
        .catch(error => res.status(400).send(error))
};

exports.findById = (req, res) => {
    return Company.findAll({
        where: {
            id: req.params.id
        },
        attributes: { exclude: ["createdAt", "updatedAt"] }
    })
        .then(company => {
                if(!company){
                    return res.status(404).json({message: "company Not Found"})
                }
                return res.status(200).json(company)
            }
        )
        .catch(error => res.status(400).send(error));
}