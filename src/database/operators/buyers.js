const schema = 'Buyers';

const buyerModule = (orm, connection) => {
  let buyerSchema;

  function getBuyerSchemaReference() {
    let buyerSchemaRef;

    if (connection.isDefined(schema)) {
      try {
        buyerSchemaRef = connection.model(schema);
      } catch (error) {
        buyerSchemaRef = createBuyer();
      }
    } else {
      buyerSchemaRef = createBuyer();
    }

    return buyerSchemaRef;
  }

  function createBuyer() {
    return connection.define(schema, {
      id: {
        type: orm.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: orm.STRING,
      address: orm.TEXT,
      gst: orm.STRING,
      pan: orm.STRING,
      email: orm.STRING,
      mobileNumber_1: orm.STRING,
      mobileNumber_2: orm.STRING,
      fkIdState: orm.INTEGER
    });
  }

  function insertBuyer(buyer) {
    return connection.sync().then(() => {
      buyerSchema.create(buyer);
    });
  }

  function updateBuyer(buyer) {
    return connection.sync().then(() => {
      return buyerSchema.update(
        {
          name: buyer.name,
          address: buyer.address,
          gst: buyer.gst,
          pan: buyer.pan,
          email: buyer.email,
          mobileNumber_1: buyer.mobileNumber_1,
          mobileNumber_2: buyer.mobileNumber_2,
          fkIdState: buyer.fkIdState
        },
        { where: { id: buyer.id }, returning: true, plain: true }
      );
    });
  }

  function deleteBuyer(buyer) {
    return connection.sync().then(() => {
      return buyerSchema.destroy({ where: { id: buyer.id } });
    });
  }

  function getBuyers() {
    return connection.sync().then(() => {
      return buyerSchema.findAll();
    });
  }

  function getBuyer(buyerId) {
    return connection.sync().then(() => {
      return buyerSchema.find({ where: { id: buyerId } });
    });
  }

  function registerSubscriberEvents(ipcMain) {
    ipcMain.on('insertBuyer', (event, data) => {
      insertBuyer(data);
    });

    ipcMain.on('updateBuyer', (event, data) => {
      updateBuyer(data);
    });

    ipcMain.on('deleteBuyer', (event, data) => {
      deleteBuyer(data);
    });
  }

  function registerPublisherEvents(mainWindow, ipcMain) {
    ipcMain.on('loadBuyers', () => {
      getBuyers().then(buyers => {
        mainWindow.webContents.send(
          'buyersLoaded',
          JSON.parse(JSON.stringify(buyers))
        );
      });
    });

    ipcMain.on('getBuyer', (event, data) => {
      getBuyer(data).then(buyer => {
        mainWindow.webContents.send(
          'buyerRetrieved',
          JSON.parse(JSON.stringify(buyer))
        );
      });
    });
  }

  function init(mainWindow, ipcMain) {
    // Initiate buyer schema
    buyerSchema = getBuyerSchemaReference();

    // subscriber events
    registerSubscriberEvents(ipcMain);

    // publisher events
    registerPublisherEvents(mainWindow, ipcMain);
  }

  return {
    init: init
  };
};

module.exports = buyerModule;
