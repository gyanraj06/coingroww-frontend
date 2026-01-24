import Link from 'next/link';
import { Post } from '@/types';

interface HeroSectionProps {
    featuredPosts: Post[];
}

export function HeroSection({ featuredPosts }: HeroSectionProps) {
    const mainFeature = featuredPosts.length > 0 ? featuredPosts[0] : null;
    const subFeatures = featuredPosts.length > 1 ? featuredPosts.slice(1) : [];

    // Fallback data structure if no props provided (for safe rendering)
    if (!mainFeature) {
        // Render fallback/placeholder static hero if no data
        return (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-auto lg:h-[500px]">
                {/* Fallback Static Content */}
                <div className="lg:col-span-2 lg:row-span-2 relative group overflow-hidden rounded-lg bg-gray-900 border border-[#1f1f1f]">
                    <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                        <span className="text-sm">No featured posts yet</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-auto lg:h-[500px]">
            {/* Main Featured Article */}
            <div className="lg:col-span-2 lg:row-span-2 relative group overflow-hidden rounded-lg bg-gray-900">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10" />
                {mainFeature.image_url && (
                    <img
                        src={mainFeature.image_url}
                        alt={mainFeature.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                )}

                <div className="absolute bottom-0 left-0 p-6 z-20 max-w-2xl">
                    <span className="inline-block px-3 py-1 mb-4 text-xs font-bold text-white bg-blue-600 rounded-sm uppercase tracking-wide">
                        {mainFeature.category}
                    </span>
                    <h2 className="text-2xl md:text-4xl font-bold text-white leading-tight mb-4 group-hover:text-blue-400 transition-colors line-clamp-3">
                        <Link href={`/post/${mainFeature.id}`}>
                            {mainFeature.title}
                        </Link>
                    </h2>
                    <div className="flex items-center text-gray-300 text-sm space-x-4">
                        <span className="font-medium text-blue-400">Featured</span>
                        {mainFeature.author_name && (
                            <>
                                <span>•</span>
                                <span>{mainFeature.author_name}</span>
                            </>
                        )}
                        <span>•</span>
                        <span>{new Date(mainFeature.created_at).toLocaleDateString()}</span>
                    </div>
                </div>
            </div>

            {/* Sub Features */}
            {subFeatures.map((post) => (
                <div key={post.id} className="relative group overflow-hidden rounded-lg bg-gray-900 min-h-[240px]">
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
                    {post.image_url && (
                        <img
                            src={post.image_url}
                            alt={post.title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    )}
                    <div className="absolute bottom-0 left-0 p-4 z-20">
                        <span className="text-xs font-bold text-purple-400 uppercase mb-2 block">{post.category}</span>
                        <h3 className="text-lg font-bold text-white leading-snug group-hover:text-purple-400 transition-colors line-clamp-2">
                            <Link href={`/post/${post.id}`}>
                                {post.title}
                            </Link>
                        </h3>
                    </div>
                </div>
            ))}
        </div>
    );
}
