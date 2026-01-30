"use client";

import { Button } from "@/components/ui/button";
import { Search, ArrowRight, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { SCHOLARS_DIRECTORY } from "@/lib/mock-data";
import Image from "next/image";

export default function Hero() {
    return (
        <section className="relative overflow-hidden bg-background pt-16 pb-20 lg:pt-24 lg:pb-28">


            <div className="container relative z-10 mx-auto px-4">
                <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-12"
                    >
                        <h1 className="text-5xl font-extrabold tracking-tight md:text-7xl">
                            Discover <span className="text-secondary">Scholarships</span>
                        </h1>

                        <p className="max-w-3xl text-xl text-muted-foreground md:text-2xl leading-relaxed italic mx-auto">
                            Your one-stop platform to discover opportunities, build your academic profile, and connect with a community of scholars shaping the future of Bangsamoro.
                        </p>

                        <div className="flex flex-col gap-4 sm:flex-row justify-center pt-4">
                            <div className="relative flex-1 max-w-lg w-full">
                                <Search className="absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder="Search scholarships..."
                                    className="h-14 w-full rounded-xl border border-border bg-white pl-12 pr-4 text-base shadow-sm focus:border-primary focus:ring-2 focus:ring-primary outline-none transition-all"
                                />
                            </div>
                            <Button className="h-14 px-10 bg-primary text-white hover:bg-primary/90 text-base font-semibold">
                                Browse All <ArrowRight className="ml-2 h-6 w-6" />
                            </Button>
                        </div>

                        <div className="flex flex-col items-center gap-5 text-base font-medium pt-6">
                            <div className="flex -space-x-4">
                                {SCHOLARS_DIRECTORY.slice(0, 4).map((scholar) => (
                                    <div key={scholar.id} className="h-14 w-14 rounded-full border-4 border-background bg-muted overflow-hidden relative ring-2 ring-primary/10">
                                        <Image
                                            src={scholar.avatar}
                                            alt="Bangsamoro Scholar"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                            <p className="text-muted-foreground text-lg">
                                Joined by <span className="text-foreground font-bold">12,000+</span> scholars already
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
