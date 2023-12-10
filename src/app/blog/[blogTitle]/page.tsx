import { ArticleService } from "@/app/services/article.service";
import { getTimeAgo } from "@/app/shared/utils/getTimeAgo";
import { notFound } from "next/navigation";

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

      <section className="max-w-xl mx-auto my-0 p-2 pb-12 font-epilogue">
        <div dangerouslySetInnerHTML={{ __html: articleObj.body }}></div>
      </section>
    </article>
  );
}
