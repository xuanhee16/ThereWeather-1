"use strict"
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("users", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            user_Id: {
                type: Sequelize.STRING,
            },
            password: {
                type: Sequelize.STRING,
            },
            nickName: {
                type: Sequelize.STRING,
            },
            gender: {
                type: Sequelize.INTEGER,
            },
            location: {
                type: Sequelize.STRING,
            },
            user_Photo: {
                type: Sequelize.STRING,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        })
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("users")
    },
}
