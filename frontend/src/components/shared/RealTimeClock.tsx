
"use client";

import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

export default function RealTimeClock() {
    const [time, setTime] = useState<Date | null>(null);

    useEffect(() => {
        setTime(new Date());
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    if (!time) return null;

    const formattedTime = time.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });

    const formattedDate = time.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="flex flex-col items-end">
            <div className="flex items-center gap-1.5 text-slate-800 font-medium text-sm tracking-tight">
                <Clock className="h-3.5 w-3.5 text-emerald-600 animate-pulse" />
                <span>{formattedTime}</span>
            </div>
            <div className="text-[9px] font-medium text-slate-400 uppercase tracking-widest leading-none mt-0.5">
                {formattedDate}
            </div>
        </div>
    );
}
