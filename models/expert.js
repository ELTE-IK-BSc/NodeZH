"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Expert extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Expert.init(
        {
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            job: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Expert",
        }
    );
    return Expert;
};
