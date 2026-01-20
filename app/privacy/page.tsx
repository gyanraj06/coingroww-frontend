import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Lock, Shield, Eye, Database, Globe, UserCheck, Cookie } from 'lucide-react';

export const metadata: Metadata = {
    title: "Privacy Policy - Coingroww",
    description: "Learn how Coingroww collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8 border-b border-border/40 bg-zinc-50/5 dark:bg-zinc-900/10">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="flex justify-center mb-6">
                        <div className="p-3 bg-primary/10 rounded-2xl">
                            <Lock className="w-10 h-10 text-primary" />
                        </div>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
                        Privacy Policy
                    </h1>
                    <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                        At Coingroww, we respect your privacy and are committed to protecting your personal information. This policy explains our data practices.
                    </p>
                </div>
            </section>

            {/* Content Section */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                <div className="prose prose-zinc dark:prose-invert max-w-none space-y-12">

                    <div className="grid gap-10">
                        <Section title="1. Information We Collect" icon={<Database className="w-5 h-5 text-primary" />}>
                            <p className="mb-4">We may collect the following types of information:</p>
                            <ul className="list-disc pl-6 space-y-2 marker:text-primary">
                                <li><strong className="text-foreground">Personal Information:</strong> Name, email address, or other details voluntarily provided through contact forms, newsletter subscriptions, or inquiries.</li>
                                <li><strong className="text-foreground">Non-Personal Information:</strong> Browser type, device information, IP address, pages visited, time spent on the website, and referral sources.</li>
                                <li><strong className="text-foreground">Cookies & Tracking Technologies:</strong> Used to improve website performance, analyze traffic, and enhance user experience.</li>
                            </ul>
                        </Section>

                        <Section title="2. How We Use Your Information" icon={<UserCheck className="w-5 h-5 text-primary" />}>
                            <p className="mb-4">We use collected information to:</p>
                            <ul className="list-disc pl-6 space-y-2 marker:text-primary">
                                <li>Provide and improve website services and content</li>
                                <li>Respond to inquiries and communications</li>
                                <li>Send newsletters or updates (if subscribed)</li>
                                <li>Monitor website performance and analytics</li>
                                <li>Ensure website security and prevent misuse</li>
                            </ul>
                        </Section>

                        <Section title="3. Cookies & Analytics" icon={<Cookie className="w-5 h-5 text-primary" />}>
                            Coingroww uses cookies and third-party analytics tools to understand user behavior and improve site functionality. You may disable cookies through your browser settings, though some website features may not function properly.
                        </Section>

                        <Section title="4. Data Sharing & Disclosure" icon={<Eye className="w-5 h-5 text-primary" />}>
                            <p className="mb-4">We do not sell, trade, or rent personal information to third parties. Information may be shared only:</p>
                            <ul className="list-disc pl-6 space-y-2 marker:text-primary">
                                <li>With trusted service providers assisting in website operations</li>
                                <li>To comply with legal obligations or law enforcement requests</li>
                                <li>To protect the rights, safety, and security of Coingroww and its users</li>
                            </ul>
                        </Section>

                        <Section title="5. Third-Party Links" icon={<Globe className="w-5 h-5 text-primary" />}>
                            Our website may contain links to third-party websites. Coingroww is not responsible for the privacy practices, content, or security policies of external websites. Users should review third-party privacy policies independently.
                        </Section>

                        <Section title="6. Data Security" icon={<Shield className="w-5 h-5 text-primary" />}>
                            We implement reasonable technical and organizational measures to protect personal data against unauthorized access, misuse, alteration, or disclosure. However, no online transmission or storage method is completely secure, and we cannot guarantee absolute security.
                        </Section>

                        <Section title="7. User Rights">
                            <p className="mb-4">Depending on applicable laws, you may have the right to:</p>
                            <ul className="list-disc pl-6 space-y-2 marker:text-primary">
                                <li>Access, update, or delete your personal information</li>
                                <li>Withdraw consent for data processing</li>
                                <li>Request information about how your data is used</li>
                            </ul>
                            <p className="mt-4">Requests may be submitted via the contact information below.</p>
                        </Section>

                        <Section title="8. Data Retention">
                            We retain personal data only for as long as necessary to fulfill the purposes outlined in this policy or as required by applicable laws.
                        </Section>

                        <Section title="9. Children’s Privacy">
                            Coingroww does not knowingly collect personal information from individuals under the age of 13. If such data is discovered, it will be deleted promptly.
                        </Section>

                        <Section title="10. Changes to This Policy">
                            We reserve the right to update or modify this Privacy Policy at any time without prior notice. Changes become effective immediately upon posting on this page. Continued use of the website constitutes acceptance of the updated policy.
                        </Section>

                        <Section title="11. Contact Information">
                            If you have any questions about this Privacy Policy or how your data is handled, please <Link href="/contact" className="text-primary hover:underline font-medium">contact us</Link>.
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
