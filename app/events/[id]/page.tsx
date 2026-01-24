"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Calendar, MapPin, ExternalLink, Loader2, Clock, Share2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

type Event = {
    id: string;
    title: string;
    summary: string | null;
    place: string | null;
    date: string | null;
    event_link: string | null;
    banner_image_url: string | null;
    logo_image_url: string | null;
    created_at: string | null;
};

export default function EventDetailsPage({ params }: { params: { id: string } }) {
    const [event, setEvent] = useState<Event | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEvent();
    }, []);

    const fetchEvent = async () => {
        try {
            const { data, error } = await supabase
                .from("events")
                .select("*")
                .eq("id", params.id)
                .single();

            if (error) throw error;
            setEvent(data);
        } catch (error) {
            console.error("Error fetching event:", error);
        } finally {
            setLoading(false);
        }
    };

    // Helper to format date natively
    const formatDate = (dateString: string | null, options: Intl.DateTimeFormatOptions) => {
        if (!dateString) return "";
        return new Date(dateString).toLocaleDateString("en-US", options);
    };

    const getTime = (dateString: string | null) => {
        if (!dateString) return "";
        return new Date(dateString).toLocaleTimeString("en-US", { hour: 'numeric', minute: '2-digit' });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
        );
    }

    if (!event) {
        return notFound();
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-blue-500/30 pb-20">
            {/* Back Button */}
            <div className="container mx-auto px-6 py-6">
                <Link href="/events" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Events
                </Link>
            </div>

            <div className="container max-w-5xl mx-auto px-6 space-y-8 animate-in fade-in duration-700">
                {/* Banner Section Wrapper */}
                <div className="relative">
                    <div className="relative w-full aspect-[21/9] md:aspect-[3/1] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#111] group">
                        {event.banner_image_url ? (
                            <img
                                src={event.banner_image_url}
                                alt={event.title}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-blue-900/10">
                                <Calendar className="w-20 h-20 text-blue-500/20" />
                            </div>
                        )}
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80" />
                    </div>

                    {/* Floating Logo - overlapping bottom edge */}
                    <div className="absolute -bottom-10 left-6 md:left-10 z-20">
                        <div className="w-20 h-20 md:w-32 md:h-32 rounded-2xl overflow-hidden bg-[#0a0a0a] border-4 border-[#0a0a0a] shadow-xl">
                            {event.logo_image_url ? (
                                <img
                                    src={event.logo_image_url}
                                    alt={event.title}
                                    className="w-full h-full object-cover bg-white/5"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-white/5">
                                    <Calendar className="w-8 h-8 md:w-12 md:h-12 text-gray-400" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Content Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-12 md:pt-16">
                    {/* Main Content (Left) */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="space-y-4">
                            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
                                {event.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-6 text-gray-400 text-sm md:text-base">
                                {event.date && (
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-5 h-5 text-blue-500" />
                                        <span className="font-medium text-gray-200">
                                            {formatDate(event.date, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                                        </span>
                                    </div>
                                )}
                                {event.place && (
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-5 h-5 text-blue-500" />
                                        <span className="font-medium text-gray-200">{event.place}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="prose prose-invert prose-lg max-w-none text-gray-300">
                            <h3 className="text-xl font-bold text-white mb-4">About this Event</h3>
                            <p className="whitespace-pre-wrap leading-relaxed">
                                {event.summary || "No description provided for this event."}
                            </p>
                        </div>
                    </div>

                    {/* Sidebar / Actions (Right) */}
                    <div className="space-y-6">
                        <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm space-y-6 sticky top-24">
                            <h3 className="font-bold text-lg text-white">Event Details</h3>

                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500 shrink-0">
                                        <Clock className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 font-medium">Time</p>
                                        <p className="text-white font-medium">
                                            {getTime(event.date) || "All Day"}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500 shrink-0">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 font-medium">Location</p>
                                        <p className="text-white font-medium">{event.place || "Online"}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-white/10 space-y-3">
                                {event.event_link ? (
                                    <a
                                        href={event.event_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-lg shadow-blue-900/20 hover:shadow-blue-500/30 hover:-translate-y-0.5"
                                    >
                                        Register Now
                                        <ExternalLink className="w-4 h-4" />
                                    </a>
                                ) : (
                                    <button disabled className="w-full bg-gray-800 text-gray-500 font-bold py-3.5 px-6 rounded-xl cursor-not-allowed">
                                        Registration Closed
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="fixed bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none z-0" />
        </div>
    );
}
