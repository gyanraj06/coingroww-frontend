"use client";

import * as React from "react";
import Link from "next/link";
import { TrendingUp, ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = {
    news: {
        title: "NEWS",
        image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=800&auto=format&fit=crop",
        items: [
            { name: "Bitcoin", href: "/news/bitcoin" },
            { name: "Ethereum", href: "/news/ethereum" },
            { name: "Altcoins", href: "/news/altcoins" },
            { name: "DeFi", href: "/news/defi" },
            { name: "Blockchain", href: "/news/blockchain" },
            { name: "NFTs", href: "/news/nfts" },
            { name: "GameFi", href: "/news/gamefi" },
            { name: "Sponsored", href: "/news/sponsored" },
            { name: "PR", href: "/press-release" },
        ]
    },
    markets: {
        title: "MARKETS",
        image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=800&auto=format&fit=crop",
        items: [
            { name: "Market Release", href: "/markets/market-release" },
            { name: "Crypto Price", href: "/markets/crypto-price" },

            { name: "Industry", href: "/markets/industry" },
        ]
    },
    top: {
        title: "TOP",
        image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=800&auto=format&fit=crop",
        items: [
            { name: "Coins", href: "/top/coins" },
            { name: "Exchange", href: "/top/exchange" },
            { name: "Casinos", href: "/top/casinos" },
            { name: "Wallets", href: "/top/wallets" },
            { name: "Mining", href: "/top/mining" },

            { name: "DeFi", href: "/top/defi" },
            { name: "NFTs", href: "/top/nfts" },
        ]
    },
    more: {
        title: "MORE",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800&auto=format&fit=crop",
        items: [
            { name: "About Us", href: "/about" },
            { name: "Contact Us", href: "/contact" },
            { name: "Authors", href: "/authors" },
            { name: "Advertise", href: "/advertise" },
            { name: "AI Policy", href: "/ai-policy" },
            { name: "Editorial Policy", href: "/editorial-policy" },
            { name: "Events", href: "/events" },
        ]
    }
};

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
    const [hoveredItem, setHoveredItem] = React.useState<string | null>(null);
    const [expandedCategory, setExpandedCategory] = React.useState<string | null>(null);

    const toggleCategory = (key: string) => {
        setExpandedCategory(expandedCategory === key ? null : key);
    };

    return (
        <header className="sticky top-0 z-40 w-full border-b border-[#1f1f1f] bg-[#0a0a0a]/90 backdrop-blur-xl">
            <div className="container flex h-16 items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2 font-bold text-2xl tracking-tighter z-50">
                    <img src="/logo.png" alt="CoinGroww" className="h-10 w-10" />
                    <span className="text-yellow-500 font-poiret font-bold">CoinGroww</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center gap-1 h-full">
                    {Object.entries(navigation).map(([key, category]) => (
                        <div
                            key={key}
                            className="group h-full flex items-center"
                            onMouseEnter={() => setHoveredItem(key)}
                            onMouseLeave={() => setHoveredItem(null)}
                        >
                            <button
                                className={cn(
                                    "flex items-center gap-1 px-4 py-2 text-sm font-bold uppercase tracking-wider transition-all duration-300",
                                    hoveredItem === key ? "text-blue-500 bg-white/5" : "text-gray-300 hover:text-white"
                                )}
                            >
                                {category.title}
                                <ChevronDown className={cn(
                                    "h-3 w-3 transition-transform duration-300",
                                    hoveredItem === key ? "rotate-180" : ""
                                )} />
                            </button>

                            {/* Mega Menu Dropdown */}
                            <div
                                className={cn(
                                    "absolute left-0 top-16 w-full overflow-hidden bg-[#0a0a0a]/95 border-b border-[#1f1f1f] shadow-2xl backdrop-blur-3xl transition-all duration-300 origin-top",
                                    hoveredItem === key
                                        ? "opacity-100 translate-y-0 visible h-auto py-8"
                                        : "opacity-0 -translate-y-4 invisible h-0 py-0"
                                )}
                            >
                                <div className="container mx-auto">
                                    <div className="grid grid-cols-4 gap-8">
                                        {/* Section Title & Decorator */}
                                        <div className="col-span-1 border-r border-[#1f1f1f] pr-8 flex flex-col justify-between">
                                            <div>
                                                <h3 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-600 mb-4 tracking-tighter">
                                                    {category.title}
                                                </h3>
                                                <p className="text-sm text-gray-400">
                                                    Explore the latest {category.title.toLowerCase()} updates, analysis, and market movements.
                                                </p>
                                            </div>
                                            {/* @ts-ignore */}
                                            {category.image && (
                                                <div className="relative h-40 w-full rounded-lg overflow-hidden border border-white/10 group/image">
                                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10 opacity-60" />
                                                    {/* @ts-ignore */}
                                                    <img
                                                        src={category.image}
                                                        alt={category.title}
                                                        className="h-full w-full object-cover transition-transform duration-700 group-hover/image:scale-110"
                                                    />
                                                    <div className="absolute bottom-3 left-3 z-20">
                                                        <span className="text-xs font-bold text-blue-400 bg-black/50 backdrop-blur-md px-2 py-1 rounded border border-blue-500/30">
                                                            FEATURED
                                                        </span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Links Grid */}
                                        <div className="col-span-3 grid grid-cols-3 gap-y-4 gap-x-8">
                                            {category.items.map((item, index) => (
                                                <Link
                                                    key={item.href}
                                                    href={item.href}
                                                    className="group/link flex items-center space-x-3 p-3 rounded-lg hover:bg-white/5 transition-all duration-200"
                                                >
                                                    <div className="h-2 w-2 rounded-full bg-blue-500 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                                                    <span className="text-sm font-bold text-gray-300 group-hover/link:text-white group-hover/link:translate-x-1 transition-all">
                                                        {item.name}
                                                    </span>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Standalone Links */}
                    <Link href="/press-release" className="px-4 py-2 text-sm font-bold uppercase tracking-wider text-gray-300 hover:text-blue-500 transition-colors">
                        Press Release
                    </Link>
                    <Link href="/prediction" className="px-4 py-2 text-sm font-bold uppercase tracking-wider text-gray-300 hover:text-blue-500 transition-colors">
                        Price Prediction
                    </Link>
                    <Link href="/events" className="px-4 py-2 text-sm font-bold uppercase tracking-wider text-gray-300 hover:text-blue-500 transition-colors">
                        Events
                    </Link>
                </nav>

                {/* Mobile Menu Toggle */}
                <button
                    className="lg:hidden text-white"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Navigation Overlay */}
            {mobileMenuOpen && (
                <div className="lg:hidden absolute top-16 left-0 w-full h-[calc(100vh-4rem)] bg-background border-t border-[#1f1f1f] overflow-y-auto p-6">
                    <nav className="flex flex-col space-y-6">
                        {Object.entries(navigation).map(([key, category]) => (
                            <div key={key} className="border-b border-[#1f1f1f] pb-4 last:border-0">
                                <button
                                    className="flex w-full items-center justify-between py-2 text-lg font-bold text-blue-500 uppercase tracking-widest"
                                    onClick={() => toggleCategory(key)}
                                >
                                    {category.title}
                                    <ChevronDown className={cn(
                                        "h-5 w-5 transition-transform duration-300",
                                        expandedCategory === key ? "rotate-180" : ""
                                    )} />
                                </button>
                                <div className={cn(
                                    "grid grid-cols-2 gap-3 transition-all duration-300 overflow-hidden",
                                    expandedCategory === key ? "max-h-[500px] opacity-100 mt-4" : "max-h-0 opacity-0"
                                )}>
                                    {category.items.map((item) => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className="text-sm text-gray-300 hover:text-white"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                        <div className="border-t border-[#1f1f1f] pt-6 space-y-4">
                            <Link href="/press-release" className="block text-lg font-bold text-white uppercase">Press Release</Link>
                            <Link href="/prediction" className="block text-lg font-bold text-white uppercase">Price Prediction</Link>
                            <Link href="/events" className="block text-lg font-bold text-white uppercase">Events</Link>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}
