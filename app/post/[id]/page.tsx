import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock, Tag } from 'lucide-react';

export const dynamic = 'force-dynamic';

interface Post {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    image_url: string;
    category: string;
    created_at: string;
    is_featured: boolean;
    is_editor_pick: boolean;
}

async function getPost(id: string) {
    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !data) {
        return null;
    }

    return data as Post;
}

export default async function PostPage({ params }: { params: { id: string } }) {
    const post = await getPost(params.id);

    if (!post) {
        notFound();
    }

    return (
        <div className="container py-8 max-w-4xl mx-auto">
            {/* Back Button */}
            <Link
                href="/"
                className="inline-flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors mb-8"
            >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
            </Link>

            {/* Article Header */}
            <article>
                <header className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-bold text-white bg-blue-600 rounded uppercase tracking-wide">
                            <Tag className="w-3 h-3" />
                            {post.category}
                        </span>
                        {post.is_featured && (
                            <span className="px-3 py-1 text-xs font-bold text-purple-400 bg-purple-400/10 rounded uppercase">
                                Featured
                            </span>
                        )}
                        {post.is_editor_pick && (
                            <span className="px-3 py-1 text-xs font-bold text-yellow-400 bg-yellow-400/10 rounded uppercase">
                                Editor's Pick
                            </span>
                        )}
                    </div>

                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
                        {post.title}
                    </h1>

                    <p className="text-lg text-gray-400 mb-6">
                        {post.excerpt}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {new Date(post.created_at).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </span>
                    </div>
                </header>

                {/* Featured Image */}
                {post.image_url && (
                    <div className="relative aspect-video w-full rounded-lg overflow-hidden mb-8 bg-gray-800">
                        <img
                            src={post.image_url}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}

                {/* Article Content */}
                <div
                    className="prose prose-invert prose-lg max-w-none text-gray-300 [&>p]:mb-4 [&>h1]:text-white [&>h2]:text-white [&>h3]:text-white [&>ul]:list-disc [&>ul]:pl-5 [&>ol]:list-decimal [&>ol]:pl-5 [&>blockquote]:border-l-4 [&>blockquote]:border-blue-500 [&>blockquote]:pl-4 [&>blockquote]:italic"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />
            </article>

            {/* Footer */}
            <div className="mt-12 pt-8 border-t border-[#1f1f1f]">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to All News
                </Link>
            </div>
        </div>
    );
}
