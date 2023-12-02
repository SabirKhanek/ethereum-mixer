import { ArticleService } from "@/app/services/article.service";
import { getTimeAgo } from "@/app/shared/utils/getTimeAgo";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import "./index.css";
export default async function BlogArticle({
  params,
}: {
  params: { blogTitle: string };
}) {
  const articleService = new ArticleService();
  const articleObj = await articleService.getArticleByUri(params.blogTitle);

  if (!articleObj) return notFound();
  return (
    <article className="max-w-5xl mx-auto my-0">
      <header className="mb-10">
        <div className="font-epilogue text-slate-700 text-sm mb-1 font-light text-center">
          {getTimeAgo(articleObj.createdAt)} &middot;{" "}
          {articleObj.readTime.toString()} minutes read
        </div>
        <h1 className="break-words text-6xl text-center">{articleObj.title}</h1>
      </header>

      <section className="max-w-xl mx-auto my-0 p-2 pb-12">
        <Markdown
          rehypePlugins={[rehypeRaw]}
          remarkPlugins={[remarkGfm]}
          className="font-epilogue text-base"
        >
          {articleObj.body.replace(/\n/gi, "\n").replace(/\n/gi, "<br/>")}
        </Markdown>
      </section>
    </article>
  );
}
