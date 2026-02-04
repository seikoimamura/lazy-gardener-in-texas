import { createClient } from '@libsql/client';

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

// Initialize database schema
export async function initializeDatabase() {
  await client.execute(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      excerpt TEXT,
      content TEXT NOT NULL,
      cover_image TEXT,
      tags TEXT,
      status TEXT DEFAULT 'draft',
      published_at TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Add status column if it doesn't exist (for existing databases)
  try {
    await client.execute(`ALTER TABLE posts ADD COLUMN status TEXT DEFAULT 'draft'`);
  } catch (e) {
    // Column already exists, ignore error
  }
}

export interface DBPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  cover_image: string | null;
  tags: string | null;
  status: 'draft' | 'published';
  published_at: string;
  created_at: string;
  updated_at: string;
}

// Get all posts (for admin - includes drafts)
export async function getAllPosts(): Promise<DBPost[]> {
  const result = await client.execute(
    'SELECT * FROM posts ORDER BY published_at DESC'
  );
  return result.rows as unknown as DBPost[];
}

// Get only published posts (for public site)
export async function getPublishedPosts(): Promise<DBPost[]> {
  const result = await client.execute(
    "SELECT * FROM posts WHERE status = 'published' ORDER BY published_at DESC"
  );
  return result.rows as unknown as DBPost[];
}

// Get post by slug (for admin - any status)
export async function getPostBySlug(slug: string): Promise<DBPost | null> {
  const result = await client.execute({
    sql: 'SELECT * FROM posts WHERE slug = ?',
    args: [slug],
  });
  return (result.rows[0] as unknown as DBPost) || null;
}

// Get published post by slug (for public site)
export async function getPublishedPostBySlug(slug: string): Promise<DBPost | null> {
  const result = await client.execute({
    sql: "SELECT * FROM posts WHERE slug = ? AND status = 'published'",
    args: [slug],
  });
  return (result.rows[0] as unknown as DBPost) || null;
}

// Get recent published posts (for public site)
export async function getRecentPosts(limit: number = 3): Promise<DBPost[]> {
  const result = await client.execute({
    sql: "SELECT * FROM posts WHERE status = 'published' ORDER BY published_at DESC LIMIT ?",
    args: [limit],
  });
  return result.rows as unknown as DBPost[];
}

export async function createPost(post: {
  slug: string;
  title: string;
  excerpt?: string;
  content: string;
  cover_image?: string;
  tags?: string[];
  status?: 'draft' | 'published';
  published_at: string;
}): Promise<DBPost> {
  const result = await client.execute({
    sql: `INSERT INTO posts (slug, title, excerpt, content, cover_image, tags, status, published_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      post.slug,
      post.title,
      post.excerpt || null,
      post.content,
      post.cover_image || null,
      post.tags ? JSON.stringify(post.tags) : null,
      post.status || 'draft',
      post.published_at,
    ],
  });
  
  return (await getPostBySlug(post.slug))!;
}

export async function updatePost(
  slug: string,
  post: {
    title?: string;
    excerpt?: string;
    content?: string;
    cover_image?: string;
    tags?: string[];
    status?: 'draft' | 'published';
    published_at?: string;
    slug?: string;
  }
): Promise<DBPost | null> {
  const updates: string[] = [];
  const args: (string | null)[] = [];

  if (post.title !== undefined) {
    updates.push('title = ?');
    args.push(post.title);
  }
  if (post.excerpt !== undefined) {
    updates.push('excerpt = ?');
    args.push(post.excerpt || null);
  }
  if (post.content !== undefined) {
    updates.push('content = ?');
    args.push(post.content);
  }
  if (post.cover_image !== undefined) {
    updates.push('cover_image = ?');
    args.push(post.cover_image || null);
  }
  if (post.tags !== undefined) {
    updates.push('tags = ?');
    args.push(post.tags ? JSON.stringify(post.tags) : null);
  }
  if (post.status !== undefined) {
    updates.push('status = ?');
    args.push(post.status);
  }
  if (post.published_at !== undefined) {
    updates.push('published_at = ?');
    args.push(post.published_at);
  }
  if (post.slug !== undefined && post.slug !== slug) {
    updates.push('slug = ?');
    args.push(post.slug);
  }

  updates.push('updated_at = CURRENT_TIMESTAMP');
  args.push(slug);

  await client.execute({
    sql: `UPDATE posts SET ${updates.join(', ')} WHERE slug = ?`,
    args,
  });

  return await getPostBySlug(post.slug || slug);
}

export async function deletePost(slug: string): Promise<boolean> {
  const result = await client.execute({
    sql: 'DELETE FROM posts WHERE slug = ?',
    args: [slug],
  });
  return result.rowsAffected > 0;
}

export default client;
