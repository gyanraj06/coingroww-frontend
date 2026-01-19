import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { HeroSection } from '@/components/news/hero-section';
import { Sidebar } from '@/components/news/sidebar';
import { LatestNews } from '@/components/news/latest-news';
import { Post } from '@/types';
import { notFound } from 'next/navigation';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

async function getData(section: string, tag?: string) {
    if (!isSupabaseConfigured()) {
        return { featured: [], latest: [], editorsPicks: [], trending: [] };
    }

    try {
        let query = supabase
            .from('posts')
            .select('*')
            .eq('section', section)
            .order('created_at', { ascending: false });

        if (tag) {
            // Unslugify the tag for ilike search (e.g. "market-release" -> "Market Release"?)
            // Or simplified check. The dashboard creates tags with spaces ("Market Release")
            // The URL likely has "market-release" or "Market%20Release".
            // If the header links use spaces like "Market Release", they will be encoded.
            // If they use "market-release", we might need to replace dashes with spaces or % for ilike.
            // Let's assume the links in header are constructed carefully. 
            // In header.tsx: { name: "Bitcoin", href: "/news/bitcoin" } -> tag is "bitcoin" (lowercase)
            // In DB: "Bitcoin" (Title Case).
            // ilike 'bitcoin' matches 'Bitcoin'.
            // { name: "Market Release", href: "/markets/release" } -> tag "release". 
            // DB Tag: "Market Release". "release" does NOT match "Market Release".
            // Wait, looking at header.tsx:
            // Markets > Market Release -> href: "/markets/release"
            // DB Tag: "Market Release"
            // So "release" != "Market Release". 
            // I should update header.tsx to use full tag in slug or handle mapping.
            // EASIEST: Update header.tsx to use /markets/Market%20Release or /markets/market-release?
            // User said: "these tabs should be tags in these admin portal tabs respectively."
            // So logic should likely exact match or consistent.
            // For now, I will use ilike `tag`. If header says `bitcoin`, `ilike bitcoin` matches `Bitcoin`.
            // If header says `release` but tag is `Market Release`, it fails.
            // I should assume the user will align them or I should align them.
            // I'll stick to `ilike` for now, assuming simple tags work.
            // Validating header hrefs later.

            // Allow partial match? No, needs to be specific tag. 
            // If I use ilike with % wildcards it might match too much.
            // But strict matching requires consistent naming.
            // I'll assume exact match (case-insensitive) for simple tags like Bitcoin.
            // For "Market Release", if URL is /markets/market-release, I might convert - to space.
            const decodedTag = decodeURIComponent(tag).replace(/-/g, ' ');
            query = query.ilike('category', `%${decodedTag}%`);
        }

        const { data: posts, error } = await query;

        if (error) {
            console.error('Error fetching posts:', error);
            return { featured: [], latest: [], editorsPicks: [], trending: [] };
        }

        const typedPosts = posts as Post[];

        // Fetch section-specific trending
        const { data: trendingData } = await supabase
            .from('posts')
            .select('*')
            .eq('section', section)
            .not('trending_rank', 'is', null)
            .order('trending_rank', { ascending: true })
            .limit(5);

        // If no section-specific trending, fallback to global trending? 
        // Or fetch global if array empty.
        let trendingPosts = (trendingData as Post[]) || [];
        if (trendingPosts.length === 0) {
            const { data: globalTrending } = await supabase
                .from('posts')
                .select('*')
                .not('trending_rank', 'is', null)
                .order('trending_rank', { ascending: true })
                .limit(5);
            trendingPosts = (globalTrending as Post[]) || [];
        }

        return {
            featured: typedPosts.filter(p => p.is_featured),
            latest: typedPosts,
            editorsPicks: typedPosts.filter(p => p.is_editor_pick),
            trending: trendingPosts
        };

    } catch (err) {
        console.error('Unexpected error fetching posts:', err);
        return { featured: [], latest: [], editorsPicks: [], trending: [] };
    }
}

export default async function NewsTagPage({ params }: { params: { tag: string } }) {
    const { tag } = params;
    const { latest, editorsPicks, trending } = await getData('News', tag);

    if (latest.length === 0) {
        // Maybe render empty state instead of 404 to avoid breaking if just no content yet
    }

    const displayTag = decodeURIComponent(tag).replace(/-/g, ' '); // Simple formatting

    return (
        <div className="container py-8 space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 space-y-8">
                    <div className="flex items-center justify-between border-b border-[#1f1f1f] pb-4">
                        <h2 className="text-2xl font-bold text-white border-l-4 border-blue-500 pl-4 uppercase">
                            {displayTag} News
                        </h2>
                    </div>

                    <LatestNews initialPosts={latest} postsPerPage={10} />
                </div>

                <div className="lg:col-span-4">
                    <div className="sticky top-24">
                        <Sidebar editorsPicks={[]} trendingPosts={trending} />
                    </div>
                </div>
            </div>
        </div>
    );
}
