'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Clock } from 'lucide-react';
import { Post } from '@/types';

interface LatestNewsProps {
    initialPosts: Post[];
    postsPerPage?: number;
}

export function LatestNews({ initialPosts, postsPerPage = 5 }: LatestNewsProps) {
    const [visibleCount, setVisibleCount] = useState(postsPerPage);

    const visiblePosts = initialPosts.slice(0, visibleCount);
    const hasMore = visibleCount < initialPosts.length;

    const loadMore = () => {
        setVisibleCount(prev => prev + postsPerPage);
    };

    return (
        <>
            <div className="space-y-6">
                {visiblePosts.length > 0 ? (
                    visiblePosts.map((post) => (
                        <article key={post.id} className="group grid grid-cols-1 md:grid-cols-12 gap-6 p-4 rounded-lg hover:bg-[#0f0f0f] border border-transparent hover:border-[#1f1f1f] transition-all">
                            {/* Thumbnail */}
                            <div className="md:col-span-4 h-40 sm:h-48 md:h-32 bg-gray-800 rounded-md overflow-hidden relative">
                                {post.image_url ? (
                                    <img src={post.image_url} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900" />
                                )}
                            </div>

                            {/* Content */}
                            <div className="md:col-span-8 flex flex-col justify-center">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-xs font-bold text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded uppercase tracking-wide">
                                        {post.category}
                                    </span>
                                    <span className="flex items-center text-xs text-gray-500 font-medium">
                                        <Clock className="w-3 h-3 mr-1" />
                                        {new Date(post.created_at).toLocaleDateString()}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-white leading-tight mb-2 group-hover:text-blue-500 transition-colors">
                                    <Link href={`/post/${post.id}`}>
                                        {post.title}
                                    </Link>
                                </h3>

                                <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">
                                    {post.excerpt}
                                </p>
                            </div>
                        </article>
                    ))
                ) : (
                    <div className="text-center py-12 text-gray-500">
                        <p>No latest news available yet.</p>
                    </div>
                )}
            </div>

            {hasMore && (
                <div className="flex justify-center pt-8">
                    <button
                        onClick={loadMore}
                        className="px-8 py-3 bg-[#1f1f1f] text-white font-bold rounded hover:bg-blue-600 transition-colors"
                    >
                        Load More News
                    </button>
                </div>
            )}
        </>
    );
}
