const schema = 'PurchaseEntries';

const purchaseEntryModule = (orm, connection) => {
  let purchaseEntrySchema;

  function getPurchaseEntrySchemaReference() {
    let purchaseEntrySchemaRef;

    if (connection.isDefined(schema)) {
      try {
        purchaseEntrySchemaRef = connection.model(schema);
      } catch (error) {
        purchaseEntrySchemaRef = createPurchaseEntry();
      }
    } else {
      purchaseEntrySchemaRef = createPurchaseEntry();
    }

    return purchaseEntrySchemaRef;
  }

  function createPurchaseEntry() {
    return connection.define(schema, {
      id: {
        type: orm.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      packageNote: orm.STRING,
      description: orm.TEXT,
      hsnCode: orm.STRING,
      quantity: orm.DECIMAL(8, 2),
      rate: orm.DECIMAL(8, 2),
      discount: orm.DECIMAL(3, 2),
      purchaseAmount: orm.DECIMAL(8, 2),
      fkIdInvoice: orm.BIGINT
    });
  }

  function insertPurchaseEntry(purchaseEntry) {
    return connection.sync().then(() => {
      purchaseEntrySchema.create(purchaseEntry);
    });
  }

  function updatePurchaseEntry(purchaseEntry) {
    return connection.sync().then(() => {
      return purchaseEntrySchema.update(
        {
          packageNote: purchaseEntry.packageNote,
          description: purchaseEntry.description,
          hsnCode: purchaseEntry.hsnCode,
          quantity: purchaseEntry.quantity,
          rate: purchaseEntry.rate,
          discount: purchaseEntry.discount,
          purchaseAmount: purchaseEntry.purchaseAmount,
          fkIdInvoice: purchaseEntry.fkIdInvoice
        },
        { where: { id: purchaseEntry.id }, returning: true, plain: true }
      );
    });
  }

  function deletePurchaseEntry(purchaseEntry) {
    return connection.sync().then(() => {
      return purchaseEntrySchema.destroy({ where: { id: purchaseEntry.id } });
    });
  }

  function getPurchaseEntries(invoiceId) {
    return connection.sync().then(() => {
      return purchaseEntrySchema.findAll({
        where: { fkIdInvoice: invoiceId }
      });
    });
  }

  function registerSubscriberEvents(ipcMain) {
    ipcMain.on('insertPurchaseEntry', (event, data) => {
      insertPurchaseEntry(data);
    });

    ipcMain.on('updatePurchaseEntry', (event, data) => {
      updatePurchaseEntry(data);
    });

    ipcMain.on('deletePurchaseEntry', (event, data) => {
      deletePurchaseEntry(data);
    });
  }

  function registerPublisherEvents(mainWindow, ipcMain) {
    ipcMain.on('loadPurchaseEntries', (event, data) => {
      getPurchaseEntries(data).then(purchaseEntries => {
        mainWindow.webContents.send(
          'purchaseEntriesLoaded',
          JSON.parse(JSON.stringify(purchaseEntries))
        );
      });
    });
  }

  function init(mainWindow, ipcMain) {
    // Initiate purchaseEntry schema
    purchaseEntrySchema = getPurchaseEntrySchemaReference();

    // subscriber events
    registerSubscriberEvents(ipcMain);

    // publisher events
    registerPublisherEvents(mainWindow, ipcMain);
  }

  return {
    init: init
  };
};

module.exports = purchaseEntryModule;
