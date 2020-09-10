const db = require('../config/db.config.js');
const Templates = db.templates;

exports.findAll = (req, res) => {
    templates.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] }
    })
        .then(templates => {
            res.json(templates);
            console.log(res.json(templates));
        })
        .catch(error => res.status(400).send(error))
};

exports.findByTitle = (req, res) => {
    return Templates.findAll({
        where: {
            title: req.params.title
        },
        attributes: { exclude: ["createdAt", "updatedAt"] }
    })
        .then(templates => {
                if(!templates){
                    return res.status(404).json({message: "user Not Found"})
                }
                return res.status(200).json(templates)
            }
        )
        .catch(error => res.status(400).send(error));
}

