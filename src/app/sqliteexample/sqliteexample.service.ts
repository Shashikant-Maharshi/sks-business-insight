import { Injectable } from '@angular/core';
import { Article } from './article';

declare let electron: any;

@Injectable()
export class SqliteexampleService {
  ipc: any;

  constructor() {
    this.ipc = electron.ipcRenderer;
  }

  getArticles(compRef: any): void {
    this.ipc.send('loadArticles');
    this.ipc.on('articlesLoaded', (event, result) => {
      compRef.articles = result;
      document.getElementById('articlePage').click();
    });
  }

  saveArticle(article: Article): void {
    this.ipc.send('insertArticle', article);
  }
}
