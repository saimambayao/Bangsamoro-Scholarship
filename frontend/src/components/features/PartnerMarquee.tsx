"use client";

import { PARTNERS } from "@/lib/mock-data";
import { motion } from "framer-motion";
import Link from "next/link";

interface PartnerMarqueeProps {
    title?: string;
    showDetails?: boolean;
    className?: string;
}

export default function PartnerMarquee({
    title = "Trusted Partners",
    showDetails = false,
    className = "pt-6 pb-2"
}: PartnerMarqueeProps) {
    // We double the partners to create a seamless loop
    const quadruplePartners = [...PARTNERS, ...PARTNERS, ...PARTNERS, ...PARTNERS];

    return (
        <section className={`${className} overflow-hidden relative bg-white`}>
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-[0.3em] text-primary mb-12">
                    {title}
                </h2>

                <div className="relative py-4">
                    {/* Gradient masks for smooth edges */}
                    <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none"></div>

                    <motion.div
                        className="flex items-center gap-10 md:gap-20 whitespace-nowrap"
                        style={{ width: "fit-content" }}
                        initial={{ x: 0 }}
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{
                            duration: showDetails ? 80 : 50, // Slower if showing details
                            ease: "linear",
                            repeat: Infinity,
                        }}
                    >
                        {quadruplePartners.map((partner, idx) => (
                            <Link
                                key={idx}
                                href={`/scholarships?q=${encodeURIComponent(partner.name)}`}
                                className="flex flex-col items-center flex-shrink-0 transition-all duration-500 group cursor-pointer"
                            >
                                <div className="h-12 w-12 md:h-20 md:w-20 relative transform group-hover:scale-110 transition-transform duration-500">
                                    <img
                                        src={partner.logo}
                                        alt={partner.code}
                                        className="object-contain w-full h-full"
                                    />
                                </div>
                                {showDetails && (
                                    <div className="mt-4 flex flex-col items-center gap-1">
                                        <span className="text-sm md:text-base font-black text-slate-800 tracking-wider">
                                            {partner.code}
                                        </span>
                                    </div>
                                )}
                            </Link>
                        ))}
                    </motion.div>
                </div>
            </div >
        </section >
    );
}
