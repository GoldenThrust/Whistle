'use client'

export default function DefaultArticleStyle({ children }) {
  return (
    <div className="prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg mx-auto px-4 py-6 max-w-4xl">
      {children}
    </div>
  );
}