import React from 'react';
import type { Metadata } from 'next';
import { Mail, Briefcase, Megaphone, LifeBuoy, MessageSquare } from 'lucide-react';
import { ContactForm } from '@/components/contact-form';

export const metadata: Metadata = {
    title: "Contact Us - Coingroww",
    description: "Get in touch with the Coingroww team for editorial inquiries, advertising, partnerships, and support.",
};

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8 border-b border-border/40 bg-zinc-50/5 dark:bg-zinc-900/10">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="flex justify-center mb-6">
                        <div className="p-3 bg-primary/10 rounded-2xl">
                            <MessageSquare className="w-10 h-10 text-primary" />
                        </div>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
                        Contact Us
                    </h1>
                    <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                        At Coingroww, we value transparent communication and meaningful engagement with our readers,
                        partners, and stakeholders. We encourage you to reach out to us for inquiries related to editorial
                        content, corrections, collaborations, advertising opportunities, partnerships, press coverage, or
                        technical support.
                    </p>
                </div>
            </section>

            {/* Contact Cards Grid */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid md:grid-cols-2 gap-6">
                    <ContactCard
                        icon={<Mail className="w-6 h-6 text-blue-500" />}
                        title="General Inquiries & Editorial Support"
                        email="contact@coingroww.com"
                        color="bg-blue-500/10"
                    />
                    <ContactCard
                        icon={<Briefcase className="w-6 h-6 text-purple-500" />}
                        title="Advertising, Sponsorships & Business Partnerships"
                        email="business@coingroww.com"
                        color="bg-purple-500/10"
                    />
                    <ContactCard
                        icon={<Megaphone className="w-6 h-6 text-orange-500" />}
                        title="Press Releases & Media Relations"
                        email="press@coingroww.com"
                        color="bg-orange-500/10"
                    />
                    <ContactCard
                        icon={<LifeBuoy className="w-6 h-6 text-green-500" />}
                        title="Technical Support & Website Assistance"
                        email="support@coingroww.com"
                        color="bg-green-500/10"
                    />
                </div>

                {/* Contact Form Details */}
                <ContactForm />

                {/* Closing Section */}
                <div className="mt-16 max-w-3xl mx-auto text-center space-y-4">
                    <p className="text-muted-foreground">
                        We strive to respond to all genuine inquiries. While we may not be able to reply to every message,
                        we carefully review all communications and prioritize matters requiring immediate attention.
                    </p>
                    <p className="text-foreground font-medium">
                        Coingroww is committed to professionalism, transparency, and trust, and we appreciate your interest
                        in connecting with our team.
                    </p>
                </div>
            </div>
        </div>
    );
}

function ContactCard({ icon, title, email, color }: { icon: React.ReactNode, title: string, email: string, color: string }) {
    return (
        <div className="bg-card border border-border rounded-xl p-6 flex flex-col items-center text-center hover:shadow-md transition-all duration-300 group">
            <div className={`p-4 rounded-full ${color} mb-4 group-hover:scale-110 transition-transform`}>
                {icon}
            </div>
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <a href={`mailto:${email}`} className="text-primary hover:text-primary/80 font-medium transition-colors">
                {email}
            </a>
        </div>
    );
}
