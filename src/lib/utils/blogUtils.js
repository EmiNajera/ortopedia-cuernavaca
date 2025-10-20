import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getAllPostSlugs() {
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames
      .filter((name) => name.endsWith('.mdx'))
      .map((name) => name.replace(/\.mdx$/, ''));
  } catch (error) {
    console.error('Error reading posts directory:', error);
    return [];
  }
}

export function getPostBySlug(slug) {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      content,
      ...data,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

export function getAllPosts() {
  try {
    const slugs = getAllPostSlugs();
    const posts = slugs
      .map((slug) => getPostBySlug(slug))
      .filter((post) => post !== null)
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    return posts;
  } catch (error) {
    console.error('Error getting all posts:', error);
    return [];
  }
}

export function getPostsByCategory(category) {
  const allPosts = getAllPosts();
  return allPosts.filter((post) => post.category === category);
}

export function getFeaturedPosts() {
  const allPosts = getAllPosts();
  return allPosts.filter((post) => post.featured === true);
}

export function getPostsByTag(tag) {
  const allPosts = getAllPosts();
  return allPosts.filter((post) => post.tags && post.tags.includes(tag));
}

export function searchPosts(query) {
  const allPosts = getAllPosts();
  const lowercaseQuery = query.toLowerCase();

  return allPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(lowercaseQuery) ||
      post.excerpt.toLowerCase().includes(lowercaseQuery) ||
      (post.tags && post.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery))),
  );
}
