module.exports = (sequelize, Sequelize) => {

    const Templates = sequelize.define('templates', {
        id: {
            type: 'INTEGER',
            primaryKey: true
        },
        title: {
            type: 'VARCHAR'
        },
        html: {
            type: 'VARCHAR'
        },
        subject: {
            type: 'VARCHAR'
        },
        updated_at: {
            type: 'VARCHAR'
        }
    });

    return Templates;
}