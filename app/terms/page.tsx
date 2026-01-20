import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, ScrollText } from 'lucide-react';

export const metadata: Metadata = {
    title: "Terms & Conditions - Coingroww",
    description: "Read the Terms & Conditions for using Coingroww. Information on usage, liability, and policies.",
};

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8 border-b border-border/40 bg-zinc-50/5 dark:bg-zinc-900/10">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="flex justify-center mb-6">
                        <div className="p-3 bg-primary/10 rounded-2xl">
                            <ScrollText className="w-10 h-10 text-primary" />
                        </div>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
                        Terms & Conditions
                    </h1>
                    <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                        Please read these terms carefully before using our platform. By accessing Coingroww, you agree to be bound by these policies.
                    </p>
                </div>
            </section>

            {/* Content Section */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                <div className="prose prose-zinc dark:prose-invert max-w-none space-y-12">
                    {/* Intro */}
                    <div className="p-6 bg-card border border-border rounded-xl shadow-sm">
                        <p className="text-base md:text-lg font-medium leading-relaxed">
                            By accessing and using Coingroww, you agree to comply with and be bound by the following Terms and Conditions. If you do not agree with any part of these terms, please discontinue use of this website.
                        </p>
                    </div>

                    <div className="grid gap-10">
                        <Section title="1. Use of Website">
                            All content published on Coingroww is provided for informational and educational purposes only. You agree to use this website responsibly and lawfully and not engage in any activity that disrupts, damages, or interferes with the website’s operation, security, or integrity.
                        </Section>

                        <Section title="2. No Financial Advice">
                            Nothing on Coingroww constitutes financial, investment, legal, or trading advice. Cryptocurrency markets are highly volatile and involve substantial risk. Users must conduct their own research and consult qualified professionals before making any financial decisions.
                        </Section>

                        <Section title="3. Intellectual Property">
                            All content, including articles, graphics, logos, designs, trademarks, layouts, and website elements, is the property of Coingroww unless otherwise stated and is protected by applicable intellectual property laws. You may not reproduce, distribute, republish, modify, or commercially exploit any content without prior written permission.
                        </Section>

                        <Section title="4. Accuracy of Information">
                            While we strive to ensure accuracy, Coingroww does not guarantee the completeness, reliability, or timeliness of any information published. Market conditions, technologies, and regulations may change rapidly, and we shall not be liable for losses resulting from reliance on any content.
                        </Section>

                        <Section title="5. Third-Party Links">
                            Our website may contain links to third-party websites, tools, or services. Coingroww does not control or endorse these websites and is not responsible for their content, policies, security practices, or availability. Users interact with third-party platforms at their own risk.
                        </Section>

                        <Section title="6. Sponsored Content & Advertising">
                            Some content on Coingroww may be sponsored, promotional, or affiliate-based and will be clearly labeled. Sponsored content does not reflect the editorial opinions of Coingroww. We do not guarantee or endorse any third-party products, services, or platforms.
                        </Section>

                        <Section title="7. Limitation of Liability">
                            To the fullest extent permitted by law, Coingroww, its owners, affiliates, contributors, and partners shall not be liable for any direct, indirect, incidental, consequential, or special damages arising from the use of this website or reliance on its content.
                        </Section>

                        <Section title="8. User Conduct">
                            <p className="mb-4">Users must not:</p>
                            <ul className="list-disc pl-6 space-y-2 marker:text-primary">
                                <li>Post or transmit misleading, defamatory, unlawful, or harmful content</li>
                                <li>Attempt unauthorized access to the website or its systems</li>
                                <li>Use the website for fraudulent, deceptive, or abusive activities</li>
                                <li>Disrupt the website’s security, performance, or services</li>
                            </ul>
                            <p className="mt-4 text-sm text-destructive font-medium">
                                Violation of these terms may result in access restriction or termination.
                            </p>
                        </Section>

                        <Section title="9. Changes to Terms">
                            Coingroww reserves the right to update or modify these Terms and Conditions at any time without prior notice. Continued use of the website after changes constitutes acceptance of the revised terms.
                        </Section>

                        <Section title="10. Governing Law">
                            These Terms and Conditions shall be governed by and interpreted in accordance with applicable laws, without regard to conflict of law principles.
                        </Section>

                        <Section title="11. Contact Information">
                            For questions regarding these Terms and Conditions, please <Link href="/contact" className="text-primary hover:underline font-medium">contact us</Link>.
                        </Section>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
                {title}
            </h2>
            <div className="text-muted-foreground leading-7 text-lg">
                {children}
            </div>
            <div className="h-px bg-border/50 w-full mt-8" />
        </section>
    );
}
