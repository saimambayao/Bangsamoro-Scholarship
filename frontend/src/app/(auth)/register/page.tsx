"use client";

import Link from "next/link";
import { ArrowLeft, Loader2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { motion, Variants } from "framer-motion";

export default function RegisterPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Animation Variants
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault();
        setError(null);

        if (password !== confirmPassword) {
            setError("Passwords do not match. Please try again.");
            return;
        }

        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            // In Phase 2, this would call the API
        }, 2000);
    }

    return (
        <div className="min-h-screen bg-white flex flex-col md:flex-row overflow-hidden font-sans">
            {/* Left Side - Visuals (Majestic Emerald) */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="hidden md:flex flex-col justify-between w-1/3 lg:w-[35%] bg-[#064e3b] text-white pt-12 px-12 pb-12 relative overflow-hidden"
            >
                {/* Decorative Background Elements */}
                <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
                    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                        <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
                    </svg>
                </div>
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />

                <div className="relative z-10 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                    >
                        <Link href="/" className="inline-flex items-center gap-2.5 text-emerald-100/60 hover:text-white transition-all duration-300 group font-bold tracking-tight">
                            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1.5" /> Back to Home
                        </Link>
                    </motion.div>

                    <div className="space-y-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                        >
                            <h2 className="text-5xl font-black tracking-tighter leading-[0.9]">
                                Bangsamoro <br />
                                <span className="text-secondary italic">Scholarship</span> <br />
                                Portal
                            </h2>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            className="text-2xl font-bold text-emerald-100/90 leading-tight max-w-sm"
                        >
                            Join the Community
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.9 }}
                            className="text-emerald-100/60 text-lg max-w-sm font-medium leading-relaxed"
                        >
                            Create your profile to start your scholarship journey. It takes less than 2 minutes to get started.
                        </motion.p>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    transition={{ delay: 1.1 }}
                    className="relative z-10 text-[10px] text-emerald-300 font-black tracking-[0.3em] uppercase"
                >
                    &copy; 2026 Bangsamoro Scholarship Portal
                </motion.div>
            </motion.div>

            {/* Right Side - Form (Clean & Premium) */}
            <div className="flex-1 flex flex-col items-center justify-center pt-8 md:pt-0 px-6 pb-8 bg-slate-50/50 overflow-hidden">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                    className="w-full max-w-[500px]"
                >
                    <Card className="border-0 shadow-none bg-transparent">
                        <CardHeader className="space-y-3 px-0 mb-6 text-center">
                            <CardTitle className="text-4xl font-medium tracking-tighter text-slate-900 leading-none">Sign Up</CardTitle>
                        </CardHeader>
                        <CardContent className="px-0">
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                className="grid gap-6"
                            >
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm font-bold shadow-sm flex items-center gap-2"
                                    >
                                        <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
                                        {error}
                                    </motion.div>
                                )}
                                <form onSubmit={onSubmit}>
                                    <div className="grid gap-6">
                                        <div className="grid grid-cols-2 gap-4">
                                            <motion.div variants={itemVariants} className="grid gap-2.5">
                                                <Label htmlFor="first-name" className="text-slate-700 font-medium text-sm ml-1">First name</Label>
                                                <Input id="first-name" placeholder="Juan" required disabled={isLoading} className="h-11 border-slate-200 focus:border-emerald-500 bg-white shadow-sm rounded-lg transition-all duration-300 font-medium text-base text-slate-700 placeholder:text-slate-300" />
                                            </motion.div>
                                            <motion.div variants={itemVariants} className="grid gap-2.5">
                                                <Label htmlFor="last-name" className="text-slate-700 font-medium text-sm ml-1">Last name</Label>
                                                <Input id="last-name" placeholder="Dela Cruz" required disabled={isLoading} className="h-11 border-slate-200 focus:border-emerald-500 bg-white shadow-sm rounded-lg transition-all duration-300 font-medium text-base text-slate-700 placeholder:text-slate-300" />
                                            </motion.div>
                                        </div>
                                        <motion.div variants={itemVariants} className="grid gap-2.5">
                                            <Label htmlFor="email" className="text-slate-700 font-medium text-sm ml-1">Email Address</Label>
                                            <Input
                                                id="email"
                                                placeholder="name@example.com"
                                                type="email"
                                                autoCapitalize="none"
                                                autoComplete="email"
                                                autoCorrect="off"
                                                disabled={isLoading}
                                                className="h-11 border-slate-200 focus:border-emerald-500 bg-white shadow-sm rounded-lg transition-all duration-300 font-medium text-base text-slate-700 placeholder:text-slate-300"
                                            />
                                        </motion.div>
                                        <motion.div variants={itemVariants} className="grid gap-2.5">
                                            <Label htmlFor="password" title="password" className="text-slate-700 font-medium text-sm ml-1">Password</Label>
                                            <div className="relative">
                                                <Input
                                                    id="password"
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="••••••••"
                                                    disabled={isLoading}
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    className="h-11 border-slate-200 focus:border-emerald-500 bg-white shadow-sm rounded-lg transition-all duration-300 pr-12 font-medium text-base text-slate-700 placeholder:tracking-widest"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-600 p-1.5 rounded-lg transition-all duration-300"
                                                    tabIndex={-1}
                                                >
                                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                                </button>
                                            </div>
                                        </motion.div>
                                        <motion.div variants={itemVariants} className="grid gap-2.5">
                                            <Label htmlFor="confirm-password" title="password" className="text-slate-700 font-medium text-sm ml-1 text-emerald-700">Confirm Password</Label>
                                            <div className="relative">
                                                <Input
                                                    id="confirm-password"
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    placeholder="••••••••"
                                                    disabled={isLoading}
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                    className="h-11 border-emerald-100 focus:border-emerald-500 bg-white shadow-sm rounded-lg transition-all duration-300 pr-12 font-medium text-base text-slate-700 placeholder:tracking-widest"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-600 p-1.5 rounded-lg transition-all duration-300"
                                                    tabIndex={-1}
                                                >
                                                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                                </button>
                                            </div>
                                        </motion.div>

                                        <motion.div variants={itemVariants} className="pt-2">
                                            <Button
                                                variant="outline"
                                                disabled={isLoading}
                                                className="w-full border-emerald-500/30 text-emerald-600 font-medium h-11 rounded-lg transition-all duration-300 active:scale-[0.98] text-sm hover:bg-emerald-50 hover:text-emerald-700"
                                            >
                                                {isLoading ? (
                                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                                ) : (
                                                    "Sign Up Now"
                                                )}
                                            </Button>
                                        </motion.div>
                                    </div>
                                </form>

                                <motion.div variants={itemVariants} className="relative py-2">
                                    <div className="absolute inset-0 flex items-center">
                                        <span className="w-full border-t border-slate-100" />
                                    </div>
                                    <div className="relative flex justify-center text-[9px] font-medium uppercase tracking-[0.3em]">
                                        <span className="bg-slate-50/50 px-4 text-slate-300">Or integrate with</span>
                                    </div>
                                </motion.div>

                                <motion.div variants={itemVariants}>
                                    <Button
                                        variant="outline"
                                        type="button"
                                        disabled={isLoading}
                                        className="w-full border-slate-100 text-slate-600 font-medium h-11 rounded-lg hover:bg-white hover:border-slate-300 hover:shadow-lg hover:shadow-slate-100 transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-3 text-sm"
                                    >
                                        <svg className="h-5 w-5" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                                            <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                                        </svg>
                                        <span className="uppercase tracking-widest text-[10px]">Sign up with Google</span>
                                    </Button>
                                </motion.div>
                            </motion.div>
                        </CardContent>
                        <CardFooter className="flex flex-col space-y-4 px-0 mt-8">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.2 }}
                                className="text-center text-sm font-medium text-slate-400"
                            >
                                Already have a scholar account?{" "}
                                <Link href="/login" className="font-medium text-emerald-600 hover:text-emerald-700 underline underline-offset-8 decoration-emerald-200/50 hover:decoration-emerald-500 transition-all duration-300">
                                    Sign in here
                                </Link>
                            </motion.div>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.4 }}
                                transition={{ delay: 1.4 }}
                                className="px-12 text-center text-[10px] font-medium text-slate-400 leading-relaxed uppercase tracking-widest"
                            >
                                By continuing, you agree to our{" "}
                                <Link href="/terms" className="underline underline-offset-4 hover:text-slate-900 transition-colors">
                                    Terms
                                </Link>{" "}
                                &{" "}
                                <Link href="/privacy" className="underline underline-offset-4 hover:text-slate-900 transition-colors">
                                    Privacy
                                </Link>
                            </motion.p>
                        </CardFooter>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}
