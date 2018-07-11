const schema = 'Invoices';

const invoiceModule = (orm, connection) => {
  let invoiceSchema;

  function getInvoiceSchemaReference() {
    let invoiceSchemaRef;

    if (connection.isDefined(schema)) {
      try {
        invoiceSchemaRef = connection.model(schema);
      } catch (error) {
        invoiceSchemaRef = createInvoice();
      }
    } else {
      invoiceSchemaRef = createInvoice();
    }

    return invoiceSchemaRef;
  }

  function createInvoice() {
    return connection.define(schema, {
      id: {
        type: orm.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      fkIdBillType: orm.INTEGER,
      fkIdCompanyProfile: orm.INTEGER,
      fkIdBuyer: orm.INTEGER,
      invoiceNumber: orm.STRING,
      invoiceDate: orm.DATE,
      eWayBillNumber: orm.STRING,
      deliveryNote: orm.STRING,
      paymentMode: orm.STRING,
      supplierReference: orm.STRING,
      otherReferences: orm.STRING,
      despatchDocumentNumber: orm.STRING,
      deliveryNoteDate: orm.DATE,
      despatchThrough: orm.STRING,
      destination: orm.STRING,
      termsOfDelivery: orm.STRING,
      transportCharges: orm.DECIMAL(8, 2),
      cgstRate: orm.DECIMAL(3, 2),
      sgstRate: orm.DECIMAL(3, 2)
    });
  }

  function insertInvoice(invoice) {
    return connection.sync().then(() => {
      invoiceSchema.create(invoice);
    });
  }

  function updateInvoice(invoice) {
    return connection.sync().then(() => {
      return invoiceSchema.update(
        {
          fkIdBillType: invoice.fkIdBillType,
          fkIdCompanyProfile: invoice.fkIdCompanyProfile,
          fkIdBuyer: invoice.fkIdBuyer,
          invoiceNumber: invoice.invoiceNumber,
          invoiceDate: invoice.invoiceDate,
          eWayBillNumber: invoice.eWayBillNumber,
          deliveryNote: invoice.deliveryNote,
          paymentMode: invoice.paymentMode,
          supplierReference: invoice.supplierReference,
          otherReferences: invoice.otherReferences,
          despatchDocumentNumber: invoice.despatchDocumentNumber,
          deliveryNoteDate: invoice.deliveryNoteDate,
          despatchThrough: invoice.despatchThrough,
          destination: invoice.destination,
          termsOfDelivery: invoice.termsOfDelivery,
          transportCharges: invoice.transportCharges,
          cgstRate: invoice.cgstRate,
          sgstRate: invoice.sgstRate
        },
        { where: { id: invoice.id }, returning: true, plain: true }
      );
    });
  }

  function deleteInvoice(invoice) {
    return connection.sync().then(() => {
      return invoiceSchema.destroy({ where: { id: invoice.id } });
    });
  }

  function getInvoices() {
    return connection.sync().then(() => {
      return invoiceSchema.findAll();
    });
  }

  function getInvoice(invoiceId) {
    return connection.sync().then(() => {
      return invoiceSchema.find({ where: { id: invoiceId } });
    });
  }

  function registerSubscriberEvents(ipcMain) {
    ipcMain.on('insertInvoice', (event, data) => {
      insertInvoice(data);
    });

    ipcMain.on('updateInvoice', (event, data) => {
      updateInvoice(data);
    });

    ipcMain.on('deleteInvoice', (event, data) => {
      deleteInvoice(data);
    });
  }

  function registerPublisherEvents(mainWindow, ipcMain) {
    ipcMain.on('loadInvoices', () => {
      getInvoices().then(invoices => {
        mainWindow.webContents.send(
          'invoicesLoaded',
          JSON.parse(JSON.stringify(invoices))
        );
      });
    });

    ipcMain.on('getInvoice', (event, data) => {
      getInvoice(data).then(invoice => {
        mainWindow.webContents.send(
          'invoiceRetrieved',
          JSON.parse(JSON.stringify(invoice))
        );
      });
    });
  }

  function init(mainWindow, ipcMain) {
    // Initiate invoice schema
    invoiceSchema = getInvoiceSchemaReference();

    // subscriber events
    registerSubscriberEvents(ipcMain);

    // publisher events
    registerPublisherEvents(mainWindow, ipcMain);
  }

  return {
    init: init
  };
};

module.exports = invoiceModule;
