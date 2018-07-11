const schema = 'InvoiceSummaries';

const invoiceSummaryModule = (orm, connection) => {
  let invoiceSummarySchema;

  function getInvoiceSummarySchemaReference() {
    let invoiceSummarySchemaRef;

    if (connection.isDefined(schema)) {
      try {
        invoiceSummarySchemaRef = connection.model(schema);
      } catch (error) {
        invoiceSummarySchemaRef = createInvoiceSummary();
      }
    } else {
      invoiceSummarySchemaRef = createInvoiceSummary();
    }

    return invoiceSummarySchemaRef;
  }

  function createInvoiceSummary() {
    return connection.define(schema, {
      id: {
        type: orm.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      subTotal: orm.DECIMAL(8, 2),
      cgstAmount: orm.DECIMAL(8, 2),
      sgstAmount: orm.DECIMAL(8, 2),
      totalTaxAmount: orm.DECIMAL(8, 2),
      totalTaxAmountInWords: orm.STRING,
      saleRoundOff: orm.DECIMAL(3, 2),
      total: orm.DECIMAL(8, 2),
      totalInWords: orm.STRING,
      fkIdInvoice: orm.BIGINT
    });
  }

  function insertInvoiceSummary(invoiceSummary) {
    return connection.sync().then(() => {
      invoiceSummarySchema.create(invoiceSummary);
    });
  }

  function updateInvoiceSummary(invoiceSummary) {
    return connection.sync().then(() => {
      return invoiceSummarySchema.update(
        {
          subTotal: invoiceSummary.subTotal,
          cgstAmount: invoiceSummary.cgstAmount,
          sgstAmount: invoiceSummary.sgstAmount,
          totalTaxAmount: invoiceSummary.totalTaxAmount,
          totalTaxAmountInWords: invoiceSummary.totalTaxAmountInWords,
          saleRoundOff: invoiceSummary.saleRoundOff,
          total: invoiceSummary.total,
          totalInWords: invoiceSummary.totalInWords,
          fkIdInvoice: invoiceSummary.fkIdInvoice
        },
        { where: { id: invoiceSummary.id }, returning: true, plain: true }
      );
    });
  }

  function deleteInvoiceSummary(invoiceSummary) {
    return connection.sync().then(() => {
      return invoiceSummarySchema.destroy({ where: { id: invoiceSummary.id } });
    });
  }

  function getInvoiceSummaries() {
    return connection.sync().then(() => {
      return invoiceSummarySchema.findAll();
    });
  }

  function getInvoiceSummary(invoiceId) {
    return connection.sync().then(() => {
      return invoiceSummarySchema.find({ where: { fkIdInvoice: invoiceId } });
    });
  }

  function registerSubscriberEvents(ipcMain) {
    ipcMain.on('insertInvoiceSummary', (event, data) => {
      insertInvoiceSummary(data);
    });

    ipcMain.on('updateInvoiceSummary', (event, data) => {
      updateInvoiceSummary(data);
    });

    ipcMain.on('deleteInvoiceSummary', (event, data) => {
      deleteInvoiceSummary(data);
    });
  }

  function registerPublisherEvents(mainWindow, ipcMain) {
    ipcMain.on('loadInvoiceSummaries', () => {
      getInvoiceSummaries().then(invoiceSummaries => {
        mainWindow.webContents.send(
          'invoiceSummariesLoaded',
          JSON.parse(JSON.stringify(invoiceSummaries))
        );
      });
    });

    ipcMain.on('getInvoiceSummary', (event, data) => {
      getInvoiceSummary(data).then(invoiceSummary => {
        mainWindow.webContents.send(
          'invoiceSummaryRetrieved',
          JSON.parse(JSON.stringify(invoiceSummary))
        );
      });
    });
  }

  function init(mainWindow, ipcMain) {
    // Initiate invoiceSummary schema
    invoiceSummarySchema = getInvoiceSummarySchemaReference();

    // subscriber events
    registerSubscriberEvents(ipcMain);

    // publisher events
    registerPublisherEvents(mainWindow, ipcMain);
  }

  return {
    init: init
  };
};

module.exports = invoiceSummaryModule;
