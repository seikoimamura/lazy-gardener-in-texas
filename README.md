# Lazy Gardener in Texas

A Next.js website for the "Lazy Gardener in Texas" YouTube channel, blog, and Google authentication for administrators, featuring an English cottage garden aesthetic designed for the Texas climate.

🌐 **Live Site:** [Your Vercel URL]  
📺 **YouTube:** [@[Your YouTube Handle Name](https://www.youtube.com/@YouTubeHandleName)

---

## Features

### 🎬 YouTube Integration
- Automatically fetches and displays videos from the YouTube Data API
- Embedded video player (plays on-site without leaving the page)
- Caches video data for 1 hour to minimize API usage

### 📝 Blog System
- Self-contained blog with SQLite database (Turso)
- Markdown editor for writing posts
- Image upload via Vercel Blob storage
- **Draft/Publish workflow** - control when posts go live
- Admin preview for draft posts

### 🔐 Admin Panel with Google Authentication
- Secure admin login with Google OAuth
- Whitelist of allowed admin email addresses
- No passwords to remember or manage
- Admin area (`/admin`)
- Create, edit, and delete blog posts
- Upload and manage images
- Preview posts before publishing

### 🎨 Design
- Cottage garden aesthetic with warm earth tones
- Fully responsive (mobile, tablet, desktop)
- Custom color palette (sage, terracotta, cream, rose)
- Smooth animations and transitions

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 16** | React framework with App Router |
| **TypeScript** | Type safety |
| **Tailwind CSS** | Styling |
| **NextAuth.js v5** | Google OAuth authentication |
| **Turso (SQLite)** | Blog content database |
| **Vercel Blob** | Image storage |
| **YouTube Data API** | Video fetching |
| **Vercel** | Hosting (Hobby plan) |

---

## Getting Started

### Prerequisites
- Node.js 18.17 or later
- npm
- Turso account (free tier)
- Vercel account (free tier)
- Google Cloud Console access (for OAuth)
- YouTube API key

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/lazy-gardener-in-texas.git
   cd lazy-gardener-in-texas
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Google OAuth:**
   
   Go to [Google Cloud Console](https://console.cloud.google.com/):
   - Create a new project (or use existing)
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth 2.0 Client ID"
   - Application type: "Web application"
   - Authorized redirect URIs:
     - `http://localhost:3000/api/auth/callback/google` (development)
     - `https://bbckaty.com/api/auth/callback/google` (production)
   - Copy the Client ID and Client Secret

4. **Set up environment variables:**
   
   Create a `.env.local` file:
   ```env
   # Google OAuth
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   
   # NextAuth
   AUTH_SECRET=generate_a_random_32_character_string
   
   # Allowed admin emails (comma-separated)
   ALLOWED_ADMIN_EMAILS=admin@example.com,editor@example.com
   
   # YouTube
   YOUTUBE_API_KEY=your_youtube_api_key
   YOUTUBE_CHANNEL_ID=your_channel_id
   YOUTUBE_HANDLE_NAME=your_youtube_handle_name

   # Turso Database
   TURSO_DATABASE_URL=libsql://your-db.turso.io
   TURSO_AUTH_TOKEN=your_turso_token

   # Vercel Blob (auto-added when you link Vercel)
   BLOB_READ_WRITE_TOKEN=your_blob_token
   ```

5. **Generate AUTH_SECRET:**
   ```bash
   openssl rand -base64 32
   ```

6. **Link to Vercel (for Blob storage):**
   ```bash
   vercel link
   vercel env pull .env.local
   ```

7. **Run the development server:**
   ```bash
   npm run dev
   ```

8. **Initialize the database:**

   Visit `http://localhost:3000/admin` to automatically create the database tables.

---

## Project Structure

```
lazy-gardener-in-texas/
├── public/
│   └── favicon.svg          # favicon
│   └── images/              # Static images & placeholders
│       ├── logo.svg
│       └── blog-placeholder.svg
│       └── video-placeholder.svg
├── src/
│   ├── app/
│   │   ├── admin/           # Admin pages (protected)
│   │   │   ├── page.tsx     # Login page
│   │   │   └── posts/       # Post management
│   │   ├── api/
│   │   │   ├── auth/        # NextAuth API
│   │   │   ├── posts/       # Blog CRUD API
│   │   │   └── upload/      # Image upload API
│   │   ├── blog/            # Public blog pages
│   │   ├── videos/          # Videos page
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Home page
│   │   └── globals.css      # Global styles
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── VideoCard.tsx
│   │   ├── BlogCard.tsx
│   │   └── PostEditor.tsx   # Markdown editor
│   └── lib/
│       ├── auth.ts          # NextAuth config
│       ├── db.ts            # Database connection & queries
│       ├── data.ts          # YouTube data fetching
│       ├── types.ts         # TypeScript types
│       └── utils.ts         # Utility functions
├── .env.local               # Environment variables (not in git)
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## Admin Usage

### Accessing the Admin Panel
1. Go to `/admin`
2. Click "Sign in with Google" (Your email must be in the `ALLOWED_ADMIN_EMAILS` list)
3. You'll be redirected to `/admin/posts`

### Creating a Blog Post
1. Click "New Post"
2. Fill in the title (slug auto-generates)
3. Write content in Markdown
4. Upload a cover image (optional)
5. Add tags (comma-separated)
6. Toggle status: **Draft** (default) or **Published**
7. Click "Save Post"

### Previewing Draft Posts
- As admin, you can view draft posts at their URL (`/blog/[slug]`)
- A yellow banner indicates it's a draft preview
- Public visitors cannot see draft posts

### Publishing a Post
1. Edit the post
2. Toggle the status switch to "Published"
3. Click "Update Post"

---

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repository
3. Add environment variables in Project Settings:
   - `YOUTUBE_API_KEY`
   - `YOUTUBE_CHANNEL_ID`
   - `YOUTUBE_HANDLE_NAME`
   - `TURSO_DATABASE_URL`
   - `TURSO_AUTH_TOKEN`
   - `ADMIN_PASSWORD`
   
      # Google OAuth
   `GOOGLE_CLIENT_ID`|your_google_client_id
   `GOOGLE_CLIENT_SECRET`|your_google_client_secret
   
   # NextAuth
   `AUTH_SECRET`|generate_a_random_32_character_string

4. Deploy!

Vercel Blob token is automatically configured when you create a Blob store in the Vercel dashboard.

### Update Google OAuth for Production

After deployment, add your production URL to Google Cloud Console:
- Authorized redirect URIs: `https://your-poduction.com/api/auth/callback/google`

---

## Future Enhancement Plans

### 🔐 Phase 1: Member Authentication
- [ ] Implement NextAuth.js with social login providers
  - Facebook OAuth
- [ ] User database schema in Turso
- [ ] Login/logout UI components
- [ ] Protected member pages

### 👥 Phase 2: Member Features
- [ ] Member profiles with garden zone, interests
- [ ] Comments on blog posts
- [ ] Like/save favorite posts
- [ ] Member-only content (exclusive posts or early access)

### 📧 Phase 3: Engagement
- [ ] Newsletter subscription (email list)
- [ ] Email notifications for new posts
- [ ] Contact form

### 🌱 Phase 4: Community Features
- [ ] Garden journal - members track their own plants
- [ ] Photo sharing - members upload garden photos
- [ ] Discussion forum or Q&A section
- [ ] Plant database with Texas-specific growing tips

### 🛠️ Phase 5: Admin Enhancements
- [ ] Rich text editor (WYSIWYG option)
- [ ] Scheduled publishing (set future publish date)
- [ ] Post analytics (view counts)
- [ ] Image gallery management
- [ ] Bulk operations (delete multiple posts)

---

## API Reference

### Blog Posts

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/posts` | GET | List all posts (admin) |
| `/api/posts` | POST | Create a new post |
| `/api/posts/[slug]` | GET | Get a single post |
| `/api/posts/[slug]` | PUT | Update a post |
| `/api/posts/[slug]` | DELETE | Delete a post |

### Image Upload

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/upload` | POST | Upload an image to Vercel Blob |

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `YOUTUBE_API_KEY` | Yes | YouTube Data API key |
| `YOUTUBE_CHANNEL_ID` | Yes | Your YouTube channel ID (UC...) |
| `YOUTUBE_HANDLE_NAME` | Yes | YouTube handle for links |
| `TURSO_DATABASE_URL` | Yes | Turso database URL |
| `TURSO_AUTH_TOKEN` | Yes | Turso authentication token |
| `ADMIN_PASSWORD` | Yes | Password for admin access |
| `BLOB_READ_WRITE_TOKEN` | Yes | Vercel Blob storage token |
| `GOOGLE_CLIENT_ID` | Yes |Your Google  client ID|
| `GOOGLE_CLIENT_SECRET` | Yes |Your Google client secret|
| `AUTH_SECRET` | Yes |Auth Secret string|

---

## Contributing

This is a personal project, but suggestions are welcome! Feel free to open an issue for bugs or feature requests.

---

## License

This project is for personal use. All rights reserved.

---

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Hosted on [Vercel](https://vercel.com/)
- Authentication by [NextAuth.js](https://next-auth.js.org/)
- Database by [Turso](https://turso.tech/)
- Developed in collaboration with [Claude](https://claude.ai/) by Anthropic
- Inspired by English cottage gardens and the joy of lazy gardening 🌿

---

*Growing slowly, failing cheerfully.*
