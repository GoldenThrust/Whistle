import { getArticleList, getArticleContent } from "@/utils/markdown";
import ArticleList from "@/components/ArticleList";
import DefaultArticleStyle from "@/components/DefaultArticleStyle";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { notFound } from "next/navigation";
import Articles from "@/components/Articles";

// Generate metadata for the page
export async function generateMetadata({ params }) {
  const { slug } = params;
  return {
    title: `METAR - ${formatTitle(slug)}`,
    description: `Learn about ${formatTitle(slug)} in METAR weather reports`
  };
}

export default async function METARArticlePage({ params }) {
  const { slug } = params;
  // Get the list of all METAR articles for the sidebar
  const articles = await getArticleList('metar');
  
  // Get the content of the current article
  const content = await getArticleContent('metar', slug);
  
  // If article not found, return 404
  if (!content) {
    notFound();
  }
  
  // Extract headings from content for the article navigation
  const headings = extractHeadings(content);

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4">
      {/* Sidebar with article list */}
      <aside className="w-full md:w-64 flex-shrink-0">
        <ArticleList articles={articles} category="metar" />
      </aside>
      
      {/* Main content area */}
      <main className="flex-grow">
        <Articles articles={headings} />
        <DefaultArticleStyle>
          <MarkdownRenderer content={content} />
        </DefaultArticleStyle>
      </main>
    </div>
  );
}

// Helper function to format slug as a title
function formatTitle(slug) {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Helper function to extract headings from markdown content
function extractHeadings(content) {
  const headings = [];
  const lines = content.split('\n');
  
  for (const line of lines) {
    if (line.startsWith('# ')) {
      headings.push(line.substring(2).trim());
    } else if (line.startsWith('## ')) {
      headings.push(line.substring(3).trim());
    }
  }
  
  return headings;
}