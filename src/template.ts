import { Article } from './types';

export function createArticleTemplate(article: Article) {
  const articleTemplate = `
    
        <div class="list-group-item">
        <h1>${article.title}</h1>
        <p>${article.content}</p>
        </div>
    `;

  return createDocumentTemplate(articleTemplate);
}

export function createBoardTemplate(articles: Article[]) {
  const articleTemplates = articles.map((article) => {
    return `
            <div class="article" style="padding: 5px;">
                <a href="./view/${article.id}">${article.title}</a>
            </div>
        `;
  });

  const boardTemplate = `
<div class="board">
  <div class="content-title"> 제목 </div>
  ${articleTemplates.join('')}
</div>
<div class="btn" margin: 10%;">
    <a class="write-button"  href="./write">Write</a>
</div>
    `;

  return createDocumentTemplate(boardTemplate);
}

export function createWriteArticleTemplate() {
  const writeTemplate = `
<form action="./write" class="input-form" method="POST">
<input type="text" class="input-title" name="title" placeholder="Title" />
<textarea name="content" class="input-textarea" placeholder="Content"></textarea>
<input type="submit" class="write-button write-input-btn"> </input>
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
<div class="main-container">
<div class="title">XSS Board</div>
${children}
</div>

</body>

</html>

    `;
}

function createDocumentCSS() {
  return `
        body {
            background-color: white;
        }
        .board {
            font-size: 13px;
            width: 100%;
            border-top: 1px solid #ccc;
            border-bottom: 1px solid #ccc;
            display: flex;
           flex-direction: column;
            margin-bottom: 10px;
        }
        .article {
            padding-left: 28px;
            padding-right: 14px;
            border-top: 1px solid #e7e7e7;
            text-align: left;

            color: #333;
           display: inline-block;
           line-height: 1.4;
            word-break: break-all;
            vertical-align: middle;
        }
        .write-button {
            background-color: gray;
            color: #fff;
            display: inline-block;
            padding: 5px 10px;
            font-size: 15px;
            font-weight: 400;
            text-align: center;
            white-space: nowrap;
            vertical-align: middle;

        }
        .write-input-btn {
            width: 100px;
        }
        .main-container{
            padding: 80px 30px;
        }
        .title{
            font-size: 30px;
            text-align: center;
            margin-bottom: 20px;
        }
        .content-title{
            font-size: 20px;
        }

        .input-form{
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .input-title{
            width: 500px;
            margin-bottom: 10px;
        }
        .input-textarea{
            width: 500px;
            margin-bottom: 10px;
        }
    `;
}
