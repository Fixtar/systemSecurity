import express from 'express';
import { nanoid } from 'nanoid';

import { LocalStorage } from 'node-localstorage';
import {
  createArticleTemplate,
  createBoardTemplate,
  createWriteArticleTemplate,
} from './template';
import { Article } from './types';

const localStorage = new LocalStorage('./board');

const articles: Article[] = [...loadArticles()];

function main() {
  const app = express();
  app.use(express.urlencoded({ extended: true }));

  app.listen(5000, () => {
    console.log('Server started on port 5000');
  });

  app.get('/', (req, res) => {
    res.send(createBoardTemplate(articles));
  });

  app.get('/view/:id', (req, res) => {
    const { id } = req.params;
    const article = articles.find((article) => article.id === id);
    if (article) {
      res.send(createArticleTemplate(article));
    } else {
      res.send('Article not found');
    }
  });

  app.get('/write', (req, res) => {
    res.send(createWriteArticleTemplate());
  });

  app.post('/write', (req, res) => {
    const { title = 'ERROR TITLE', content = 'ERROR CONTENT' } = req.body;

    articles.push({ id: nanoid(10), title, content });
    localStorage.setItem('articles', JSON.stringify(articles));

    res.redirect('/');
  });
}

main();

function loadArticles(): Article[] {
  const articles = localStorage.getItem('articles');
  if (articles) {
    return JSON.parse(articles);
  }
  return [];
}
