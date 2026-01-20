import React from 'react';
import type { Metadata } from 'next';
import {
    PenTool,
    ShieldCheck,
    SearchCheck,
    Scale,
    Eye,
    AlertTriangle,
    RefreshCw,
    Bot,
    Users,
    FileText
} from 'lucide-react';

export const metadata: Metadata = {
    title: "Editorial Policy - Coingroww",
    description: "Our commitment to accurate, transparent, and responsible cryptocurrency journalism.",
};

export default function EditorialPolicyPage() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8 border-b border-border/40 bg-zinc-50/5 dark:bg-zinc-900/10">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="flex justify-center mb-6">
                        <div className="p-3 bg-primary/10 rounded-2xl">
                            <PenTool className="w-10 h-10 text-primary" />
                        </div>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
                        Editorial Policy
                    </h1>
                    <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                        At Coingroww, we are committed to delivering accurate, transparent, and responsible cryptocurrency and blockchain journalism.
                    </p>
                </div>
            </section>

            {/* Content Section */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                <div className="prose prose-zinc dark:prose-invert max-w-none space-y-12">

                    <div className="grid gap-10">
                        {/* 1. Editorial Independence */}
                        <Section title="1. Editorial Independence" icon={<ShieldCheck className="w-5 h-5 text-blue-500" />}>
                            Our editorial decisions are made independently and are not influenced by advertisers, sponsors, partners, or external stakeholders. Sponsored or promotional content is clearly labeled and does not affect our editorial judgment.
                        </Section>

                        {/* 2. Accuracy & Verification */}
                        <Section title="2. Accuracy & Verification" icon={<SearchCheck className="w-5 h-5 text-green-500" />}>
                            We strive to ensure that all content is accurate, factual, and supported by reliable sources. Our writers and editors verify information before publication and correct errors promptly when identified.
                        </Section>

                        {/* 3. Fairness & Objectivity */}
                        <Section title="3. Fairness & Objectivity" icon={<Scale className="w-5 h-5 text-purple-500" />}>
                            We aim to present balanced, unbiased, and objective reporting. Opinions, market analysis, and commentary are clearly distinguished from factual news reporting.
                        </Section>

                        {/* 4. Transparency & Disclosure */}
                        <Section title="4. Transparency & Disclosure" icon={<Eye className="w-5 h-5 text-teal-500" />}>
                            Any sponsored content, affiliate links, or paid partnerships are clearly disclosed. We maintain transparency in our content creation processes and business relationships.
                        </Section>

                        {/* 5. No Financial Advice */}
                        <Section title="5. No Financial Advice" icon={<AlertTriangle className="w-5 h-5 text-orange-500" />}>
                            All content on Coingroww is provided for informational and educational purposes only and does not constitute financial, investment, legal, or trading advice.
                        </Section>

                        {/* 6. Ethical Standards */}
                        <Section title="6. Ethical Standards">
                            We do not publish misleading, deceptive, or manipulative content. We avoid sensationalism, exaggerated claims, and unverified market predictions. Our reporting adheres to ethical journalism standards.
                        </Section>

                        {/* 7. Corrections & Updates */}
                        <Section title="7. Corrections & Updates" icon={<RefreshCw className="w-5 h-5 text-indigo-500" />}>
                            If inaccuracies are identified, we promptly correct or update content and clearly acknowledge corrections where appropriate.
                        </Section>

                        {/* 8. Use of AI Tools */}
                        <Section title="8. Use of AI Tools" icon={<Bot className="w-5 h-5 text-pink-500" />}>
                            We may use AI tools to assist with research, drafting, or editing, but all AI-assisted content is reviewed by human editors to ensure accuracy, relevance, and compliance with our editorial standards.
                        </Section>

                        {/* 9. Reader Trust & Responsibility */}
                        <Section title="9. Reader Trust & Responsibility" icon={<Users className="w-5 h-5 text-cyan-500" />}>
                            We prioritize reader trust and strive to provide content that is informative, responsible, and helpful. Readers are encouraged to conduct independent research before making financial decisions.
                        </Section>

                        {/* 10. Policy Updates */}
                        <Section title="10. Policy Updates" icon={<FileText className="w-5 h-5 text-gray-500" />}>
                            This Editorial Policy may be updated periodically to reflect evolving standards, regulations, or business practices. Continued use of the website constitutes acceptance of the updated policy.
                        </Section>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Section({ title, icon, children }: { title: string; icon?: React.ReactNode; children: React.ReactNode }) {
    return (
        <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-3">
                {icon}
                {title}
            </h2>
            <div className="text-muted-foreground leading-7 text-lg">
                {children}
            </div>
            <div className="h-px bg-border/50 w-full mt-8" />
        </section>
    );
}
