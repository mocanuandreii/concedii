module.exports = (sequelize, Sequelize) => {

    const Company = sequelize.define('company', {
        id: {
            type: 'INTEGER',
            primaryKey: true
        },
        name: {
            type: 'VARCHAR'
        },
        details: {
            type: 'VARCHAR'
        },
        address: {
            type: 'VARCHAR'
        },
        CUI: {
            type: 'VARCHAR'
        },
        email: {
            type: 'VARCHAR'
        },
        phone: {
            type: 'VARCHAR'
        },
        extra1: {
            type: 'VARCHAR'
        },
        extra2: {
            type: 'VARCHAR'
        }
    });

    return Company;
}