import { Article } from './types';

export function createArticleTemplate(article: Article) {
  const articleTemplate = `
    
        <div>
        <h1>${article.title}</h1>
        <p>${article.content}</p>
        </div>
    `;

  return createDocumentTemplate(articleTemplate);
}

export function createBoardTemplate(articles: Article[]) {
  const articleTemplates = articles.map((article) => {
    return `
            <div class="article">
                <a href="./view/${article.id}">${article.title}</a>
            </div>
        `;
  });

  const boardTemplate = `
<div class="board">
  ${articleTemplates.join('')}
</div>
<div>
    <a id="write-button" href="./write">Write</a>
</div>
    `;

  return createDocumentTemplate(boardTemplate);
}

export function createWriteArticleTemplate() {
  const writeTemplate = `
<form action="./write" method="POST">
<input type="text" name="title" placeholder="Title" />
<textarea name="content" placeholder="Content"></textarea>
<input type="submit">Write!</input>
</form>
    `;

  return createDocumentTemplate(writeTemplate);
}

export function createDocumentTemplate(children: string) {
  return `
<html>
<head>
<meta charset="utf-8">
<title>XSS test</title>
<style>${createDocumentCSS()}</style>
</head>

<body>

${children}

</body>

</html>

    `;
}

function createDocumentCSS() {
  return `
    
        body {
            background-color: #eaeaea;
        }
    `;
}
