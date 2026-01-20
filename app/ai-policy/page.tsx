import React from 'react';
import type { Metadata } from 'next';
import {
    Bot,
    UserCheck,
    AlertTriangle,
    Sparkles,
    Shield,
    Scale
} from 'lucide-react';

export const metadata: Metadata = {
    title: "AI Policy - Coingroww",
    description: "Learn about Coingroww's ethical use of artificial intelligence in content creation and operations.",
};

export default function AIPolicyPage() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8 border-b border-border/40 bg-zinc-50/5 dark:bg-zinc-900/10">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="flex justify-center mb-6">
                        <div className="p-3 bg-primary/10 rounded-2xl">
                            <Bot className="w-10 h-10 text-primary" />
                        </div>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
                        AI Policy
                    </h1>
                    <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                        At Coingroww, we use artificial intelligence (AI) tools to enhance efficiency while maintaining high standards of accuracy, transparency, and editorial integrity.
                    </p>
                </div>
            </section>

            {/* Content Section */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                <div className="prose prose-zinc dark:prose-invert max-w-none space-y-12">

                    <div className="grid gap-10">
                        {/* 1. Use of AI */}
                        <Section title="1. Use of AI" icon={<Sparkles className="w-5 h-5 text-blue-500" />}>
                            <p className="mb-4">AI technologies may assist in:</p>
                            <ul className="list-disc pl-6 space-y-2 marker:text-primary">
                                <li>Drafting, summarizing, or editing content</li>
                                <li>Analyzing data and trends</li>
                                <li>Improving content structure, readability, and efficiency</li>
                            </ul>
                            <p className="mt-4 text-muted-foreground italic">
                                All AI-assisted content is reviewed by human editors before publication to ensure accuracy, relevance, and compliance with editorial standards.
                            </p>
                        </Section>

                        {/* 2. Human Oversight */}
                        <Section title="2. Human Oversight" icon={<UserCheck className="w-5 h-5 text-green-500" />}>
                            Human judgment remains central to our editorial process. AI-generated outputs are verified, fact-checked, and refined by qualified editors. Final responsibility for all published content rests with Coingroww’s editorial team.
                        </Section>

                        {/* 3. Accuracy & Reliability */}
                        <Section title="3. Accuracy & Reliability" icon={<AlertTriangle className="w-5 h-5 text-orange-500" />}>
                            While AI tools improve efficiency, they may generate errors or incomplete information. Coingroww does not guarantee the accuracy of AI-assisted content and encourages readers to independently verify important information.
                        </Section>

                        {/* 4. Transparency */}
                        <Section title="4. Transparency">
                            Where appropriate, Coingroww may disclose the use of AI tools in content production. AI-generated or AI-assisted content does not replace original journalism, research, or editorial responsibility.
                        </Section>

                        {/* 5. Data Privacy & Security */}
                        <Section title="5. Data Privacy & Security" icon={<Shield className="w-5 h-5 text-purple-500" />}>
                            We do not input confidential, sensitive, or personal user data into AI systems in violation of our Privacy Policy. All data usage follows applicable data protection laws and ethical standards.
                        </Section>

                        {/* 6. Ethical Use */}
                        <Section title="6. Ethical Use" icon={<Scale className="w-5 h-5 text-red-500" />}>
                            <p className="mb-4">Coingroww does not use AI to:</p>
                            <ul className="list-disc pl-6 space-y-2 marker:text-destructive">
                                <li>Mislead users</li>
                                <li>Manipulate markets</li>
                                <li>Generate deceptive content</li>
                                <li>Imitate individuals or organizations</li>
                            </ul>
                            <p className="mt-4 font-medium text-foreground">
                                AI tools are used responsibly to support trustworthy and ethical publishing.
                            </p>
                        </Section>

                        {/* 7. Policy Updates */}
                        <Section title="7. Policy Updates">
                            This AI Policy may be updated periodically to reflect changes in technology, regulations, or operational practices. Continued use of the website constitutes acceptance of the updated policy.
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
