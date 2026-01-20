'use client';

import Link from 'next/link';
import { TrendingUp } from 'lucide-react';
import { Post } from '@/types';

interface TrendingWidgetProps {
    trendingPosts: Post[];
    className?: string; // Allow external styling/hiding
}

export function TrendingWidget({ trendingPosts, className = '' }: TrendingWidgetProps) {
    return (
        <div className={`space-y-4 ${className}`}>
            <div className="flex items-center gap-2 border-b border-[#1f1f1f] pb-2">
                <TrendingUp className="h-5 w-5 text-blue-500" />
                <h3 className="font-bold text-lg text-white">Trending Now</h3>
            </div>
            <div className="flex flex-col gap-4">
                {trendingPosts.length > 0 ? (
                    trendingPosts.map((post, index) => (
                        <Link key={post.id} href={`/post/${post.id}`}>
                            <div className="flex gap-4 group cursor-pointer">
                                <span className="text-2xl font-bold text-gray-800 dark:text-gray-700 group-hover:text-blue-500 transition-colors">
                                    {String(index + 1).padStart(2, '0')}
                                </span>
                                <div>
                                    <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block mb-1">{post.category}</span>
                                    <h4 className="text-sm font-semibold leading-snug group-hover:text-blue-400 transition-colors line-clamp-2">
                                        {post.title}
                                    </h4>
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="text-sm text-gray-500">No trending posts yet.</div>
                )}
            </div>
        </div>
    );
}
