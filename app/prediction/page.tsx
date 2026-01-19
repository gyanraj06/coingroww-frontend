import Link from "next/link";
import { TrendingUp, ArrowLeft, BrainCircuit } from "lucide-react";

export default function PredictionPage() {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center container text-center space-y-8 animate-in fade-in duration-700">
            <div className="relative">
                <div className="absolute -inset-4 bg-blue-500/20 rounded-full blur-xl animate-pulse" />
                <div className="relative bg-background p-4 rounded-2xl border border-[#1f1f1f]">
                    <BrainCircuit className="w-16 h-16 text-blue-500" />
                </div>
            </div>

            <div className="space-y-4 max-w-2xl">
                <h1 className="text-4xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-500 tracking-tighter uppercase">
                    Price Predictions
                </h1>
                <h2 className="text-2xl font-bold text-blue-500 uppercase tracking-widest">
                    Coming Soon
                </h2>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center">
                <Link
                    href="/"
                    className="flex items-center gap-2 px-6 py-3 bg-[#1f1f1f] text-white hover:bg-blue-600 hover:text-white rounded-lg font-bold transition-all uppercase tracking-wide border border-transparent hover:border-blue-500/50"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Home
                </Link>
            </div>
        </div>
    );
}
