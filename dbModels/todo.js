module.exports = function(sequelize, Sequelize) {

    let Todo = sequelize.define('todo', {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        username: {
            type: Sequelize.STRING,
            notEmpty: true
        },

        description: {
            type: Sequelize.STRING,
            allowNull: false
        }

    });

    return Todo;

};