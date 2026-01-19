'use client';

import Link from 'next/link';
import { TrendingUp, Star, ArrowUp, ArrowDown, Activity } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Post } from '@/types';

interface SidebarProps {
    editorsPicks?: Post[];
    trendingPosts?: Post[];
}

interface Asset {
    id: string;
    rank: string;
    symbol: string;
    name: string;
    priceUsd: string;
    changePercent24Hr: string;
}

// Fallback data in case the API is blocked or fails
const FALLBACK_ASSETS: Asset[] = [
    { id: 'bitcoin', rank: '1', symbol: 'BTC', name: 'Bitcoin', priceUsd: '64231.45', changePercent24Hr: '2.34' },
    { id: 'ethereum', rank: '2', symbol: 'ETH', name: 'Ethereum', priceUsd: '3452.12', changePercent24Hr: '-1.12' },
    { id: 'solana', rank: '5', symbol: 'SOL', name: 'Solana', priceUsd: '145.67', changePercent24Hr: '5.67' },
    { id: 'binance-coin', rank: '4', symbol: 'BNB', name: 'BNB', priceUsd: '590.33', changePercent24Hr: '0.45' },
    { id: 'xrp', rank: '6', symbol: 'XRP', name: 'XRP', priceUsd: '0.62', changePercent24Hr: '-0.89' },
    { id: 'cardano', rank: '9', symbol: 'ADA', name: 'Cardano', priceUsd: '0.45', changePercent24Hr: '1.20' },
];

export function Sidebar({ editorsPicks = [], trendingPosts = [] }: SidebarProps) {
    const [assets, setAssets] = useState<Asset[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [page, setPage] = useState(0);

    useEffect(() => {
        const fetchAssets = async () => {
            try {
                // Fetching 18 items to have 3 pages of 6 items
                const res = await fetch('https://rest.coincap.io/v2/assets?limit=18');
                if (!res.ok) throw new Error('Fetch failed');
                const data = await res.json();
                setAssets(data.data);
                setError(false);
            } catch (err) {
                console.warn('Failed to fetch crypto data, using fallback', err);
                setAssets(FALLBACK_ASSETS);
            } finally {
                setLoading(false);
            }
        };

        fetchAssets();
        // Refresh data every 60 seconds
        const dataInterval = setInterval(fetchAssets, 60000);

        // Carousel rotation every 5 seconds
        const carouselInterval = setInterval(() => {
            setAssets(currentAssets => {
                if (currentAssets.length === 0) return currentAssets;
                const itemsPerPage = 6;
                const totalPages = Math.ceil(currentAssets.length / itemsPerPage);
                setPage(prev => (prev + 1) % totalPages);
                return currentAssets;
            });
        }, 5000);

        return () => {
            clearInterval(dataInterval);
            clearInterval(carouselInterval);
        };
    }, []);

    const formatPrice = (price: string) => {
        const val = parseFloat(price);
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(val);
    };

    const formatChange = (change: string) => {
        const val = parseFloat(change);
        const sign = val >= 0 ? '+' : '';
        return `${sign}${val.toFixed(2)}%`;
    };

    const currentItems = assets.slice(page * 6, (page + 1) * 6);

    return (
        <aside className="space-y-8">
            {/* Crypto Daily / Market Watch */}
            <div className="rounded-lg border border-[#1f1f1f] bg-[#0f0f0f] p-6">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <div className="bg-blue-500/10 w-8 h-8 rounded-full flex items-center justify-center">
                            <Activity className="h-4 w-4 text-blue-500" />
                        </div>
                        <h3 className="text-xl font-bold text-white">Crypto Daily</h3>
                    </div>
                    {/* Page Indicator dots */}
                    <div className="flex gap-1">
                        {Array.from({ length: Math.ceil(assets.length / 6) }).map((_, i) => (
                            <div
                                key={i}
                                className={`w-1.5 h-1.5 rounded-full transition-colors ${page === i ? 'bg-blue-500' : 'bg-gray-700'}`}
                            />
                        ))}
                    </div>
                </div>

                {loading ? (
                    <div className="space-y-4 animate-pulse">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex gap-4">
                                <div className="h-16 w-1/2 bg-[#1f1f1f] rounded-md" />
                                <div className="h-16 w-1/2 bg-[#1f1f1f] rounded-md" />
                            </div>
                        ))}
                    </div>
                ) : error ? (
                    <div className="text-center text-red-400 py-4 text-sm">
                        Failed to load prices
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-3 min-h-[220px]">
                        {currentItems.map((asset) => {
                            const isPositive = parseFloat(asset.changePercent24Hr) >= 0;
                            return (
                                <div key={asset.id} className="flex flex-col p-3 rounded-md bg-[#0a0a0a] border border-[#1f1f1f] hover:border-gray-700 transition-colors animate-in fade-in duration-500">
                                    <div className="flex items-center gap-2 mb-2">
                                        <img
                                            src={`https://assets.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`}
                                            alt={asset.symbol}
                                            className="w-6 h-6 rounded-full"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).style.display = 'none';
                                            }}
                                        />
                                        <span className="font-bold text-white text-xs truncate max-w-[60px]">{asset.symbol}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-bold text-white text-sm">{formatPrice(asset.priceUsd)}</span>
                                        <div className={`flex items-center text-[10px] font-bold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                                            {isPositive ? <ArrowUp className="w-3 h-3 mr-0.5" /> : <ArrowDown className="w-3 h-3 mr-0.5" />}
                                            {formatChange(asset.changePercent24Hr)}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Trending Now */}
            <div className="space-y-4">
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

            {/* Editor's Picks */}
            {editorsPicks.length > 0 && (
                <div className="space-y-4">
                    <div className="flex items-center gap-2 border-b border-[#1f1f1f] pb-2">
                        <Star className="h-5 w-5 text-yellow-500" />
                        <h3 className="font-bold text-lg text-white">Editor's Picks</h3>
                    </div>
                    <div className="grid gap-4">
                        {editorsPicks.map((post) => (
                            <Link key={post.id} href={`/post/${post.id}`}>
                                <div className="group cursor-pointer">
                                    <div className="h-32 w-full bg-gray-800 rounded-md overflow-hidden relative mb-2">
                                        {post.image_url ? (
                                            <img src={post.image_url} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-t from-gray-800 to-gray-900" />
                                        )}
                                        <span className="absolute bottom-2 left-2 text-xs font-bold text-white bg-blue-600 px-2 py-0.5 rounded">Analysis</span>
                                    </div>
                                    <h4 className="font-bold text-sm leading-snug group-hover:text-blue-400 transition-colors">
                                        {post.title}
                                    </h4>
                                    <p className="text-xs text-gray-500 mt-1">{new Date(post.created_at).toLocaleDateString()}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </aside>
    );
}
