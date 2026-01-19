import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { HeroSection } from '@/components/news/hero-section';
import { Sidebar } from '@/components/news/sidebar';
import { LatestNews } from '@/components/news/latest-news';
import { Post } from '@/types';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

async function getData(category?: string) {
    if (!isSupabaseConfigured()) {
        return { featured: [], latest: [], editorsPicks: [], trending: [] };
    }

    try {
        let query = supabase
            .from('posts')
            .select('*')
            .eq('section', 'News')
            .order('created_at', { ascending: false });

        if (category) {
            // Capitalize first letter to match DB convention if needed, or assume slug match
            // The tags in DB are "Bitcoin", "Ethereum" etc.
            // The URL param "tag" will be "bitcoin", "ethereum".
            // So we need to case-insensitive match or format it.
            // PostgreSQL ilike is case insensitive.
            query = query.ilike('category', `%${category}%`); // ilike is safer for case insensitivity
        }

        const { data: posts, error } = await query;

        if (error) {
            console.error('Error fetching posts:', error);
            return { featured: [], latest: [], editorsPicks: [], trending: [] };
        }

        const typedPosts = posts as Post[];

        // Fetch trending for sidebar (global trending or section trending? global is better for engagement)
        const { data: trendingData } = await supabase
            .from('posts')
            .select('*')
            .not('trending_rank', 'is', null)
            .order('trending_rank', { ascending: true })
            .limit(5);

        return {
            featured: typedPosts.filter(p => p.is_featured),
            latest: typedPosts,
            editorsPicks: typedPosts.filter(p => p.is_editor_pick),
            trending: (trendingData as Post[]) || []
        };

    } catch (err) {
        console.error('Unexpected error fetching posts:', err);
        return { featured: [], latest: [], editorsPicks: [], trending: [] };
    }
}

export default async function NewsPage({ params }: { params: { tag?: string } }) {
    // If this file is used for [tag], params.tag will be present.
    // If used for /news/page.tsx, params.tag will be undefined.
    // But this file content is specific to /news/page.tsx. 
    // I will write separate files or just reuse logic.

    // This is for /news/page.tsx (All News)
    const { latest, editorsPicks, trending } = await getData();

    return (
        <div className="container py-8 space-y-12">
            {/* Main Layout (Content + Sidebar) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column: Latest News Stream (8 Cols) */}
                <div className="lg:col-span-8 space-y-8">
                    <div className="flex items-center justify-between border-b border-[#1f1f1f] pb-4">
                        <h2 className="text-2xl font-bold text-white border-l-4 border-blue-500 pl-4 uppercase">
                            News
                        </h2>
                    </div>

                    <LatestNews initialPosts={latest} postsPerPage={10} />
                </div>

                {/* Right Column: Sidebar (4 Cols) */}
                <div className="lg:col-span-4">
                    <div className="sticky top-24">
                        <Sidebar editorsPicks={[]} trendingPosts={trending} />
                    </div>
                </div>
            </div>
        </div>
    );
}
