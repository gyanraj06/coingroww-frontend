import React from 'react';
import type { Metadata } from 'next';
import {
    Newspaper,
    BarChart3,
    Blocks,
    Scale,
    BookOpen,
    Eye,
    Target,
    Shield,
    Users
} from "lucide-react";

export const metadata: Metadata = {
    title: "About Coingroww - Next-Gen Crypto & Blockchain Media",
    description: "Coingroww is a next-generation crypto and blockchain media platform launched in 2026 with a mission to make digital finance simple, transparent, and accessible for everyone.",
};

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative overflow-hidden py-12 md:py-20 px-4 sm:px-6 lg:px-8 border-b border-border/40">
                <div className="absolute inset-0 bg-secondary/20 pointer-events-none -z-10" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background -z-10" />

                <div className="max-w-5xl mx-auto text-center">
                    <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                        About Coingroww
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                        Coingroww is a next-generation crypto and blockchain media platform launched in 2026 with a mission to make digital finance simple, transparent, and accessible for everyone.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-16 md:space-y-24">

                {/* Introduction */}
                <section className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                    <div className="space-y-6">
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Staying Informed in a Fast-Moving World</h2>
                        <div className="space-y-4 text-muted-foreground">
                            <p>
                                We deliver timely cryptocurrency news, market insights, blockchain trends, and educational content to help readers stay informed in the fast-moving world of Web3, decentralized finance, and digital assets.
                            </p>
                            <p>
                                Our focus is on <span className="text-foreground font-medium">accuracy, clarity, and credibility</span> — without hype or misleading claims.
                            </p>
                        </div>
                    </div>
                    <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm relative overflow-hidden group">
                        <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all duration-500" />
                        <p className="text-base sm:text-lg font-medium leading-relaxed relative z-10">
                            "At Coingroww, we believe informed decisions begin with reliable information. Our content is designed for both beginners exploring crypto for the first time and experienced traders seeking market intelligence."
                        </p>
                    </div>
                </section>

                {/* What We Cover */}
                <section>
                    <div className="text-center mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">What We Cover</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Comprehensive coverage of the digital asset ecosystem.
                        </p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <CoverCard
                            icon={<Newspaper className="w-6 h-6 text-primary" />}
                            title="Cryptocurrency News"
                            description="Timely updates on the latest happenings in the crypto world."
                        />
                        <CoverCard
                            icon={<BarChart3 className="w-6 h-6 text-primary" />}
                            title="Market Analysis"
                            description="Deep dives into Bitcoin, Ethereum, and altcoin market trends."
                        />
                        <CoverCard
                            icon={<Blocks className="w-6 h-6 text-primary" />}
                            title="Blockchain & Web3"
                            description="Exploring the technology driving the future of the internet."
                        />
                        <CoverCard
                            icon={<Scale className="w-6 h-6 text-primary" />}
                            title="Regulatory Insights"
                            description="Keeping you ahead of global regulatory developments."
                        />
                        <CoverCard
                            icon={<BookOpen className="w-6 h-6 text-primary" />}
                            title="Educational Guides"
                            description="Clear explainers for beginners and experts alike."
                        />
                    </div>
                </section>

                {/* Our Mission */}
                <section className="bg-secondary/30 rounded-3xl p-6 sm:p-8 md:p-12 text-center relative overflow-hidden">
                    {/* Decorative radial gradient */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent opacity-50" />

                    <div className="relative z-10 max-w-3xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">Our Mission</h2>
                        <p className="text-lg sm:text-xl md:text-2xl font-medium leading-relaxed text-foreground">
                            To empower readers with trustworthy, easy-to-understand crypto information that supports smarter financial awareness — <span className="text-muted-foreground line-through decoration-destructive/50">not financial advice</span>.
                        </p>
                    </div>
                </section>

                {/* Our Values */}
                <section>
                    <div className="text-center mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">Our Values</h2>
                        <p className="text-muted-foreground">The core principles that guide our reporting.</p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <ValueCard
                            icon={<Eye className="w-8 h-8 mb-4 text-primary" />}
                            title="Transparency"
                        />
                        <ValueCard
                            icon={<Target className="w-8 h-8 mb-4 text-primary" />}
                            title="Accuracy"
                        />
                        <ValueCard
                            icon={<Shield className="w-8 h-8 mb-4 text-primary" />}
                            title="Independence"
                        />
                        <ValueCard
                            icon={<Users className="w-8 h-8 mb-4 text-primary" />}
                            title="User-First"
                        />
                    </div>
                </section>

                {/* Disclaimer/Footer Note */}
                <section className="border-t border-border pt-8 pb-6 md:pt-12 md:pb-8 text-center">
                    <p className="text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Coingroww operates as an independent digital media platform and does not provide investment advisory services. All content is published for informational and educational purposes only.
                    </p>
                </section>
            </div>
        </div>
    );
}

function CoverCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <div className="bg-card hover:bg-muted/50 transition-colors border border-border p-6 rounded-xl flex flex-col h-full">
            <div className="mb-4 bg-background w-12 h-12 rounded-lg border border-border flex items-center justify-center shadow-sm">
                {icon}
            </div>
            <h3 className="font-semibold text-lg mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
        </div>
    );
}

function ValueCard({ icon, title }: { icon: React.ReactNode, title: string }) {
    return (
        <div className="bg-card hover:-translate-y-1 transition-transform duration-300 border border-border p-6 md:p-8 rounded-xl flex flex-col items-center justify-center text-center h-full shadow-sm hover:shadow-md">
            <div className="bg-secondary/50 p-3 rounded-full mb-4">
                {icon}
            </div>
            <h3 className="font-semibold text-lg md:text-xl">{title}</h3>
        </div>
    );
}
