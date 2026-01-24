"use client";

import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface ArticleContentProps {
    content: string;
    className?: string;
}

export function ArticleContent({ content, className = '' }: ArticleContentProps) {
    const [lightboxImage, setLightboxImage] = useState<string | null>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    // Handle click on images using event delegation
    const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLElement;
        if (target.tagName === 'IMG') {
            const img = target as HTMLImageElement;
            setLightboxImage(img.src);
        }
    };

    // Add cursor style to images
    useEffect(() => {
        if (!contentRef.current) return;

        const images = contentRef.current.querySelectorAll('img');
        images.forEach((img) => {
            img.style.cursor = 'zoom-in';
        });
    }, [content]);

    const closeLightbox = () => {
        setLightboxImage(null);
    };

    // Handle Escape key and body scroll
    useEffect(() => {
        if (!lightboxImage) return;

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                closeLightbox();
            }
        };

        document.addEventListener('keydown', handleEscape);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = '';
        };
    }, [lightboxImage]);

    return (
        <>
            {/* Article Content */}
            <div
                ref={contentRef}
                className={`[&_iframe]:w-full [&_iframe]:aspect-video [&_iframe]:h-auto [&_iframe]:rounded-lg [&_iframe]:my-6 ${className}`}
                onClick={handleContentClick}
                dangerouslySetInnerHTML={{ __html: content }}
            />

            {/* Lightbox Modal */}
            {lightboxImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
                    onClick={closeLightbox}
                    style={{ animation: 'fadeIn 0.2s ease-out' }}
                >
                    {/* Close Button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            closeLightbox();
                        }}
                        className="absolute top-4 right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
                        aria-label="Close"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    {/* Image */}
                    <img
                        src={lightboxImage}
                        alt="Enlarged view"
                        className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl"
                        style={{ animation: 'zoomIn 0.2s ease-out' }}
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}

            {/* Animations */}
            <style jsx global>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes zoomIn {
                    from { transform: scale(0.95); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
            `}</style>
        </>
    );
}
