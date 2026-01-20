import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
    Globe2,
    FileText,
    Monitor,
    Users,
    ShieldCheck,
    Rocket,
    Award,
    Mail
} from 'lucide-react';

export const metadata: Metadata = {
    title: "Advertise With Us - Coingroww",
    description: "Reach a global audience of crypto investors and blockchain enthusiasts. Explore our advertising solutions.",
};

export default function AdvertisePage() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8 border-b border-border/40">
                <div className="absolute inset-0 bg-primary/5 pointer-events-none -z-10" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background -z-10" />

                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                        Advertise With Us
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                        Connect with a worldwide audience of crypto investors, traders, developers, and blockchain enthusiasts.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">

                {/* Key Benefits Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <FeatureCard
                        icon={<Globe2 className="w-8 h-8 text-blue-500" />}
                        title="Targeted Global Reach"
                        description="Connect with a worldwide audience of crypto investors, traders, developers, and blockchain enthusiasts across emerging and established markets."
                    />
                    <FeatureCard
                        icon={<FileText className="w-8 h-8 text-green-500" />}
                        title="Sponsored Content"
                        description="Professionally written, SEO-optimized articles that deliver long-term visibility and brand credibility."
                    />
                    <FeatureCard
                        icon={<Monitor className="w-8 h-8 text-purple-500" />}
                        title="Display Advertising"
                        description="Premium ad placements across homepage, category pages, and high-traffic articles."
                    />
                    <FeatureCard
                        icon={<Users className="w-8 h-8 text-orange-500" />}
                        title="partnerships"
                        description="Media partnerships, brand collaborations, event promotions, product launches, and strategic interviews."
                    />
                    <FeatureCard
                        icon={<Rocket className="w-8 h-8 text-red-500" />}
                        title="Performance-Driven"
                        description="Content amplified through organic search, social media channels, and community outreach."
                    />
                    <FeatureCard
                        icon={<ShieldCheck className="w-8 h-8 text-teal-500" />}
                        title="Compliance"
                        description="All sponsored content is clearly labeled and follows global advertising and disclosure standards."
                    />
                </div>

                {/* Trust Section */}
                <section className="bg-card border border-border rounded-3xl p-8 md:p-12 text-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-secondary/30 transition-colors group-hover:bg-secondary/50 -z-10" />
                    <div className="max-w-3xl mx-auto space-y-6">
                        <Award className="w-16 h-16 text-primary mx-auto mb-4" />
                        <h2 className="text-3xl font-bold tracking-tight">Trusted Editorial Environment</h2>
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            Your brand is promoted within a credible, reader-focused platform built on accuracy and integrity.
                        </p>
                    </div>
                </section>

                {/* Contact CTA */}
                <section className="text-center space-y-8 pb-8">
                    <h2 className="text-3xl font-bold">Ready to Grow with Us?</h2>
                    <p className="text-muted-foreground text-lg">
                        For advertising opportunities and partnership inquiries, get in touch with our team.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 shadow-lg shadow-primary/20"
                    >
                        <Mail className="w-5 h-5" />
                        Contact Us
                    </Link>
                </section>
            </div>
        </div>
    );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <div className="bg-card hover:bg-muted/30 border border-border p-8 rounded-2xl flex flex-col items-start transition-all duration-300 hover:shadow-lg">
            <div className="bg-background border border-border p-3 rounded-xl mb-6 shadow-sm">
                {icon}
            </div>
            <h3 className="font-bold text-xl mb-3 capitalize">{title}</h3>
            <p className="text-muted-foreground leading-relaxed">{description}</p>
        </div>
    );
}
