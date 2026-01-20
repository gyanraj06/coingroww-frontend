import React from 'react';
import type { Metadata } from 'next';
import {
    Users,
    Award,
    BookOpen
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
                        At Coingroww, our team is dedicated to delivering accurate, insightful, and timely information on cryptocurrency, blockchain, and digital finance.
                    </p>
                </div>
            </section>

            {/* Expertise Section */}
            <section className="py-12 border-b border-border/40">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold flex items-center gap-2">
                                <Award className="w-6 h-6 text-primary" />
                                Expertise & Experience
                            </h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Our authors include cryptocurrency analysts, blockchain researchers, fintech experts, and professional writers with hands-on experience in digital assets and market trends. They provide in-depth analysis, explain complex concepts, and help readers make informed decisions.
                            </p>
                        </div>
                        <div className="bg-card border border-border p-6 rounded-2xl shadow-sm">
                            <h3 className="font-semibold mb-4 text-lg">Our Commitment</h3>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <BookOpen className="w-5 h-5 text-blue-500 mt-1" />
                                    <p className="text-sm text-muted-foreground">Each member brings deep industry knowledge and research expertise.</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Users className="w-5 h-5 text-green-500 mt-1" />
                                    <p className="text-sm text-muted-foreground">A shared passion for educating readers about the fast-evolving crypto ecosystem.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Authors Grid */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <h2 className="text-3xl font-bold mb-12 text-center">Meet The Team</h2>
                <div className="grid md:grid-cols-3 gap-8">

                    <AuthorCard
                        name="Shubham Patel"
                        role="News Editor"
                        bio="Shubham leads Coingroww’s news coverage, ensuring timely, factual, and well-researched reporting on cryptocurrency markets, blockchain developments, and industry trends. His focus is on delivering clear, reliable updates."
                        initials="SP"
                        color="bg-blue-500/10 text-blue-500"
                    />

                    <AuthorCard
                        name="Deeksha Vishwakarma"
                        role="Senior Editor"
                        bio="Deeksha oversees editorial quality and content standards across the platform. With a strong emphasis on accuracy, structure, and reader value, she ensures all published content aligns with Coingroww’s editorial policies."
                        initials="DV"
                        color="bg-purple-500/10 text-purple-500"
                    />

                    <AuthorCard
                        name="Ayush Yadav"
                        role="Key Editor"
                        bio="Ayush plays a central role in shaping content strategy and market analysis coverage. He works closely with writers and contributors to produce insightful, data-driven articles that add depth and clarity to complex crypto topics."
                        initials="AY"
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
            <div className={`w - 20 h - 20 rounded - full ${color} flex items - center justify - center text - 2xl font - bold mb - 4 group - hover: scale - 110 transition - transform`}>
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
