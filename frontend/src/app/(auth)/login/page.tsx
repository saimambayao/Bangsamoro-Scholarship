"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Eye, EyeOff, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { login, setAuthToken, setUser } from "@/lib/api";

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

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

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await login(username, password);
            setAuthToken(response.token);
            setUser(response.user);

            // Redirect based on user role
            if (response.user.is_platform_admin || response.user.role === 'super_admin') {
                router.push('/admin');
            } else if (response.user.is_entity_staff) {
                router.push('/provider');
            } else {
                router.push('/dashboard');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unexpected error occurred');
        } finally {
            setIsLoading(false);
        }
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
                            Bridging Opportunities and the Bangsamoro Youth
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.9 }}
                            className="text-emerald-100/60 text-lg max-w-sm font-medium leading-relaxed"
                        >
                            Access official education pathways and join a community of scholars building the future.
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
            <div className="flex-1 flex flex-col items-center justify-start pt-12 md:pt-24 px-8 pb-8 bg-slate-50/50 overflow-y-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                    className="w-full max-w-md"
                >
                    <Card className="border-0 shadow-none bg-transparent">
                        <CardHeader className="space-y-3 px-0 mb-10">
                            <CardTitle className="text-5xl font-black tracking-tighter text-slate-900 leading-none">Welcome back</CardTitle>
                            <CardDescription className="text-slate-500 font-bold text-lg tracking-tight">
                                Sign in to your scholar account
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="px-0">
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                className="grid gap-8"
                            >
                                {error && (
                                    <motion.div variants={itemVariants}>
                                        <Alert variant="destructive" className="border-red-100 bg-red-50 text-red-900 rounded-2xl p-4 shadow-sm shadow-red-100">
                                            <AlertCircle className="h-5 w-5 text-red-600" />
                                            <AlertDescription className="font-bold ml-2">{error}</AlertDescription>
                                        </Alert>
                                    </motion.div>
                                )}
                                <form onSubmit={onSubmit}>
                                    <div className="grid gap-6">
                                        <motion.div variants={itemVariants} className="grid gap-2.5">
                                            <Label htmlFor="username" className="text-slate-800 font-black uppercase text-[10px] tracking-widest ml-1">Email or Username</Label>
                                            <Input
                                                id="username"
                                                placeholder="Enter your credential"
                                                type="text"
                                                autoCapitalize="none"
                                                autoComplete="username"
                                                autoCorrect="off"
                                                disabled={isLoading}
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                required
                                                className="h-14 border-slate-200 focus:border-emerald-500 bg-white shadow-sm rounded-2xl transition-all duration-300 font-bold text-slate-700 placeholder:text-slate-300 placeholder:font-medium"
                                            />
                                        </motion.div>
                                        <motion.div variants={itemVariants} className="grid gap-2.5">
                                            <div className="flex items-center justify-between ml-1">
                                                <Label htmlFor="password" title="password" className="text-slate-800 font-black uppercase text-[10px] tracking-widest">Password</Label>
                                                <Link href="/forgot-password" title="password" className="text-[10px] font-black uppercase tracking-widest text-emerald-600 hover:text-emerald-700 transition-colors">
                                                    Forgot?
                                                </Link>
                                            </div>
                                            <div className="relative group">
                                                <Input
                                                    id="password"
                                                    type={showPassword ? "text" : "password"}
                                                    disabled={isLoading}
                                                    value={password}
                                                    placeholder="••••••••"
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    required
                                                    className="h-14 border-slate-200 focus:border-emerald-500 bg-white shadow-sm rounded-2xl transition-all duration-300 pr-14 font-bold text-slate-700 placeholder:tracking-widest"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-emerald-600 p-1.5 rounded-xl transition-all duration-300"
                                                    tabIndex={-1}
                                                >
                                                    {showPassword ? (
                                                        <EyeOff className="h-5 w-5" />
                                                    ) : (
                                                        <Eye className="h-5 w-5" />
                                                    )}
                                                </button>
                                            </div>
                                        </motion.div>

                                        <motion.div variants={itemVariants} className="flex items-center justify-between pt-1">
                                            <div className="flex items-center space-x-2.5 ml-1">
                                                <Checkbox id="remember" className="h-5 w-5 rounded-lg border-2 border-slate-200 data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600 transition-all duration-300" />
                                                <label
                                                    htmlFor="remember"
                                                    className="text-[13px] font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-500"
                                                >
                                                    Keep me logged in
                                                </label>
                                            </div>
                                        </motion.div>

                                        <motion.div variants={itemVariants} className="pt-2">
                                            <Button
                                                disabled={isLoading}
                                                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black h-14 rounded-2xl shadow-xl shadow-emerald-200 transition-all duration-300 active:scale-[0.98] text-base"
                                            >
                                                {isLoading ? (
                                                    <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                                                ) : (
                                                    "Sign In Now"
                                                )}
                                            </Button>
                                        </motion.div>
                                    </div>
                                </form>

                                <motion.div variants={itemVariants} className="relative py-2">
                                    <div className="absolute inset-0 flex items-center">
                                        <span className="w-full border-t border-slate-100" />
                                    </div>
                                    <div className="relative flex justify-center text-[9px] font-black uppercase tracking-[0.3em]">
                                        <span className="bg-slate-50/50 px-4 text-slate-300">Or integrate with</span>
                                    </div>
                                </motion.div>

                                <motion.div variants={itemVariants}>
                                    <Button
                                        variant="outline"
                                        type="button"
                                        disabled={isLoading}
                                        className="w-full border-slate-200 text-slate-600 font-black h-14 rounded-2xl hover:bg-white hover:border-slate-300 hover:shadow-lg hover:shadow-slate-100 transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-3"
                                    >
                                        <svg className="h-5 w-5" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                                            <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                                        </svg>
                                        <span className="uppercase tracking-widest text-xs">Sign in with Google</span>
                                    </Button>
                                </motion.div>
                            </motion.div>
                        </CardContent>
                        <CardFooter className="flex flex-col space-y-4 px-0 mt-12">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.2 }}
                                className="text-center text-sm font-bold text-slate-400"
                            >
                                Not a registered scholar yet?{" "}
                                <Link href="/register" className="font-black text-emerald-600 hover:text-emerald-700 underline underline-offset-8 decoration-emerald-200/50 hover:decoration-emerald-500 transition-all duration-300">
                                    Apply for Account
                                </Link>
                            </motion.div>
                        </CardFooter>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}
