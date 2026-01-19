"use client";

import { useEffect, useState } from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface CoinPrice {
    symbol: string;
    price: number;
    change24h: number;
}

export function Ticker() {
    // Mock data for initial state - in a real app, fetch this from CoinGecko/Binance API
    const [prices, setPrices] = useState<CoinPrice[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPrices = async () => {
            try {
                // User specifically requested rest.coincap.io/v3
                const response = await fetch('https://rest.coincap.io/v3/assets?limit=15', {
                    headers: {
                        'Authorization': 'Bearer s'
                    }
                });
                const data = await response.json();

                // Map API response to our internal format
                const formattedPrices = data.data.map((coin: any) => ({
                    symbol: coin.symbol,
                    price: parseFloat(coin.priceUsd),
                    change24h: parseFloat(coin.changePercent24Hr)
                }));

                setPrices(formattedPrices);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching crypto prices:', error);
                // Fallback to static data on error if needed, or just leave empty
                setLoading(false);
            }
        };

        fetchPrices();
        // Refresh every 30 seconds
        const interval = setInterval(fetchPrices, 30000);
        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return (
            <div className="w-full bg-[#0a0a0a] border-b border-[#1f1f1f] overflow-hidden py-2">
                <div className="container flex justify-center text-xs text-gray-500">
                    Loading market data...
                </div>
            </div>
        );
    }

    return (
        <div className="w-full bg-[#0a0a0a] border-b border-[#1f1f1f] overflow-hidden py-2">
            <div className="flex animate-marquee whitespace-nowrap hover:pause w-max">
                {[...prices, ...prices].map((coin, i) => ( // Duplicate for seamless loop
                    <div key={i} className="flex items-center space-x-2 mx-6 text-sm font-medium">
                        <span className="text-gray-400 font-bold">{coin.symbol}</span>
                        <span className="text-white">${coin.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        <span className={`flex items-center ${coin.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {coin.change24h >= 0 ? <ArrowUpRight className="h-3 w-3 mr-0.5" /> : <ArrowDownRight className="h-3 w-3 mr-0.5" />}
                            {Math.abs(coin.change24h).toFixed(2)}%
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
