"use client";

import React, { useState, useRef } from 'react';
import { Send, User, Mail, MessageSquare, StickyNote, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';

export function ContactForm() {
    const form = useRef<HTMLFormElement>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
        const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
        const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

        if (!serviceId || !templateId || !publicKey) {
            console.error('EmailJS environment variables are missing.');
            setStatus('error');
            setIsLoading(false);
            return;
        }

        if (form.current) {
            try {
                await emailjs.sendForm(serviceId, templateId, form.current, {
                    publicKey: publicKey,
                });
                setStatus('success');
                form.current.reset(); // Clear the form on success
            } catch (error) {
                console.error('FAILED...', error);
                setStatus('error');
            }
        }

        setIsLoading(false);

        // Reset status after a few seconds if successful
        if (status === 'success') {
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    return (
        <section className="py-16 px-4">
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold tracking-tight mb-4">Send us a Message</h2>
                    <p className="text-muted-foreground">
                        Have a specific question or proposal? Fill out the form below and we'll get back to you as soon as possible.
                    </p>
                </div>

                <div className="bg-card border border-border/50 rounded-2xl shadow-xl overflow-hidden p-6 md:p-8 relative">
                    {status === 'success' ? (
                        <div className="absolute inset-0 bg-card z-10 flex flex-col items-center justify-center animate-in fade-in zoom-in duration-300">
                            <div className="h-20 w-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
                                <CheckCircle2 className="h-10 w-10 text-green-500" />
                            </div>
                            <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                            <p className="text-muted-foreground text-center max-w-xs">
                                Thank you for reaching out. We'll be in touch with you shortly.
                            </p>
                            <button
                                onClick={() => setStatus('idle')}
                                className="mt-8 text-primary hover:underline text-sm font-medium"
                            >
                                Send another message
                            </button>
                        </div>
                    ) : null}

                    {status === 'error' && (
                        <div className="mb-6 p-4 bg-red-500/10 text-red-500 border border-red-500/20 rounded-lg flex items-center gap-3">
                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                            <p className="text-sm">Something went wrong. Please try again later.</p>
                        </div>
                    )}

                    <form ref={form} onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-semibold flex items-center gap-2">
                                    <User className="h-4 w-4 text-primary" />
                                    Name
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        className="w-full h-12 px-4 rounded-lg border border-input bg-background/50 focus:bg-background transition-all focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                        placeholder="John Doe"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-semibold flex items-center gap-2">
                                    <Mail className="h-4 w-4 text-primary" />
                                    Email
                                </label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        className="w-full h-12 px-4 rounded-lg border border-input bg-background/50 focus:bg-background transition-all focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="subject" className="text-sm font-semibold flex items-center gap-2">
                                <StickyNote className="h-4 w-4 text-primary" />
                                Subject
                            </label>
                            <div className="relative">
                                <select
                                    id="subject"
                                    name="subject"
                                    className="w-full h-12 px-4 rounded-lg border border-input bg-background/50 focus:bg-background transition-all focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none appearance-none"
                                >
                                    <option value="General Inquiry">General Inquiry</option>
                                    <option value="Advertising & Sponsorship">Advertising & Sponsorship</option>
                                    <option value="Report a Bug">Report a Bug</option>
                                    <option value="Press & Media">Press & Media</option>
                                    <option value="Other">Other</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="m6 9 6 6 6-6" /></svg>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="message" className="text-sm font-semibold flex items-center gap-2">
                                <MessageSquare className="h-4 w-4 text-primary" />
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                required
                                rows={5}
                                className="w-full p-4 rounded-lg border border-input bg-background/50 focus:bg-background transition-all focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none"
                                placeholder="How can we help you?"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-12 bg-primary text-primary-foreground font-bold rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-70 disabled:cursor-not-allowed group"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Sending...
                                </>
                            ) : (
                                <>
                                    Send Message
                                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
