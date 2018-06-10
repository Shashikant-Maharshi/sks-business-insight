const path = require('path');
const Article = require('./operators/article');

// get constructor
const Sequelize = require('sequelize');

// connect to db
const sequelizeConnetion = new Sequelize('null', 'null', 'null', {
  dialect: 'sqlite',
  storage: path.join(__dirname, 'store/database.sqlite')
});

// initiate app schemas
const init = (mainWindow, ipcMain) => {
  Article(Sequelize, sequelizeConnetion).init(mainWindow, ipcMain);
};

// close all connections
const closeSequelizeConnetion = () => {
  sequelizeConnetion.close();
};

// importable DB instance
const dbModule = () => {
  let dbOperators = {
    init: init,
    closeSequelizeConnetion: closeSequelizeConnetion
  };

  return dbOperators;
};

module.exports = dbModule;
