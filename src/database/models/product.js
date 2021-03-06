'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Brand,{
        as:'brand',
        foreignKey:'brandId'
      })

      Product.belongsTo(models.Color,{
        as:'color',
        foreignKey:'colorId'
      })

      Product.belongsTo(models.Category,{
        as:'category',
        foreignKey:'categoryId'
      })

    }
  }
  Product.init({
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    stock: DataTypes.INTEGER,
    stock_min: DataTypes.INTEGER,
    stock_max: DataTypes.INTEGER,
    description: DataTypes.STRING,
    extended_description: DataTypes.STRING,
    image: DataTypes.STRING,
    section: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    colorId: DataTypes.INTEGER,
    brandId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};