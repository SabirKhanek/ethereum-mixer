import { StandardHttpSuccess, axios } from "../shared/axios_client";

function calculateReadTime(htmlString: string) {
  try {
    const wordsPerMinute = 200;

    // Use DOMParser to convert HTML string to a document
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");

    // Extract text content from the document
    const textContent = doc.body.textContent || "";

    // Count the number of words in the text
    const wordCount = textContent.split(/\s+/).length;

    // Calculate the estimated reading time in minutes
    const readTimeInMinutes = Math.ceil(wordCount / wordsPerMinute);

    return readTimeInMinutes;
  } catch (err) {
    return 5;
  }
}

export class ArticleService {
  async getArticles() {
    const response = await axios.get<StandardHttpSuccess<ArticleResponse[]>>(
      "/blogs"
    );
    console.log(response.data);
    const articles = response.data.data.map((art) => {
      const obj: Article = {
        ...art,
        createdAt: new Date(art.createdAt),
        updatedAt: new Date(art.updatedAt),
        readTime: calculateReadTime(art.body),
      };
      return obj;
    });
    return articles;
  }

  async getArticleByUri(uri: string) {
    const response = await axios.get<StandardHttpSuccess<ArticleResponse>>(
      `/blogs/${uri}`
    );
    const article = response.data.data;
    return {
      ...article,
      createdAt: new Date(article.createdAt),
      updatedAt: new Date(article.updatedAt),
      readTime: calculateReadTime(article.body),
    } as Article;
  }
}

export interface ArticleResponse {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  uri: string;
  body: string;
  shortDescription: string;
}

export interface Article {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  uri: string;
  body: string;
  shortDescription: string;
  readTime: number;
}
