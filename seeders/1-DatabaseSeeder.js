"use strict";

// Faker dokumentáció, API referencia: https://fakerjs.dev/guide/#node-js
const { faker } = require("@faker-js/faker");
const chalk = require("chalk");
// TODO: Importáld be a modelleket
const { Expert, Presentation, Visitor } = require("../models");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        // TODO: Ide dolgozd ki a seeder tartalmát:
        const expertCount = faker.number.int({ min: 3, max: 6 });
        const experts = [];

        for (let i = 0; i < expertCount; i++) {
            experts.push(
                await Expert.create({
                    name: faker.person.fullName(),
                    email: faker.internet.email(),
                    job: faker.datatype.boolean() ? faker.person.jobTitle() : null,
                })
            );
        }
        console.log(chalk.green(`${experts.length} Expert létrehozva.`));

        const presentations = [];
        for (const expert of experts) {
            const presentationCount = faker.number.int({ min: 3, max: 6 });

            for (let i = 0; i < presentationCount; i++) {
                const presentation = await expert.createPresentation(
                    {
                        title: faker.lorem.words(),
                        starttime: faker.date.recent(),
                        length: faker.number.int({ min: 20, max: 150 }),
                    }
                )
                presentations.push(presentation);
            }
            console.log(chalk.blue(`Expert #${expert.id} | ${presentationCount} Presentation létrehozva.`));
        }
        const visitors = [];

        const visitorCount = faker.number.int({ min: 20, max: 50 });

        for (let i = 0; i < visitorCount; i++) {
            visitors.push(await Visitor.create(
                {
                    name: faker.person.fullName(),
                    level: faker.number.int({ min: 1, max: 5 }),
                    vip: faker.datatype.boolean(),
                }
            ));
        }
        console.log(chalk.cyan(`${visitorCount} Visitor létrehozva.`));

        for (const presentation of presentations) {

            const currvis = faker.helpers.arrayElements(visitors);
            presentation.addVisitors(currvis);

            console.log(chalk.yellow(`Presentation #${presentation.id} | ${currvis.length} Visitor hozzáadva.`));
        }


        console.log(chalk.green("A DatabaseSeeder lefutott"));
    },

    // Erre alapvetően nincs szükséged, mivel a parancsok úgy vannak felépítve,
    // hogy tiszta adatbázist generálnak, vagyis a korábbi adatok enélkül is elvesznek
    down: async (queryInterface, Sequelize) => { },
};
