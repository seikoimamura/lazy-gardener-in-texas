import { Video, BlogPost } from './types';

// Fetch videos from YouTube API
export async function getYouTubeVideos(): Promise<Video[]> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const channelId = process.env.YOUTUBE_CHANNEL_ID;

  if (!apiKey || !channelId) {
    console.warn('YouTube API key or Channel ID not configured');
    return [];
  }

  try {
    // Get uploads playlist ID
    const channelRes = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${apiKey}`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );
    const channelData = await channelRes.json();
    const uploadsPlaylistId = channelData.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;

    if (!uploadsPlaylistId) return [];

    // Get videos from uploads playlist
    const videosRes = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${uploadsPlaylistId}&key=${apiKey}`,
      { next: { revalidate: 3600 } }
    );
    const videosData = await videosRes.json();

    return (videosData.items || []).map((item: any, index: number) => ({
      id: String(index + 1),
      title: item.snippet.title,
      description: item.snippet.description,
      publishedAt: item.snippet.publishedAt.split('T')[0],
      thumbnail: item.snippet.thumbnails?.high?.url || '',
      youtubeId: item.snippet.resourceId.videoId,
    }));
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    return [];
  }
}

// Get recent videos (for home page)
export async function getRecentVideos(count: number = 3): Promise<Video[]> {
  const videos = await getYouTubeVideos();
  return videos.slice(0, count);
}

// Blog posts - add your own content here
export const blogPosts: BlogPost[] = [
  {
    slug: 'why-cottage-gardens-in-texas',
    title: 'Why I\'m Attempting an English Cottage Garden in Texas',
    excerpt: 'Everyone says it can\'t be done. The heat! The humidity! The clay soil! Here\'s why I\'m trying anyway.',
    content: `
# Why I'm Attempting an English Cottage Garden in Texas

Everyone told me it couldn't be done. "Texas is too hot," they said. "The humidity will destroy your roses." "You'll spend all your time watering."

They might be right. But here I am, anyway.

## The Dream

I fell in love with cottage gardens while browsing Pinterest at 2 AM (as one does). Those rambling roses tumbling over arbors, the delphiniums standing tall, the foxgloves dancing in dappled shade. Pure magic.

Then I looked at my small suburban yard in Katy, Texas, with its clay soil and relentless summer sun, and I thought: "This is going to be interesting."

## The Reality

Let's be honest about what we're working with:

- **Zone 9a** - which sounds nice until July hits
- **Clay soil** that becomes concrete when dry and swamp when wet
- **Humidity** that could double as a sauna
- **Temperatures** regularly exceeding 100°F in summer

Not exactly the rolling English countryside.

## Why Try Anyway?

Because gardens are experiments. Because the journey matters more than the destination. Because I'd rather fail spectacularly trying something I love than succeed at a landscape I find boring.

And honestly? Some things DO work. Old Garden Roses have been blooming in Texas for over a century. Native plants can provide that cottage abundance. And with the right plant choices, a little adaptation, and a lot of patience, something beautiful is possible.

## The Lazy Gardener Approach

I call myself a "lazy gardener" because I refuse to fight nature. If a plant struggles, I don't baby it—I thank it for trying and replace it with something that wants to be here. If the Texas heat demands afternoon shade, I provide it. If the soil needs amending, I amend it (eventually, slowly, lazily).

This isn't about perfection. It's about creating a space that brings joy without requiring heroic effort.

Join me on this journey. We'll make mistakes together. We'll celebrate the unexpected successes. And maybe, just maybe, we'll end up with something that looks a little like a cottage garden—Texas style.
    `,
    publishedAt: '2025-01-10',
    coverImage: '/images/blog-placeholder.svg',
    tags: ['cottage garden', 'texas gardening', 'philosophy'],
  },
  {
    slug: 'best-roses-for-houston-area',
    title: 'Old Garden Roses That Actually Survive Houston\'s Climate',
    excerpt: 'After killing more roses than I care to admit, here are the heritage varieties that have proven themselves in my garden.',
    content: `
# Old Garden Roses That Actually Survive Houston's Climate

I've killed a lot of roses. Like, a *lot*. But some have not only survived—they've thrived. Here are my champions.

## The Survivors

### Knock Out Roses (I know, I know)

Yes, everyone has them. Yes, they're "basic." But you know what? They bloom reliably, resist disease, and don't demand much attention. For a lazy gardener, that's gold.

### Old Blush

This China rose has been growing in Texas since the 1800s. It's heat tolerant, drought tolerant, and produces those perfect soft pink blooms almost year-round. My oldest specimen has survived flooding, drought, and complete neglect.

### Mutabilis

The "butterfly rose" is magical—blooms that start yellow, turn pink, then deepen to crimson, all on the same bush. It handles Texas conditions beautifully and grows into a large, dramatic shrub.

### Belinda's Dream

Bred right here in Texas, this rose was specifically developed for our climate. Full, pink blooms, incredible fragrance, and truly tough. If you plant one rose in Texas, make it this one.

## My Failures (So Far)

- Most hybrid teas (too fussy)
- David Austin roses (mixed results)
- Anything labeled "needs cool summers"

## Tips for Success

1. **Plant in fall** - gives roots time to establish before summer
2. **Morning sun, afternoon shade** - protects from the worst heat
3. **Mulch heavily** - I use 4-6 inches
4. **Water deeply but infrequently** - encourages deep roots
5. **Accept black spot** - it happens, the roses survive

Remember: a rose that struggles isn't worth your time. Find the ones that want to grow here and let them shine.
    `,
    publishedAt: '2025-01-20',
    coverImage: '/images/blog-placeholder.svg',
    tags: ['roses', 'texas gardening', 'plant recommendations'],
  },
  {
    slug: 'embracing-garden-failures',
    title: 'Why I Document My Garden Failures',
    excerpt: 'Most gardening content shows only successes. Here\'s why I think sharing our failures is more valuable.',
    content: `
# Why I Document My Garden Failures

Scroll through any gardening Instagram and you'll see perfection. Immaculate borders. Flawless blooms. Gardens that look like they've never met a pest or experienced drought.

That's not real gardening.

## The Failure Gallery

In my garden right now:

- **Dead foxgloves** - apparently they really do need cool summers
- **Crispy hydrangeas** - I underestimated July
- **A rose that refuses to bloom** - but also refuses to die, so we're at a standstill
- **Tomatoes with blossom end rot** - again

And you know what? That's fine.

## Why Share the Ugly Parts?

### It's honest

Every garden has failures. Pretending otherwise helps no one. When I post about my dead plants, I hear from others who've had the same experience. We commiserate. We learn. We feel less alone.

### It's educational

My failure with foxgloves teaches you not to waste money on them in Zone 9. My crispy hydrangeas remind you to check afternoon sun exposure. Failures are data points.

### It reduces pressure

Gardening should be joyful, not stressful. When we only show perfection, we create impossible standards. I'd rather you see my messy, experimental, sometimes-failing garden and think "I can do this" than see a magazine spread and think "why bother."

## The Lazy Gardener Mindset

I call it "lazy" but really it's "realistic." I don't have unlimited time or energy. I can't baby struggling plants back to health. I can't redesign my garden every season.

What I can do:
- Try things
- Note what works
- Remove what doesn't
- Celebrate small victories
- Share the whole journey

## Join the Experiment

This channel and blog are my garden journal. The successes AND the failures. The beautiful blooms AND the mysterious die-offs. 

Because that's real gardening. And I think real is more interesting than perfect.
    `,
    publishedAt: '2025-01-25',
    coverImage: '/images/blog-placeholder.svg',
    tags: ['philosophy', 'garden journal', 'failures'],
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getRecentBlogPosts(count: number = 3): BlogPost[] {
  return [...blogPosts]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, count);
}
