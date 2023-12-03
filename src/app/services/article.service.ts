export function calculateReadTime(htmlString: string) {
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
  baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  async getArticles() {
    const timestamp = new Date().getTime();
    const response = await fetch(
      `${this.baseUrl}/blogs?timestamp=${timestamp}`
    );
    const data = (await response.json()).data;

    const articles = data.map((art: ArticleResponse) => ({
      ...art,
      createdAt: new Date(art.createdAt),
      updatedAt: new Date(art.updatedAt),
      readTime: calculateReadTime(art.body),
    })) as Article[];

    return articles;
  }

  async getArticleByUri(uri: string) {
    const timestamp = new Date().getTime();
    const response = await fetch(
      `${this.baseUrl}/blogs/${uri}?timestamp=${timestamp}`
    );
    const data = (await response.json()).data;

    const article = {
      ...data,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
      readTime: calculateReadTime(data.body),
    } as Article;

    return article;
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
