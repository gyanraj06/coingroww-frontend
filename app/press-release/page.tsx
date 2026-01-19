import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { HeroSection } from '@/components/news/hero-section';
import { Sidebar } from '@/components/news/sidebar';
import { LatestNews } from '@/components/news/latest-news';
import { Post } from '@/types';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

async function getData() {
    if (!isSupabaseConfigured()) {
        return { featured: [], latest: [], editorsPicks: [], trending: [] };
    }

    try {
        let query = supabase
            .from('posts')
            .select('*')
            .eq('section', 'Press Release')
            .order('created_at', { ascending: false });

        const { data: posts, error } = await query;

        if (error) {
            return { featured: [], latest: [], editorsPicks: [], trending: [] };
        }

        const typedPosts = posts as Post[];

        const { data: trendingData } = await supabase
            .from('posts')
            .select('*')
            .not('trending_rank', 'is', null) // Global trending for PR
            .order('trending_rank', { ascending: true })
            .limit(5);

        return {
            featured: typedPosts.filter(p => p.is_featured),
            latest: typedPosts,
            editorsPicks: typedPosts.filter(p => p.is_editor_pick),
            trending: (trendingData as Post[]) || []
        };

    } catch (err) {
        return { featured: [], latest: [], editorsPicks: [], trending: [] };
    }
}

export default async function PressReleasePage() {
    const { latest, editorsPicks, trending } = await getData();

    return (
        <div className="container py-8 space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 space-y-8">
                    <div className="flex items-center justify-between border-b border-[#1f1f1f] pb-4">
                        <h2 className="text-2xl font-bold text-white border-l-4 border-orange-500 pl-4 uppercase">
                            Recent Releases
                        </h2>
                        {/* No tags for Press Release */}
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
