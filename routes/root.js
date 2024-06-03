const { StatusCodes } = require("http-status-codes");
const S = require("fluent-json-schema");
const db = require("../models");
const { where } = require("sequelize");
const { SELECT } = require("sequelize/lib/query-types");
const { Sequelize, sequelize } = db;
const { ValidationError, DatabaseError, Op } = Sequelize;
// TODO: Importáld a modelleket
const { Expert, Presentation, Visitor } = db;

module.exports = function (fastify, opts, next) {
    // http://127.0.0.1:4000/
    fastify.get("/", async (request, reply) => {
        reply.send({ message: "Gyökér végpont" });

        // NOTE: A send alapból 200 OK állapotkódot küld, vagyis az előző sor ugyanaz, mint a következő:
        // reply.status(200).send({ message: "Gyökér végpont" });

        // A 200 helyett használhatsz StatusCodes.OK-ot is (így szemantikusabb):
        // reply.status(StatusCodes.OK).send({ message: "Gyökér végpont" });
    });

    // http://127.0.0.1:4000/auth-protected
    fastify.get("/auth-protected", { onRequest: [fastify.auth] }, async (request, reply) => {
        reply.send({ user: request.user });
    });

    // 3. feladat
    fastify.get("/vips", async (request, reply) => {
        const vips = await Visitor.findAll({ where: { vip: true }, order: [['name', 'ASC']] });
        reply.send(vips.map(vip => ({ id: vip.id, name: vip.name, level: vip.level })));
    });

    // 4. feladat
    fastify.get("/visitors/:id",
        {
            schema: {
                params: {
                    type: 'object',
                    required: ['id'],
                    properties: {
                        id: { type: 'integer' }
                    }
                }
            }
        },
        async (request, reply) => {
            const { id } = request.params;
            const visitor = await Visitor.findByPk(id);

            if (!visitor) {
                return reply.status(StatusCodes.NOT_FOUND).send();
            }


            reply.send({
                id: visitor.id,
                name: visitor.name,
                level: visitor.level,
                vip: visitor.vip,
                createdAt: visitor.createdAt,
                updatedAt: visitor.updatedAt,
                presentationCount: await visitor.countPresentations(),
            });
        });



    next();
};

module.exports.autoPrefix = "/";
