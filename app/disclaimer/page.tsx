import React from 'react';
import type { Metadata } from 'next';
import { AlertTriangle, Info, TrendingUp, ShieldAlert, FileWarning } from 'lucide-react';

export const metadata: Metadata = {
    title: "Disclaimer - Coingroww",
    description: "Read the Coingroww disclaimer regarding financial advice, market volatility, and liability.",
};

export default function DisclaimerPage() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8 border-b border-border/40 bg-zinc-50/5 dark:bg-zinc-900/10">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="flex justify-center mb-6">
                        <div className="p-3 bg-primary/10 rounded-2xl">
                            <AlertTriangle className="w-10 h-10 text-primary" />
                        </div>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
                        Disclaimer
                    </h1>
                    <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                        Please read this important information regarding the content and services provided on Coingroww.
                    </p>
                </div>
            </section>

            {/* Content Section */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                <div className="prose prose-zinc dark:prose-invert max-w-none space-y-10">

                    {/* General Info / No Advice */}
                    <div className="p-6 bg-card border border-border rounded-xl shadow-sm space-y-4">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <Info className="w-5 h-5 text-blue-500" />
                            No Financial Advice
                        </h2>
                        <p className="leading-relaxed text-muted-foreground">
                            The information provided on Coingroww is for <strong className="text-foreground">general informational and educational purposes only</strong> and should not be considered financial, investment, trading, legal, or tax advice. Nothing published on this website constitutes a recommendation to buy, sell, hold, or invest in any cryptocurrency, digital asset, security, or financial product.
                        </p>
                    </div>

                    {/* Volatility & Risk */}
                    <Section title="Market Risk & Volatility" icon={<TrendingUp className="w-6 h-6 text-red-500" />}>
                        Cryptocurrency markets are highly volatile and involve substantial risk, including the possible loss of your entire investment. You are solely responsible for your financial decisions and should conduct your own research (DYOR) and consult with licensed financial advisors or other qualified professionals before making any investment or trading decisions.
                    </Section>

                    {/* Accuracy & Warranties */}
                    <Section title="Accuracy of Information">
                        While Coingroww strives to ensure that the information presented is accurate and up to date, we make no representations or warranties of any kind regarding the completeness, reliability, accuracy, or availability of any content. Market conditions, regulations, and technologies change rapidly, and information may become outdated without notice.
                    </Section>

                    {/* Liability */}
                    <Section title="Limitation of Liability" icon={<ShieldAlert className="w-6 h-6 text-orange-500" />}>
                        Coingroww shall not be held liable for any direct, indirect, incidental, consequential, or financial losses or damages arising from the use of or reliance on any information published on this website, including but not limited to trading losses, business losses, or data loss.
                    </Section>

                    {/* Opinions */}
                    <Section title="Opinions & Forecasts">
                        Any opinions, views, forecasts, price predictions, or analyses expressed on the website are those of the respective authors and do not necessarily reflect the views of Coingroww. Past performance does not guarantee future results.
                    </Section>

                    {/* Third Party */}
                    <Section title="Third-Party Links">
                        This website may contain links to third-party websites or services. Coingroww does not endorse, control, or assume responsibility for any third-party content, products, services, or practices.
                    </Section>

                    {/* Agreement */}
                    <div className="mt-12 pt-8 border-t border-border text-center">
                        <p className="text-lg font-medium text-foreground flex flex-col items-center gap-3">
                            <FileWarning className="w-8 h-8 text-primary/80" />
                            By accessing and using this website, you acknowledge that you have read, understood, and agreed to this Disclaimer.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Section({ title, icon, children }: { title: string; icon?: React.ReactNode; children: React.ReactNode }) {
    return (
        <section className="space-y-3">
            <h3 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-3">
                {icon}
                {title}
            </h3>
            <p className="text-muted-foreground leading-7 text-lg">
                {children}
            </p>
        </section>
    );
}
