"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, MapPin, GraduationCap, Tag } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface ScholarshipCardProps {
    scholarship: {
        id: string;
        title: string;
        provider: string;
        providerFull: string;
        amount: string;
        deadline: string;
        status: string;
        level: string;
        location: string;
        logo: string;
    };
}

export default function ScholarshipCard({ scholarship }: ScholarshipCardProps) {
    return (
        <motion.div
            whileHover={{
                scale: 1.02,
                y: -10,
                boxShadow: "0 25px 50px rgba(197, 160, 32, 0.4)",
                borderColor: "#c5a020",
                backgroundColor: "rgba(197, 160, 32, 0.02)"
            }}
            whileTap={{ scale: 0.98 }}
            transition={{
                type: "spring",
                stiffness: 400,
                damping: 30,
                boxShadow: { duration: 0.5 },
                borderColor: { duration: 0.5 },
                backgroundColor: { duration: 0.5 }
            }}
            className="group relative rounded-3xl border border-slate-200 bg-white p-2 shadow-sm overflow-hidden cursor-pointer"
        >
            {/* Background Logo Watermark - Centered with Original Colors at 30% Opacity */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 opacity-[0.3] pointer-events-none z-0 group-hover:opacity-[0.45] transition-opacity duration-500">
                <img src={scholarship.logo} alt="" className="w-full h-full object-contain" />
            </div>

            <div className="flex flex-col h-full p-6 relative z-10">
                <div className="mb-6 flex items-start justify-between">
                    <div className="flex flex-col">
                        <span className="text-lg font-bold text-primary">
                            {scholarship.provider}
                        </span>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 leading-tight">
                            {scholarship.providerFull}
                        </span>
                    </div>
                    <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold transition-transform duration-300 group-hover:scale-105 ${scholarship.status === 'Open' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                        <Tag className="h-3 w-3" /> {scholarship.status}
                    </span>
                </div>

                <h3 className="mb-2 text-xl font-bold tracking-tight text-foreground transition-colors duration-300">
                    {scholarship.title}
                </h3>

                <div className="mb-8 space-y-3">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span className="text-primary font-bold">{scholarship.amount}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>Due: {scholarship.deadline}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <GraduationCap className="h-4 w-4" />
                        <span>{scholarship.level}</span>
                    </div>
                </div>

                <div className="mt-auto flex items-center gap-3 pt-4 border-t">
                    <Link href={`/scholarships/${scholarship.id}`} className="flex-1">
                        <Button variant="outline" className="w-full border-slate-200 text-slate-700 font-bold transition-all duration-200 hover:border-primary hover:text-primary hover:bg-primary/5">
                            Details
                        </Button>
                    </Link>
                    <Button
                        className="bg-primary text-white font-bold transition-all duration-200 hover:bg-primary/90 hover:scale-105 active:scale-95"
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent triggering the card's click if any
                            const user = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
                            if (!user) {
                                window.location.href = `/login?callbackUrl=/scholarships/${scholarship.id}/apply`;
                            } else {
                                window.location.href = `/scholarships/${scholarship.id}/apply`;
                            }
                        }}
                    >
                        Apply <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </Button>
                </div>
            </div>
        </motion.div>
    );
}
