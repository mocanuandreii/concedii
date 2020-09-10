module.exports = (sequelize, Sequelize) => {

    const Employee = sequelize.define('employee', {
        id: {
            type: 'INTEGER',
            primaryKey: true
        },
        company_id: {
            type: 'INTEGER'
        },
        username: {
            type: 'VARCHAR'
        },
        first_name: {
            type: 'VARCHAR'
        },
        last_name: {
            type: 'VARCHAR'
        },
        address: {
            type: 'VARCHAR'
        },
        email: {
            type: 'VARCHAR'
        },
        CNP: {
            type: 'VARCHAR'
        },
        role: {
            type: 'VARCHAR'
        },
        password: {
            type: 'VARCHAR'
        },
        extra1: {
            type: 'VARCHAR'
        },
        extra2: {
            type: 'VARCHAR'
        },
        vacationDays: {
            type: 'INTEGER'
        }
    });

    return Employee;
}