// ... imports
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { HeroSection } from '@/components/news/hero-section';
import { Sidebar } from '@/components/news/sidebar';
import { LatestNews } from '@/components/news/latest-news';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

import { Post } from '@/types';

async function getData() {
    if (!isSupabaseConfigured()) {
        console.log('Supabase not configured, returning empty mock data');
        return { featured: [], latest: [], editorsPicks: [], trending: [] };
    }

    try {
        // Fetch all recent posts
        const { data: posts, error } = await supabase
            .from('posts')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(20);

        if (error) {
            console.error('Error fetching posts:', error);
            return { featured: [], latest: [], editorsPicks: [], trending: [] };
        }

        const typedPosts = posts as Post[];

        return {
            featured: typedPosts.filter(p => p.is_featured).slice(0, 5),
            latest: typedPosts,
            editorsPicks: typedPosts.filter(p => p.is_editor_pick),
            trending: typedPosts.filter(p => p.trending_rank !== null).sort((a, b) => (a.trending_rank || 0) - (b.trending_rank || 0))
        };

    } catch (err) {
        console.error('Unexpected error fetching posts:', err);
        return { featured: [], latest: [], editorsPicks: [], trending: [] };
    }
}

export default async function Home() {
    const { featured, latest, editorsPicks, trending } = await getData();

    return (
        <div className="container py-8 space-y-12">
            {/* 1. Hero Section (Grid Layout) */}
            <section>
                <HeroSection featuredPosts={featured} />
            </section>

            {/* 2. Main Layout (Content + Sidebar) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column: Latest News Stream (8 Cols) */}
                <div className="lg:col-span-8 space-y-8">
                    <div className="flex items-center justify-between border-b border-[#1f1f1f] pb-4">
                        <h2 className="text-2xl font-bold text-white border-l-4 border-blue-500 pl-4 uppercase">Latest News</h2>
                        <div className="flex gap-2">
                            <span className="px-3 py-1 text-xs font-bold uppercase bg-blue-600 text-white rounded-sm">All</span>
                        </div>
                    </div>

                    <LatestNews initialPosts={latest} postsPerPage={5} />
                </div>

                {/* Right Column: Sidebar (4 Cols) */}
                <div className="lg:col-span-4">
                    <div className="sticky top-24">
                        <Sidebar editorsPicks={editorsPicks} trendingPosts={trending} />
                    </div>
                </div>
            </div>
        </div>
    );
}
