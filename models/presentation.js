"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Presentation extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.Expert, {
                foreignKey: "PresenterId",
            });
            this.belongsToMany(models.Visitor, {
                through: "Viewings",
            });
        }
    }
    Presentation.init(
        {
            title: DataTypes.STRING,
            starttime: DataTypes.DATE,
            length: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Presentation",
        }
    );
    return Presentation;
};
