const schema = 'BankAccounts';

const bankAccountModule = (orm, connection) => {
  let bankAccountSchema;

  function getBankAccountSchemaReference() {
    let bankAccountSchemaRef;

    if (connection.isDefined(schema)) {
      try {
        bankAccountSchemaRef = connection.model(schema);
      } catch (error) {
        bankAccountSchemaRef = createBankAccount();
      }
    } else {
      bankAccountSchemaRef = createBankAccount();
    }

    return bankAccountSchemaRef;
  }

  function createBankAccount() {
    return connection.define(schema, {
      id: {
        type: orm.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: orm.STRING,
      accountNumber: orm.STRING,
      branch: orm.STRING,
      ifscCode: orm.STRING
    });
  }

  function insertBankAccount(bankAccount) {
    return connection.sync().then(() => {
      bankAccountSchema.create(bankAccount);
    });
  }

  function updateBankAccount(bankAccount) {
    return connection.sync().then(() => {
      return bankAccountSchema.update(
        {
          name: bankAccount.name,
          accountNumber: bankAccount.accountNumber,
          branch: bankAccount.branch,
          ifscCode: bankAccount.ifscCode
        },
        {
          where: {
            id: bankAccount.id
          },
          returning: true,
          plain: true
        }
      );
    });
  }

  function deleteBankAccount(bankAccount) {
    return connection.sync().then(() => {
      return bankAccountSchema.destroy({ where: { id: bankAccount.id } });
    });
  }

  function getBankAccounts() {
    return connection.sync().then(() => {
      return bankAccountSchema.findAll();
    });
  }

  function getBankAccount(bankAccountId) {
    return connection.sync().then(() => {
      return bankAccountSchema.find({ where: { id: bankAccountId } });
    });
  }

  function registerSubscriberEvents(ipcMain) {
    ipcMain.on('insertBankAccount', (event, data) => {
      insertBankAccount(data);
    });

    ipcMain.on('updateBankAccount', (event, data) => {
      updateBankAccount(data);
    });

    ipcMain.on('deleteBankAccount', (event, data) => {
      deleteBankAccount(data);
    });
  }

  function registerPublisherEvents(mainWindow, ipcMain) {
    ipcMain.on('loadBankAccounts', () => {
      getBankAccounts().then(bankAccounts => {
        mainWindow.webContents.send(
          'bankAccountsLoaded',
          JSON.parse(JSON.stringify(bankAccounts))
        );
      });
    });

    ipcMain.on('getBankAccount', (event, data) => {
      getBankAccount(data).then(bankAccount => {
        mainWindow.webContents.send(
          'bankAccountRetrieved',
          JSON.parse(JSON.stringify(bankAccount))
        );
      });
    });
  }

  function init(mainWindow, ipcMain) {
    // Initiate bankAccount schema
    bankAccountSchema = getBankAccountSchemaReference();

    // subscriber events
    registerSubscriberEvents(ipcMain);

    // publisher events
    registerPublisherEvents(mainWindow, ipcMain);
  }

  return {
    init: init
  };
};

module.exports = bankAccountModule;
