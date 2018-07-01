const schema = 'state';

const stateModule = (orm, connection) => {
  let stateSchema;

  function getStateSchemaReference() {
    let stateSchemaRef;

    if (connection.isDefined(schema)) {
      try {
        stateSchemaRef = connection.model(schema);
      } catch (error) {
        stateSchemaRef = createState();
      }
    } else {
      stateSchemaRef = createState();
    }

    return stateSchemaRef;
  }

  function createState() {
    return connection.define(schema, {
      id: {
        type: orm.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: orm.STRING,
      code: orm.INTEGER
    });
  }

  function insertState(state) {
    return connection.sync().then(() => {
      stateSchema.create(state);
    });
  }

  function updateState(state) {
    return connection.sync().then(() => {
      return stateSchema.update(
        {
          name: state.name,
          code: state.code
        },
        {
          where: {
            id: state.id
          },
          returning: true,
          plain: true
        }
      );
    });
  }

  function deleteState(state) {
    return connection.sync().then(() => {
      return stateSchema.destroy({ where: { id: state.id } });
    });
  }

  function getStates() {
    return connection.sync().then(() => {
      return stateSchema.findAll();
    });
  }

  function registerSubscriberEvents(ipcMain) {
    ipcMain.on('insertState', (event, data) => {
      insertState(data);
    });

    ipcMain.on('updateState', (event, data) => {
      updateState(data);
    });

    ipcMain.on('deleteState', (event, data) => {
      deleteState(data);
    });
  }

  function registerPublisherEvents(mainWindow, ipcMain) {
    ipcMain.on('loadStates', () => {
      getStates().then(states => {
        mainWindow.webContents.send(
          'statesLoaded',
          JSON.parse(JSON.stringify(states))
        );
      });
    });
  }

  function init(mainWindow, ipcMain) {
    // Initiate state schema
    stateSchema = getStateSchemaReference();

    // subscriber events
    registerSubscriberEvents(ipcMain);

    // publisher events
    registerPublisherEvents(mainWindow, ipcMain);
  }

  return {
    init: init
  };
};

module.exports = stateModule;
