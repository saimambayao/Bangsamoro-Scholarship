"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";


export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const pathname = usePathname();
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/scholarships?q=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

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

                {/* Desktop Search Bar - Centered */}
                <div className="hidden lg:flex flex-1 max-w-sm mx-12">
                    <form onSubmit={handleSearch} className="relative w-full flex items-center">
                        <Search className="absolute left-3.5 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                        <Input
                            placeholder="Find scholarship..."
                            className="w-full pl-10 h-10 bg-slate-50/50 border-slate-200 focus-visible:ring-primary rounded-full transition-all hover:bg-white hover:border-primary/30 text-sm"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </form>
                </div>

                {/* Right Side Group: Navigation + Actions */}
                <div className="hidden md:flex items-center gap-8">
                    {/* Desktop Nav with Sliding Active Indicator */}
                    <nav className="flex items-center gap-6">
                        {[
                            { name: "Scholarships", href: "/scholarships" },
                            { name: "Stories", href: "/success-stories" },
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

                    <div className="h-4 w-[1px] bg-slate-200" />

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3">
                        <Link href="/dashboard">
                            <Button variant="ghost" className="text-primary hover:text-primary hover:bg-primary/5 font-bold uppercase tracking-tight text-xs">
                                Dashboard
                            </Button>
                        </Link>
                        <Link href="/login">
                            <Button variant="outline" className="border-primary text-primary hover:bg-primary/5 font-bold px-5 h-10">
                                Login
                            </Button>
                        </Link>
                        <Link href="/register">
                            <Button className="bg-primary text-white hover:bg-primary/90 shadow-md transition-all hover:shadow-lg active:scale-95 font-bold px-5 h-10">
                                Register
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Mobile menu button */}
                <div className="md:hidden flex items-center gap-4">
                    <button
                        className="p-2 text-foreground"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            {isMenuOpen && (
                <div className="md:hidden border-t bg-background px-4 py-6 space-y-4 animate-in slide-in-from-top duration-300">
                    <nav className="flex flex-col gap-4">
                        <Link href="/scholarships" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium font-bold text-slate-700">
                            Scholarships
                        </Link>
                        <Link href="/success-stories" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium font-bold text-slate-700">
                            Stories
                        </Link>
                        <Link href="/about" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium font-bold text-slate-700">
                            About
                        </Link>
                        <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium font-bold text-slate-700">
                            Contact
                        </Link>
                    </nav>
                    <div className="flex flex-col gap-3 pt-4 border-t border-slate-100">
                        <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>
                            <Button className="w-full bg-slate-100 text-slate-700 hover:bg-slate-200 border-none font-bold">
                                Dashboard
                            </Button>
                        </Link>
                        <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                            <Button variant="outline" className="w-full border-primary text-primary font-bold">
                                Login
                            </Button>
                        </Link>
                        <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                            <Button className="w-full bg-primary text-white font-bold">
                                Register
                            </Button>
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}
