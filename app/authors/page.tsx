import React from 'react';
import type { Metadata } from 'next';
import {
    Users,
    Award
} from 'lucide-react';

export const metadata: Metadata = {
    title: "Our Authors - Coingroww",
    description: "Meet the team of experts, analysts, and editors behind Coingroww's cryptocurrency and blockchain coverage.",
};

export default function AuthorsPage() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8 border-b border-border/40 bg-zinc-50/5 dark:bg-zinc-900/10">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="flex justify-center mb-6">
                        <div className="p-3 bg-primary/10 rounded-2xl">
                            <Users className="w-10 h-10 text-primary" />
                        </div>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
                        About Our Authors
                    </h1>
                    <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                        At Coingroww, our team of authors is dedicated to delivering accurate, insightful, and timely
                        information on cryptocurrency, blockchain, and digital finance. Each member of our team brings a
                        combination of industry knowledge, research expertise, and a passion for educating readers about
                        the fast-evolving crypto ecosystem.
                    </p>
                </div>
            </section>

            {/* Expertise Section */}
            <section className="py-12 border-b border-border/40">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Award className="w-6 h-6 text-primary" />
                        <h2 className="text-2xl font-bold">
                            Expertise & Experience
                        </h2>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                        Our authors include cryptocurrency analysts, blockchain researchers, fintech experts, and
                        professional writers with hands-on experience in digital assets and market trends. They provide
                        in-depth analysis, explain complex concepts, and help readers make informed decisions.
                    </p>
                </div>
            </section>

            {/* Authors Grid */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <h2 className="text-3xl font-bold mb-12 text-center">Meet The Team</h2>
                <div className="grid md:grid-cols-3 gap-8">

                    <AuthorCard
                        name="Drishti"
                        role="Senior Editor"
                        bio="Drishti serves as Senior Editor at Coingroww, overseeing editorial strategy, content quality, and publication standards across the platform. She leads content planning, reviews high-impact articles, ensures factual accuracy, and maintains compliance with editorial and ethical guidelines. Her role focuses on shaping Coingroww’s voice, strengthening credibility, and delivering in-depth, reliable crypto journalism to a global audience."
                        initials="D"
                        color="bg-purple-500/10 text-purple-500"
                    />

                    <AuthorCard
                        name="Shubh"
                        role="News Editor"
                        bio="Shubh is the News Editor at Coingroww, responsible for real-time coverage of cryptocurrency markets, blockchain developments, regulatory updates, and industry announcements. He manages breaking news, verifies sources, coordinates newsroom workflows, and ensures timely, accurate reporting. His work plays a critical role in keeping readers informed with fast, trustworthy, and relevant crypto updates."
                        initials="S"
                        color="bg-blue-500/10 text-blue-500"
                    />

                    <AuthorCard
                        name="Aryan"
                        role="Key Editor"
                        bio="Aryan works as Key Editor at Coingroww, contributing to editorial direction, feature development, and content optimization. He focuses on in-depth research, analytical storytelling, and maintaining editorial consistency across major content categories. Aryan ensures that complex crypto concepts are presented clearly while supporting long-term content growth and audience engagement."
                        initials="A"
                        color="bg-orange-500/10 text-orange-500"
                    />

                </div>
            </div>
        </div>
    );
}

function AuthorCard({ name, role, bio, initials, color }: { name: string, role: string, bio: string, initials: string, color: string }) {
    return (
        <div className="bg-card border border-border rounded-xl p-6 flex flex-col items-center text-center hover:shadow-md transition-all duration-300 group">
            <div className={`w-20 h-20 rounded-full ${color} flex items-center justify-center text-2xl font-bold mb-4 group-hover:scale-110 transition-transform`}>
                {initials}
            </div>
            <h3 className="text-xl font-bold text-foreground mb-1">{name}</h3>
            <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full mb-4">
                {role}
            </span>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                {bio}
            </p>
        </div>
    );
}
