import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { getTimeAgo } from "../shared/utils/getTimeAgo";
import { ArticleService } from "@/app/services/article.service";
import Link from "next/link";

export default async function BlogSection() {
  const articleService = new ArticleService();
  const articles = await articleService.getArticles();
  return (
    <div className="text-grey rounded-tl-2xl rounded-tr-2xl max-w-2xl p-4 mx-auto">
      {articles
        .sort((a, b) => b.uploadTime.getTime() - a.uploadTime.getTime())
        .map((article, index) => {
          return (
            <article className={"text-grey break-words"} key={index}>
              <header>
                <div className="font-epilogue text-slate-700 text-sm mb-1 font-light">
                  {getTimeAgo(article.uploadTime)} &middot;{" "}
                  {article.readTime.toString()} minutes read
                </div>
                <Link
                  href={
                    "/blog/" + articleService.turnTitleToTitleUri(article.title)
                  }
                  className="hover:underline transition-all duration-75 hover:text-black">
                  <h1 className="text-2xl font-semibold">{article.title}</h1>
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
