module.exports = (sequelize, Sequelize) => {

    const Records = sequelize.define('records', {
        id: {
            type: 'INTEGER',
            primaryKey: true
        },
        company_id: {
            type: 'INTEGER'
        },
        user_id: {
            type: 'INTEGER'
        },
        created_at: {
            type: 'DATETIME'
        },
        period_from: {
            type: 'DATETIME'
        },
        period_to: {
            type: 'DATETIME'
        },
        workingDays:{
            type: 'INTEGER'
        }
    });

    return Records;
}