module.exports = function (sequelize, Sequelize) {

    let User = sequelize.define('user', {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        username: {
            type: Sequelize.STRING,
            notEmpty: true
        },

        password: {
            type: Sequelize.STRING,
            allowNull: false
        },

    });

    return User;

};