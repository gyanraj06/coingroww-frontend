import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { HeroSection } from '@/components/news/hero-section';
import { Sidebar } from '@/components/news/sidebar';
import { LatestNews } from '@/components/news/latest-news';
import { Post } from '@/types';

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
            const decodedTag = decodeURIComponent(tag).replace(/-/g, ' ');
            query = query.ilike('category', decodedTag);
        }

        const { data: posts, error } = await query;

        if (error) {
            return { featured: [], latest: [], editorsPicks: [], trending: [] };
        }

        const typedPosts = posts as Post[];

        const { data: trendingData } = await supabase
            .from('posts')
            .select('*')
            .eq('section', section)
            .not('trending_rank', 'is', null)
            .order('trending_rank', { ascending: true })
            .limit(5);

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
        return { featured: [], latest: [], editorsPicks: [], trending: [] };
    }
}

export default async function TopPage() {
    const { latest, editorsPicks, trending } = await getData('Top');

    return (
        <div className="container py-8 space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 space-y-8">
                    <div className="flex items-center justify-between border-b border-[#1f1f1f] pb-4">
                        <h2 className="text-2xl font-bold text-white border-l-4 border-purple-500 pl-4 uppercase">
                            Top Stories
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
