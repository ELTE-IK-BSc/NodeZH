'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Visitor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Visitor.init({
    name: DataTypes.STRING,
    level: DataTypes.INTEGER,
    vip: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Visitor',
  });
  return Visitor;
};