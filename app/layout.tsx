import type { Metadata } from "next";
import { Chakra_Petch } from "next/font/google"; // Updated import to use google font properly
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Link from 'next/link';
import { Mail, Shield } from 'lucide-react';
import { Ticker } from '@/components/ui/ticker';
import { Header } from "@/components/layout/header";

const chakraPetch = Chakra_Petch({
    subsets: ["latin"],
    weight: ['300', '400', '500', '600', '700'],
    variable: '--font-chakra-petch',
});

export const metadata: Metadata = {
    title: "Coingroww - Crypto News & Market Insights",
    description: "Real-time updates, market analysis, and the latest trends in the blockchain world.",
    icons: {
        icon: "/logo.png",
        shortcut: "/logo.png",
        apple: "/logo.png",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${chakraPetch.variable} font-sans bg-background text-foreground antialiased`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    <div className="flex min-h-screen flex-col">
                        {/* Ticker Section - Full Width, Darker Background */}
                        <div className="z-50 w-full bg-[#050505] border-b border-[#1f1f1f]">
                            <Ticker />
                        </div>

                        {/* New Main Header */}
                        <Header />

                        <main className="flex-1">
                            {children}
                        </main>

                        {/* Footer */}
                        <footer className="border-t border-border bg-black py-10 md:py-16">
                            <div className="container px-4 md:px-6 grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
                                {/* Brand Column */}
                                <div className="space-y-4">
                                    <Link href="/" className="flex items-center space-x-2 font-bold text-2xl tracking-tighter">
                                        <img src="/logo.png" alt="CoinGroww" className="h-6 w-6" />
                                        <span className="text-yellow-500">COINGROWW</span>
                                    </Link>

                                </div>

                                {/* Products Column */}
                                <div className="flex flex-col gap-4">
                                    <h3 className="font-bold text-lg text-white">Products</h3>
                                    <Link href="/news/defi" className="text-sm text-gray-400 hover:text-blue-400">DeFi</Link>
                                    <Link href="/news/bitcoin" className="text-sm text-gray-400 hover:text-blue-400">Bitcoin</Link>
                                    <Link href="/news/ethereum" className="text-sm text-gray-400 hover:text-blue-400">Ethereum</Link>
                                    <Link href="/news/altcoins" className="text-sm text-gray-400 hover:text-blue-400">Altcoins</Link>
                                    <Link href="/news/nfts" className="text-sm text-gray-400 hover:text-blue-400">NFTs</Link>
                                    <Link href="/news/blockchain" className="text-sm text-gray-400 hover:text-blue-400">Blockchain</Link>
                                    <Link href="/press-release" className="text-sm text-gray-400 hover:text-blue-400">Press Release</Link>
                                    <Link href="/news/sponsored" className="text-sm text-gray-400 hover:text-blue-400">Sponsored</Link>
                                </div>

                                {/* About Column */}
                                <div className="flex flex-col gap-4">
                                    <h3 className="font-bold text-lg text-white">About</h3>
                                    <Link href="/about" className="text-sm text-gray-400 hover:text-blue-400">About Us</Link>
                                    <Link href="/contact" className="text-sm text-gray-400 hover:text-blue-400">Contact Us</Link>
                                    <Link href="/advertise" className="text-sm text-gray-400 hover:text-blue-400">Advertise</Link>
                                    <Link href="/authors" className="text-sm text-gray-400 hover:text-blue-400">Authors</Link>
                                </div>

                                {/* Legal Column */}
                                <div className="flex flex-col gap-4">
                                    <h3 className="font-bold text-lg text-white">Legal</h3>
                                    <Link href="/terms" className="text-sm text-gray-400 hover:text-blue-400">Terms & Conditions</Link>
                                    <Link href="/privacy" className="text-sm text-gray-400 hover:text-blue-400">Privacy Policy</Link>
                                    <Link href="/cookies" className="text-sm text-gray-400 hover:text-blue-400">Cookie Policy</Link>
                                    <Link href="/disclaimer" className="text-sm text-gray-400 hover:text-blue-400">Disclaimer</Link>

                                    <div className="flex items-center gap-2 text-sm text-gray-400 mt-4 pt-4 border-t border-gray-800">
                                        <Mail className="h-4 w-4" />
                                        <span>sp1969805@gmail.com</span>
                                    </div>
                                </div>
                            </div>
                            <div className="container px-4 md:px-6 mt-8 md:mt-12 border-t border-[#1f1f1f] pt-6 md:pt-8 flex flex-col justify-center items-center text-sm text-gray-600">
                                <div className="flex flex-wrap justify-center items-center gap-1 text-center">
                                    <span>Designed by</span>
                                    <Link href="https://megabytecode.in/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                                        Megabytecode under Mounterra Innovations
                                    </Link>
                                </div>
                            </div>
                        </footer>
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}
