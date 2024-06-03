'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Viewings", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            VisitorId: {
                allowNull: false,
                references: {
                    model: 'visitors',
                    key: 'id',
                },
                onDelete: 'cascade',
                type: Sequelize.INTEGER,
            },
            PresentationId: {
                allowNull: false,
                references: {
                    model: 'presentations',
                    key: 'id',
                },
                onDelete: 'cascade',
                type: Sequelize.INTEGER,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Viewings");

    }
};
