"use client";

import Link from "next/link";
import { ArrowLeft, Loader2, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { motion } from "framer-motion";

export default function RegisterPage() {
    const [isLoading, setIsLoading] = useState(false);

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault();
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row overflow-hidden">
            {/* Left Side - Visuals */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="hidden md:flex flex-col justify-between w-1/2 lg:w-2/5 bg-emerald-900 text-white p-12 relative overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                        <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
                    </svg>
                </div>

                <div className="relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <Link href="/" className="flex items-center gap-2 text-white/80 hover:text-white mb-10 transition-colors group">
                            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> Back to Home
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                        className="mb-6"
                    >
                        <span className="text-4xl font-black tracking-tight">Bangsamoro <span className="text-secondary italic">Scholarship</span> Portal</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="text-3xl font-bold mb-4 leading-tight"
                    >
                        Join the Community
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9 }}
                        className="text-emerald-100/80 text-lg max-w-sm font-medium"
                    >
                        Create your profile to start your scholarship journey. It takes less than 2 minutes.
                    </motion.p>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    transition={{ delay: 1.1 }}
                    className="relative z-10 text-xs text-emerald-300 font-medium tracking-widest uppercase"
                >
                    &copy; 2026 Bangsamoro Scholarship Portal
                </motion.div>
            </motion.div>

            {/* Right Side - Form */}
            <div className="flex-1 flex items-center justify-center p-6 md:p-12">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="w-full max-w-md"
                >
                    <Card className="border-0 shadow-none bg-transparent">
                        <CardHeader className="space-y-2 px-0 mb-4">
                            <CardTitle className="text-4xl font-black tracking-tighter text-slate-900">Create account</CardTitle>
                            <CardDescription className="text-slate-500 font-medium text-base">
                                Join the community of future Bangsamoro leaders
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="px-0">
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                className="grid gap-6"
                            >
                                <form onSubmit={onSubmit}>
                                    <div className="grid gap-5">
                                        <div className="grid grid-cols-2 gap-4">
                                            <motion.div variants={itemVariants} className="grid gap-2">
                                                <Label htmlFor="first-name" className="text-slate-700 font-bold ml-1">First name</Label>
                                                <Input id="first-name" placeholder="Juan" required disabled={isLoading} className="h-12 border-slate-200 focus:ring-emerald-500 rounded-xl transition-all" />
                                            </motion.div>
                                            <motion.div variants={itemVariants} className="grid gap-2">
                                                <Label htmlFor="last-name" className="text-slate-700 font-bold ml-1">Last name</Label>
                                                <Input id="last-name" placeholder="Dela Cruz" required disabled={isLoading} className="h-12 border-slate-200 focus:ring-emerald-500 rounded-xl transition-all" />
                                            </motion.div>
                                        </div>
                                        <motion.div variants={itemVariants} className="grid gap-2">
                                            <Label htmlFor="email" className="text-slate-700 font-bold ml-1">Email Address</Label>
                                            <Input
                                                id="email"
                                                placeholder="name@example.com"
                                                type="email"
                                                autoCapitalize="none"
                                                autoComplete="email"
                                                autoCorrect="off"
                                                disabled={isLoading}
                                                className="h-12 border-slate-200 focus:ring-emerald-500 rounded-xl transition-all"
                                            />
                                        </motion.div>
                                        <motion.div variants={itemVariants} className="grid gap-2">
                                            <Label htmlFor="password" title="password" className="text-slate-700 font-bold ml-1">Password</Label>
                                            <Input id="password" type="password" disabled={isLoading} className="h-12 border-slate-200 focus:ring-emerald-500 rounded-xl transition-all" />
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider ml-1">Security hint: Use at least 8 characters</p>
                                        </motion.div>

                                        <motion.div variants={itemVariants}>
                                            <Button
                                                disabled={isLoading}
                                                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-12 rounded-xl shadow-lg shadow-emerald-200 transition-all active:scale-[0.98] mt-2"
                                            >
                                                {isLoading ? (
                                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                                ) : (
                                                    "Create Scholar Account"
                                                )}
                                            </Button>
                                        </motion.div>
                                    </div>
                                </form>

                                <motion.div variants={itemVariants} className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <span className="w-full border-t border-slate-100" />
                                    </div>
                                    <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest">
                                        <span className="bg-slate-50 px-3 text-slate-400">Or integrate with</span>
                                    </div>
                                </motion.div>

                                <motion.div variants={itemVariants}>
                                    <Button
                                        variant="outline"
                                        type="button"
                                        disabled={isLoading}
                                        className="w-full border-slate-200 text-slate-600 font-bold h-12 rounded-xl hover:bg-white hover:border-slate-300 hover:shadow-sm transition-all active:scale-[0.98]"
                                    >
                                        <svg className="mr-2 h-5 w-5" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                                            <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                                        </svg>
                                        Sign up with Google
                                    </Button>
                                </motion.div>
                            </motion.div>
                        </CardContent>
                        <CardFooter className="flex flex-col space-y-6 px-0 mt-8">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.2 }}
                                className="text-center text-sm font-medium text-slate-500"
                            >
                                Already have an account?{" "}
                                <Link href="/login" className="font-black text-emerald-600 hover:text-emerald-700 underline underline-offset-4 decoration-emerald-200 hover:decoration-emerald-500 transition-all">
                                    Sign in here
                                </Link>
                            </motion.div>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.6 }}
                                transition={{ delay: 1.4 }}
                                className="px-8 text-center text-[11px] font-medium text-slate-400 leading-relaxed"
                            >
                                By clicking create account, you agree to our{" "}
                                <Link href="/terms" className="underline underline-offset-4 hover:text-slate-900 transition-colors">
                                    Terms of Service
                                </Link>{" "}
                                and{" "}
                                <Link href="/privacy" className="underline underline-offset-4 hover:text-slate-900 transition-colors">
                                    Privacy Policy
                                </Link>
                                .
                            </motion.p>
                        </CardFooter>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}
