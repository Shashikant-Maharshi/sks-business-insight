import { Component, OnInit } from '@angular/core';
import { SqliteexampleService } from './sqliteexample.service';
import { Article } from './article';

@Component({
  selector: 'app-sqliteexample',
  templateUrl: './sqliteexample.component.html',
  styleUrls: ['./sqliteexample.component.scss']
})
export class SqliteexampleComponent implements OnInit {
  article: Article;
  articles: Article[];

  constructor(private sqliteexampleService: SqliteexampleService) {
    this.resetArticle();
  }

  ngOnInit() {
    this.getArticles();
  }

  getArticles(): void {
    this.sqliteexampleService.getArticles(this);
    this.resetArticle();
  }

  resetArticle(): void {
    this.article = new Article();
  }

  saveArticle(): void {
    this.sqliteexampleService.saveArticle(this.article);
    this.getArticles();
  }
}
