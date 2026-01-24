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

            {/* Submit Press Release CTA */}
            <div className="mt-12 p-8 rounded-xl bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border border-orange-500/20">
                <div className="text-center space-y-4">
                    <h3 className="text-2xl font-bold text-white">
                        Have a Press Release?
                    </h3>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        We're open to your articles and will publish them for free.
                    </p>
                    <a
                        href="mailto:contactcoingroww@gmail.com?subject=Press Release Submission"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-black font-bold rounded-lg hover:from-orange-600 hover:to-yellow-600 transition-all shadow-lg hover:shadow-orange-500/25"
                    >
                        Submit Your Press Release Here (Free)
                    </a>
                </div>
            </div>
        </div>
    );
}
