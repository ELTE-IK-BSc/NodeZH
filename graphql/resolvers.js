const auth = require("./auth");
const db = require("../models");
const { where } = require("sequelize");
const { Sequelize, sequelize } = db;
const { ValidationError, DatabaseError, Op } = Sequelize;
// TODO: Importáld a modelleket
const { Expert, Presentation, Visitor } = db;

module.exports = {
    Query: {
        // Elemi Hello World! példa:
        helloWorld: () => "Hello World!",

        // Példa paraméterezésre:
        helloName: (_, { name }) => `Hello ${name}!`,

        // TODO: Dolgozd ki a további resolver-eket a schema-val összhangban

        // 9. feladat
        presentations: async () => await Presentation.findAll(),
        // 10. feladat
        presentation: async (_, { id }) => await Presentation.findByPk(id),
        // 14. feladat
        visitors: async (_, { min, max }) => {
            if (!min && !max) {
                return await Visitor.findAll();
            }
            if (!min) {
                return await Visitor.findAll({ where: { level: { [Op.lt]: max } } });
            }
            if (!max) {
                return await Visitor.findAll({ where: { level: { [Op.gt]: min } } });
            }

            return await Visitor.findAll({ where: { level: { [Op.between]: [min, max] } } })
        },
    },
    Presentation: {
        // 11. feladat
        presenter: async (presentation) => await Expert.findByPk(presentation.PresenterId),
        // 12. feladat
        attendance: async (presentation) => presentation.countVisitors(),

    },
    Mutation: {
        // 13. feladat
        addViewer: async (_, { visitorName, presentationTitle }) => {
            const visitor = await Visitor.findOne({ where: { name: visitorName } });
            const presentation = await Presentation.findOne({ where: { title: presentationTitle } });

            if (!visitor) {
                return 'VISITOR NOT FOUND';
            }
            if (!presentation) {
                return 'PRESENTATION NOT FOUND';
            }

            if (presentation.hasVisitor(visitor)) {
                return 'ALREADY REGISTERED';
            }

            await presentation.addVisitro(visitor);

            return 'SUCCESS';
        },
        // 15. feladat
        cancelPresentation: async (_, { id }) => {

            const presentation = await Presentation.findByPk(id);
            if (!presentation) {
                return 'NOT FOUND';
            }
            await presentation.destroy();
            return 'DELETED';

        },

    }
};
