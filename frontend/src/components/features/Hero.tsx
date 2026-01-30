"use client";

import { Button } from "@/components/ui/button";
import { Search, ArrowRight, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { SCHOLARS_DIRECTORY } from "@/lib/mock-data";
import Image from "next/image";

export default function Hero() {
    return (
        <section className="relative overflow-hidden bg-background pt-2 pb-6 lg:pt-4 lg:pb-8">


            <div className="container relative z-10 mx-auto px-4">
                <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-8"
                    >
                        <h1 className="text-5xl font-extrabold tracking-tight md:text-7xl">
                            Discover <span className="text-secondary">Scholarships</span>
                        </h1>

                        <p className="max-w-2xl text-lg text-muted-foreground md:text-xl leading-relaxed italic mx-auto">
                            Your one-stop platform to discover opportunities, build your academic profile, and connect with a community of scholars shaping the future of Bangsamoro.
                        </p>

                        <div className="flex flex-col gap-4 sm:flex-row justify-center">
                            <div className="relative flex-1 max-w-md w-full">
                                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder="Search scholarships..."
                                    className="h-12 w-full rounded-xl border border-border bg-white pl-10 pr-4 shadow-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                />
                            </div>
                            <Button className="h-12 px-8 bg-primary text-white hover:bg-primary/90">
                                Browse All <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </div>

                        <div className="flex flex-col items-center gap-4 text-sm font-medium">
                            <div className="flex -space-x-3">
                                {SCHOLARS_DIRECTORY.slice(0, 4).map((scholar) => (
                                    <div key={scholar.id} className="h-10 w-10 rounded-full border-2 border-background bg-muted overflow-hidden relative">
                                        <Image
                                            src={scholar.avatar}
                                            alt="Bangsamoro Scholar"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                            <p className="text-muted-foreground">
                                Joined by <span className="text-foreground font-bold">12,000+</span> scholars already
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
