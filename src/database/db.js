const path = require('path');
const Article = require('./operators/article');
const States = require('./operators/states');
const BillTypes = require('./operators/bill-types');
const BankAccounts = require('./operators/bank-accounts');
const CompanyProfiles = require('./operators/company-profiles');
const Buyers = require('./operators/buyers');
const Invoices = require('./operators/invoices');
const PurchaseEntries = require('./operators/purchase-entries');
const InvoiceSummaries = require('./operators/invoice-summaries');

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
  States(Sequelize, sequelizeConnetion).init(mainWindow, ipcMain);
  BillTypes(Sequelize, sequelizeConnetion).init(mainWindow, ipcMain);
  BankAccounts(Sequelize, sequelizeConnetion).init(mainWindow, ipcMain);
  CompanyProfiles(Sequelize, sequelizeConnetion).init(mainWindow, ipcMain);
  Buyers(Sequelize, sequelizeConnetion).init(mainWindow, ipcMain);
  Invoices(Sequelize, sequelizeConnetion).init(mainWindow, ipcMain);
  PurchaseEntries(Sequelize, sequelizeConnetion).init(mainWindow, ipcMain);
  InvoiceSummaries(Sequelize, sequelizeConnetion).init(mainWindow, ipcMain);
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
