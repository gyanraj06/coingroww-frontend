"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Calendar, MapPin, ExternalLink, Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";

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

export default function EventsPage() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const { data, error } = await supabase
                .from("events")
                .select("*")
                // Sort by date ascending (upcoming first)
                .gte("date", new Date().toISOString())
                .order("date", { ascending: true });

            if (error) throw error;
            setEvents(data || []);
        } catch (error) {
            console.error("Error fetching events:", error);
            // Fallback to fetching all if filter fails (e.g. date format issues)
            const { data } = await supabase
                .from("events")
                .select("*")
                .order("date", { ascending: true });
            setEvents(data || []);
        } finally {
            setLoading(false);
        }
    };

    // Helper to format date natively
    const formatDate = (dateString: string | null, options: Intl.DateTimeFormatOptions) => {
        if (!dateString) return "";
        return new Date(dateString).toLocaleDateString("en-US", options);
    };

    // Group events by Month
    const groupedEvents = events.reduce((groups, event) => {
        if (!event.date) return groups;
        const date = new Date(event.date);
        const monthYear = date.toLocaleString('default', { month: 'long' });

        if (!groups[monthYear]) {
            groups[monthYear] = [];
        }
        groups[monthYear].push(event);
        return groups;
    }, {} as Record<string, Event[]>);

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-blue-500/30">
            {/* Hero Section */}
            <div className="relative py-24 px-6 md:py-32 text-center overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-500/20 blur-[100px] rounded-full pointer-events-none" />
                <div className="transport relative z-10 max-w-4xl mx-auto space-y-6">
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-gray-500 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        Events Ahead!
                    </h1>
                    <p className="text-lg md:text-xl text-gray-400 font-medium max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
                        A complete guide to the most important crypto gatherings around the world.
                    </p>
                </div>
            </div>

            {/* Calendar Events Section */}
            <div className="max-w-4xl mx-auto px-6 pb-24">
                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                    </div>
                ) : events.length === 0 ? (
                    <div className="text-center py-20 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm">
                        <Calendar className="w-12 h-12 mx-auto text-gray-600 mb-4" />
                        <h3 className="text-xl font-bold text-gray-300">No Upcoming Events</h3>
                        <p className="text-gray-500 mt-2">Check back soon for new announcements.</p>
                    </div>
                ) : (
                    <div className="space-y-12">
                        {Object.entries(groupedEvents).map(([month, monthEvents]) => (
                            <div key={month} className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                                <h2 className="flex items-center gap-2 text-xl font-bold text-blue-400">
                                    <span className="w-4 h-1 rounded-full bg-blue-500" />
                                    {month}
                                </h2>

                                <div className="space-y-3">
                                    {monthEvents.map((event) => (
                                        <Link
                                            key={event.id}
                                            href={`/events/${event.id}`}
                                            className="group block relative bg-[#111] hover:bg-[#161616] border border-white/5 rounded-xl p-4 transition-all duration-200 hover:border-white/10"
                                        >
                                            <div className="flex flex-col md:flex-row md:items-center gap-6">
                                                {/* Left: Logo & Title Info */}
                                                <div className="flex items-center gap-4 flex-1">
                                                    <div className="w-12 h-12 shrink-0 rounded-lg overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center">
                                                        {event.logo_image_url ? (
                                                            <img
                                                                src={event.logo_image_url}
                                                                alt={event.title}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        ) : (
                                                            <Calendar className="w-6 h-6 text-gray-600" />
                                                        )}
                                                    </div>

                                                    <div className="min-w-0">
                                                        <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors truncate pr-4">
                                                            {event.title}
                                                        </h3>
                                                        <p className="text-sm text-gray-500 line-clamp-3 mt-0.5 text-wrap break-words">
                                                            {event.summary || "No description available"}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Right: Date & Location */}
                                                <div className="flex items-center justify-between md:justify-end gap-6 md:w-auto mt-2 md:mt-0 pt-2 md:pt-0 border-t md:border-t-0 border-white/5">
                                                    <div className="text-right shrink-0">
                                                        <div className="text-sm font-medium text-gray-300">
                                                            {event.place ? event.place : "Online"}
                                                        </div>
                                                        <div className="text-sm text-gray-500 font-mono mt-0.5">
                                                            {formatDate(event.date, { day: '2-digit', month: '2-digit' })}
                                                            {/* Add end date logic if you had it, for now just start date */}
                                                        </div>
                                                    </div>

                                                    <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors -rotate-45 md:rotate-0" />
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Footer gradient fade */}
            <div className="fixed bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none z-20" />
        </div>
    );
}
