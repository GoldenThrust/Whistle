import fs from 'fs';
import path from 'path';

// Function to get the list of available articles for a category
export async function getArticleList(category) {
  const articlesDirectory = path.join(process.cwd(), 'src/content', category);
  
  try {
    const fileNames = await fs.promises.readdir(articlesDirectory);
    
    // Filter out non-markdown files and map to article info
    const articleList = fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(fileName => {
        // Remove the .md extension
        const slug = fileName.replace(/\.md$/, '');
        
        // Return article info
        return {
          slug,
          title: formatTitle(slug),
          path: `/${category}/${slug}`
        };
      });
      
    return articleList;
  } catch (error) {
    console.error(`Error loading article list for ${category}:`, error);
    return [];
  }
}

// Function to get the content of a specific article
export async function getArticleContent(category, slug) {
  const filePath = path.join(process.cwd(), 'src/content', category, `${slug}.md`);
  
  try {
    const fileContent = await fs.promises.readFile(filePath, 'utf8');
    return fileContent;
  } catch (error) {
    console.error(`Error loading article content for ${slug}:`, error);
    return null;
  }
}

// Helper function to format slug as a title (replace hyphens with spaces and capitalize words)
function formatTitle(slug) {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}