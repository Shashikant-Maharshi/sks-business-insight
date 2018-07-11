const schema = 'CompanyProfiles';

const companyProfileModule = (orm, connection) => {
  let companyProfileSchema;

  function getCompanyProfileSchemaReference() {
    let companyProfileSchemaRef;

    if (connection.isDefined(schema)) {
      try {
        companyProfileSchemaRef = connection.model(schema);
      } catch (error) {
        companyProfileSchemaRef = createCompanyProfile();
      }
    } else {
      companyProfileSchemaRef = createCompanyProfile();
    }

    return companyProfileSchemaRef;
  }

  function createCompanyProfile() {
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
      fkIdState: orm.INTEGER,
      fkIdBankAccount: orm.INTEGER
    });
  }

  function insertCompanyProfile(companyProfile) {
    return connection.sync().then(() => {
      companyProfileSchema.create(companyProfile);
    });
  }

  function updateCompanyProfile(companyProfile) {
    return connection.sync().then(() => {
      return companyProfileSchema.update(
        {
          name: companyProfile.name,
          address: companyProfile.address,
          gst: companyProfile.gst,
          pan: companyProfile.pan,
          email: companyProfile.email,
          mobileNumber_1: companyProfile.mobileNumber_1,
          mobileNumber_2: companyProfile.mobileNumber_2,
          fkIdState: companyProfile.fkIdState,
          fkIdBankAccount: companyProfile.fkIdBankAccount
        },
        { where: { id: companyProfile.id }, returning: true, plain: true }
      );
    });
  }

  function deleteCompanyProfile(companyProfile) {
    return connection.sync().then(() => {
      return companyProfileSchema.destroy({ where: { id: companyProfile.id } });
    });
  }

  function getCompanyProfiles() {
    return connection.sync().then(() => {
      return companyProfileSchema.findAll();
    });
  }

  function getCompanyProfile(companyProfileId) {
    return connection.sync().then(() => {
      return companyProfileSchema.find({ where: { id: companyProfileId } });
    });
  }

  function registerSubscriberEvents(ipcMain) {
    ipcMain.on('insertCompanyProfile', (event, data) => {
      insertCompanyProfile(data);
    });

    ipcMain.on('updateCompanyProfile', (event, data) => {
      updateCompanyProfile(data);
    });

    ipcMain.on('deleteCompanyProfile', (event, data) => {
      deleteCompanyProfile(data);
    });
  }

  function registerPublisherEvents(mainWindow, ipcMain) {
    ipcMain.on('loadCompanyProfiles', () => {
      getCompanyProfiles().then(companyProfiles => {
        mainWindow.webContents.send(
          'companyProfilesLoaded',
          JSON.parse(JSON.stringify(companyProfiles))
        );
      });
    });

    ipcMain.on('getCompanyProfile', (event, data) => {
      getCompanyProfile(data).then(companyProfile => {
        mainWindow.webContents.send(
          'companyProfileRetrieved',
          JSON.parse(JSON.stringify(companyProfile))
        );
      });
    });
  }

  function init(mainWindow, ipcMain) {
    // Initiate companyProfile schema
    companyProfileSchema = getCompanyProfileSchemaReference();

    // subscriber events
    registerSubscriberEvents(ipcMain);

    // publisher events
    registerPublisherEvents(mainWindow, ipcMain);
  }

  return {
    init: init
  };
};

module.exports = companyProfileModule;
