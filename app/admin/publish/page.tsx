"use client";

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function AdminPublish() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        excerpt: '',
        category: 'Bitcoin',
        image_url: '',
        is_featured: false,
        is_editor_pick: false,
    });

    const categories = ['Bitcoin', 'Ethereum', 'Altcoins', 'DeFi', 'NFTs', 'Regulation'];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { error } = await supabase.from('posts').insert([
                {
                    title: formData.title,
                    content: formData.content,
                    excerpt: formData.excerpt,
                    category: formData.category,
                    image_url: formData.image_url,
                    is_featured: formData.is_featured,
                    is_editor_pick: formData.is_editor_pick,
                    slug: formData.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') + '-' + Date.now().toString().slice(-4),
                },
            ]);

            if (error) throw error;

            alert('Post published successfully!');
            setFormData({
                title: '',
                content: '',
                excerpt: '',
                category: 'Bitcoin',
                image_url: '',
                is_featured: false,
                is_editor_pick: false
            });
            router.refresh();
        } catch (error: any) {
            alert('Error publishing post: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold text-blue-500">Publish Article</h1>
                <p className="text-muted-foreground">Create a new post for COINGROWW.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 border border-border rounded-lg p-6 bg-card/50">
                <div className="space-y-2">
                    <label htmlFor="title" className="text-sm font-medium">Title</label>
                    <input
                        id="title"
                        required
                        type="text"
                        className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        placeholder="Enter article title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="image_url" className="text-sm font-medium">Image URL (Unsplash)</label>
                    <input
                        id="image_url"
                        type="text"
                        className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        placeholder="https://images.unsplash.com/..."
                        value={formData.image_url}
                        onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label htmlFor="category" className="text-sm font-medium">Category</label>
                        <select
                            id="category"
                            className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        >
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-center space-x-4 pt-8">
                        <div className="flex items-center space-x-2">
                            <input
                                id="featured"
                                type="checkbox"
                                checked={formData.is_featured}
                                onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <label htmlFor="featured" className="text-sm font-medium">Featured (Hero)</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <input
                                id="editor_pick"
                                type="checkbox"
                                checked={formData.is_editor_pick}
                                onChange={(e) => setFormData({ ...formData, is_editor_pick: e.target.checked })}
                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <label htmlFor="editor_pick" className="text-sm font-medium">Editor's Pick</label>
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="excerpt" className="text-sm font-medium">Excerpt</label>
                    <textarea
                        id="excerpt"
                        required
                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        placeholder="Short summary..."
                        value={formData.excerpt}
                        onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="content" className="text-sm font-medium">Content</label>
                    <textarea
                        id="content"
                        required
                        className="flex min-h-[200px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        placeholder="Write your article content here..."
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex h-10 items-center justify-center rounded-md bg-blue-600 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                    {loading ? 'Publishing...' : 'Publish Article'}
                </button>
            </form>
        </div>
    );
}
