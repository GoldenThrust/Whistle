import { getArticleList } from "@/utils/markdown";
import ArticleList from "@/components/ArticleList";
import DefaultArticleStyle from "@/components/DefaultArticleStyle";

export default async function METARLearnPage() {
  // Get the list of available METAR articles
  const articles = await getArticleList('metar');

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4">
      {/* Sidebar with article list */}
      <aside className="w-full md:w-64 flex-shrink-0">
        <ArticleList articles={articles} category="metar" />
      </aside>
      
      {/* Main content area */}
      <main className="flex-grow">
        <DefaultArticleStyle>
          <h1 className="text-3xl font-bold mb-6">METAR Documentation</h1>
          
          <p className="mb-6 text-lg">
            Welcome to the METAR learning section. METAR (Meteorological Terminal Air Report) is a format for reporting weather information used by pilots, air traffic controllers, and meteorologists.
          </p>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md mb-6 border-l-4 border-blue-500">
            <h3 className="font-medium text-lg mb-2">Get Started</h3>
            <p>Select an article from the sidebar to start learning about METAR codes and their interpretation.</p>
          </div>
        </DefaultArticleStyle>
      </main>
    </div>
  );
}
