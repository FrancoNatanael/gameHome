'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.DECIMAL
      },
      stock: {
        type: Sequelize.INTEGER
      },
      stock_min: {
        type: Sequelize.INTEGER
      },
      stock_max: {
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING
      },
      extended_description: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      section: {
        type: Sequelize.STRING
      },
      categoryId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Categories',
          key: 'id'
        }
      },
      colorId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Colors',
          key: 'id'
        }
      },
      brandId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Brands',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};