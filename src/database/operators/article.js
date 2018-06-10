const schema = 'article';

const articleModule = (orm, connection) => {
  let articleSchema;

  function getArticleSchemaReference() {
    let articleSchemaRef;

    if (connection.isDefined(schema)) {
      try {
        articleSchemaRef = connection.model(schema);
      } catch (error) {
        articleSchemaRef = createArticle();
      }
    } else {
      articleSchemaRef = createArticle();
    }

    return articleSchemaRef;
  }

  function createArticle() {
    return connection.define(schema, {
      title: orm.STRING,
      body: orm.TEXT
    });
  }

  function insertArticle(article) {
    return connection.sync().then(() => {
      articleSchema.create(article);
    });
  }

  function getArticles() {
    return connection.sync().then(() => {
      return articleSchema.findAll();
    });
  }

  function registerSubscriberEvents(ipcMain) {
    ipcMain.on('insertArticle', (event, data) => {
      insertArticle(data);
    });
  }

  function registerPublisherEvents(mainWindow, ipcMain) {
    ipcMain.on('loadArticles', () => {
      getArticles().then(articles => {
        mainWindow.webContents.send(
          'articlesLoaded',
          JSON.parse(JSON.stringify(articles))
        );
      });
    });
  }

  function init(mainWindow, ipcMain) {
    // Initiate article schema
    articleSchema = getArticleSchemaReference();

    // subscriber events
    registerSubscriberEvents(ipcMain);

    // publisher events
    registerPublisherEvents(mainWindow, ipcMain);
  }

  return {
    init: init
  };
};

module.exports = articleModule;
