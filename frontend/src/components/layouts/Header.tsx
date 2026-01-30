"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Search, Menu, X } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
            <div className="container mx-auto flex h-20 items-center justify-between px-4">
                {/* Logo and Branding with Gold Fade Animation */}
                <Link href="/" className="flex items-center gap-2 group">
                    <motion.div
                        whileHover={{
                            scale: 1.05,
                            filter: "drop-shadow(0 0 12px rgba(197, 160, 32, 0.6))"
                        }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="relative"
                    >
                        <Image
                            src="/images/logo.png"
                            alt="Bangsamoro Scholarship Portal Logo"
                            width={54}
                            height={54}
                            className="rounded-full shadow-sm"
                        />
                    </motion.div>

                    <div className="flex flex-col">
                        <motion.h2
                            whileHover={{ color: "#c5a020" }}
                            transition={{ duration: 0.4 }}
                            className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-secondary transition-colors leading-none"
                        >
                            Bangsamoro
                        </motion.h2>
                        <motion.div
                            className="flex items-center gap-1 mt-0.5"
                            whileHover={{ color: "#c5a020" }}
                            transition={{ duration: 0.4 }}
                        >
                            <span className="text-[11px] font-bold uppercase text-secondary tracking-[0.2em]">Scholarship</span>
                            <span className="text-[11px] font-bold text-slate-900 group-hover:text-secondary transition-colors">Portal</span>
                        </motion.div>
                    </div>
                </Link>

                {/* Desktop Nav with Sliding Active Indicator */}
                <nav className="hidden md:flex items-center gap-8">
                    {[
                        { name: "Scholarships", href: "/scholarships" },
                        { name: "Success Stories", href: "/success-stories" },
                        { name: "About", href: "/about" },
                        { name: "Contact", href: "/contact" },
                    ].map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="relative py-2 group"
                        >
                            <span className={`text-sm font-bold transition-colors duration-300 ${isActive(item.href) ? "text-primary" : "text-slate-600 hover:text-primary"
                                }`}>
                                {item.name}
                            </span>

                            {/* Animated Underline */}
                            {isActive(item.href) ? (
                                <motion.div
                                    layoutId="header-active-link"
                                    className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-primary rounded-full"
                                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                />
                            ) : (
                                <div className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-primary/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
                            )}
                        </Link>
                    ))}
                </nav>

                {/* Action Buttons */}
                <div className="hidden md:flex items-center gap-4">
                    <Button variant="ghost" size="icon">
                        <Search className="h-5 w-5" />
                    </Button>
                    <Link href="/login">
                        <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">
                            Login
                        </Button>
                    </Link>
                    <Link href="/register">
                        <Button className="bg-primary text-white hover:bg-primary/90 shadow-md transition-all hover:shadow-lg active:scale-95">
                            Register
                        </Button>
                    </Link>
                </div>

                {/* Mobile menu button */}
                <button
                    className="md:hidden p-2 text-foreground"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {/* Mobile Nav */}
            {isMenuOpen && (
                <div className="md:hidden border-t bg-background px-4 py-6 space-y-4 animate-in slide-in-from-top duration-300">
                    <nav className="flex flex-col gap-4">
                        <Link href="/scholarships" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium">
                            Scholarships
                        </Link>
                        <Link href="/success-stories" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium">
                            Success Stories
                        </Link>
                        <Link href="/about" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium">
                            About
                        </Link>
                        <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium">
                            Contact
                        </Link>
                    </nav>
                    <div className="flex flex-col gap-3 pt-4">
                        <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                            <Button variant="outline" className="w-full">
                                Login
                            </Button>
                        </Link>
                        <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                            <Button className="w-full bg-primary text-white">
                                Register
                            </Button>
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}
