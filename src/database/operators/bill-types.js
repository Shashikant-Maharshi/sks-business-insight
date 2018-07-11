const schema = 'BillTypes';

const billTypeModule = (orm, connection) => {
  let billTypeSchema;

  function getBillTypeSchemaReference() {
    let billTypeSchemaRef;

    if (connection.isDefined(schema)) {
      try {
        billTypeSchemaRef = connection.model(schema);
      } catch (error) {
        billTypeSchemaRef = createBillType();
      }
    } else {
      billTypeSchemaRef = createBillType();
    }

    return billTypeSchemaRef;
  }

  function createBillType() {
    return connection.define(schema, {
      id: {
        type: orm.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      type: orm.STRING
    });
  }

  function insertBillType(billType) {
    return connection.sync().then(() => {
      billTypeSchema.create(billType);
    });
  }

  function updateBillType(billType) {
    return connection.sync().then(() => {
      return billTypeSchema.update(
        { type: billType.type },
        { where: { id: billType.id }, returning: true, plain: true }
      );
    });
  }

  function deleteBillType(billType) {
    return connection.sync().then(() => {
      return billTypeSchema.destroy({ where: { id: billType.id } });
    });
  }

  function getBillTypes() {
    return connection.sync().then(() => {
      return billTypeSchema.findAll();
    });
  }

  function getBillType(billTypeId) {
    return connection.sync().then(() => {
      return billTypeSchema.find({ where: { id: billTypeId } });
    });
  }

  function registerSubscriberEvents(ipcMain) {
    ipcMain.on('insertBillType', (event, data) => {
      insertBillType(data);
    });

    ipcMain.on('updateBillType', (event, data) => {
      updateBillType(data);
    });

    ipcMain.on('deleteBillType', (event, data) => {
      deleteBillType(data);
    });
  }

  function registerPublisherEvents(mainWindow, ipcMain) {
    ipcMain.on('loadBillTypes', () => {
      getBillTypes().then(billTypes => {
        mainWindow.webContents.send(
          'billTypesLoaded',
          JSON.parse(JSON.stringify(billTypes))
        );
      });
    });

    ipcMain.on('getBillType', (event, data) => {
      getBillType(data).then(billType => {
        mainWindow.webContents.send(
          'billTypeRetrieved',
          JSON.parse(JSON.stringify(billType))
        );
      });
    });
  }

  function init(mainWindow, ipcMain) {
    // Initiate billType schema
    billTypeSchema = getBillTypeSchemaReference();

    // subscriber events
    registerSubscriberEvents(ipcMain);

    // publisher events
    registerPublisherEvents(mainWindow, ipcMain);
  }

  return {
    init: init
  };
};

module.exports = billTypeModule;
