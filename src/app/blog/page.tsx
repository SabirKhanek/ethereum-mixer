"use server";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { getTimeAgo } from "../shared/utils/getTimeAgo";
import {
  Article,
  ArticleResponse,
  ArticleService,
  calculateReadTime,
} from "@/app/services/article.service";
import Link from "next/link";

export default async function BlogSection() {
  const articleService = new ArticleService();
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const response = await fetch(`${baseUrl}/blogs`, { cache: "no-store" });
  const data = (await response.json()).data;

  const articles = data.map((art: ArticleResponse) => ({
    ...art,
    createdAt: new Date(art.createdAt),
    updatedAt: new Date(art.updatedAt),
    readTime: calculateReadTime(art.body),
  })) as Article[];

  return (
    <div className="text-grey rounded-tl-2xl rounded-tr-2xl max-w-2xl p-4 mx-auto">
      {articles
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        .map((article, index) => {
          return (
            <article className={"text-grey break-words"} key={index}>
              <header>
                <div className="font-epilogue text-slate-700 text-sm mb-1 font-light">
                  {getTimeAgo(article.createdAt)} &middot;{" "}
                  {article.readTime.toString()} minutes read
                </div>
                <Link
                  href={"/blog/" + article.uri}
                  className="hover:underline transition-all duration-75 hover:text-black"
                >
                  <h1 className="text-2xl font-medium">{article.title}</h1>
                </Link>
              </header>

              <section>
                <p className="font-epilogue text-base">
                  {article.shortDescription}
                </p>
              </section>

              {/* <section>
                <Markdown
                  rehypePlugins={[rehypeRaw]}
                  remarkPlugins={[remarkGfm]}
                  className="font-epilogue text-base">
                  {article.body.replace(/\n/gi, "\n").replace(/\n/gi, "<br/>")}
                </Markdown>
              </section> */}

              {index !== articles.length - 1 && <div className="my-16"></div>}
            </article>
          );
        })}
    </div>
  );
}
