'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FileText } from 'lucide-react';

const ArticleList = ({ articles, category }) => {
  const pathname = usePathname();
  
  return (
    <div className="mb-8 rounded-lg border dark:border-gray-700 overflow-hidden">
      <div className="p-3 bg-gray-50 dark:bg-gray-800 flex items-center gap-2">
        <FileText className="text-blue-600 dark:text-blue-400" size={20} />
        <h3 className="font-medium">Articles</h3>
      </div>
      
      <ul className="divide-y dark:divide-gray-700">
        {articles.map((article) => (
          <li key={article.slug}>
            <Link
              href={`/learn/${category}/${article.slug}`}
              className={`block px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                pathname.includes(article.slug) 
                  ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500'
                  : ''
              }`}
            >
              <span className="block text-sm">{article.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArticleList;