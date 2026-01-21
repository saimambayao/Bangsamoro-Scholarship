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
import { login, setAuthToken, setUser } from "@/lib/api";

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

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
        <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
            {/* Left Side - Visuals */}
            <div className="hidden md:flex flex-col justify-between w-1/2 lg:w-2/5 bg-emerald-900 text-white p-10 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                        <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
                    </svg>
                </div>

                <div className="relative z-10">
                    <Link href="/" className="flex items-center gap-2 text-white/80 hover:text-white mb-10">
                        <ArrowLeft className="h-4 w-4" /> Back to Home
                    </Link>
                    <div className="mb-6">
                        <span className="text-4xl font-bold">Bangsamoro <span className="text-secondary">Scholarship</span> Portal</span>
                    </div>
                    <h1 className="text-3xl font-bold mb-4">Bridging Opportunities and the Bangsamoro Youth</h1>
                    <p className="text-emerald-100 text-lg">
                        Access education opportunities, manage your scholarship applications, and connect with mentors.
                    </p>
                </div>

                <div className="relative z-10 text-sm text-emerald-200">
                    &copy; 2026 Bangsamoro Scholarship Portal
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex-1 flex items-center justify-center p-6">
                <Card className="w-full max-w-md border-0 shadow-none bg-transparent">
                    <CardHeader className="space-y-1 px-0">
                        <CardTitle className="text-3xl font-bold text-slate-900">Welcome back</CardTitle>
                        <CardDescription className="text-slate-600">
                            Enter your credentials to access your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="px-0">
                        <div className="grid gap-6">
                            {error && (
                                <Alert variant="destructive">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}
                            <form onSubmit={onSubmit}>
                                <div className="grid gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="username">Email or Username</Label>
                                        <Input
                                            id="username"
                                            placeholder="Email or username"
                                            type="text"
                                            autoCapitalize="none"
                                            autoComplete="username"
                                            autoCorrect="off"
                                            disabled={isLoading}
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="password">Password</Label>
                                            <Link href="/forgot-password" className="text-sm font-medium text-emerald-600 hover:text-emerald-500">
                                                Forgot password?
                                            </Link>
                                        </div>
                                        <div className="relative">
                                            <Input
                                                id="password"
                                                type={showPassword ? "text" : "password"}
                                                disabled={isLoading}
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                                className="pr-10"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                                                tabIndex={-1}
                                            >
                                                {showPassword ? (
                                                    <EyeOff className="h-4 w-4" />
                                                ) : (
                                                    <Eye className="h-4 w-4" />
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="remember" />
                                        <label
                                            htmlFor="remember"
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-600"
                                        >
                                            Remember me
                                        </label>
                                    </div>

                                    <Button disabled={isLoading} className="bg-emerald-600 hover:bg-emerald-700 mt-2">
                                        {isLoading && (
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        )}
                                        Sign In
                                    </Button>
                                </div>
                            </form>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t border-slate-200" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-slate-50 px-2 text-slate-500">Or continue with</span>
                                </div>
                            </div>

                            <Button variant="outline" type="button" disabled={isLoading} className="border-slate-300 text-slate-700 hover:bg-slate-50">
                                {isLoading ? (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                    <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                                        <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                                    </svg>
                                )}
                                Google
                            </Button>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4 px-0">
                        <div className="text-center text-sm text-slate-600">
                            Don&apos;t have an account?{" "}
                            <Link href="/register" className="font-bold text-emerald-600 hover:text-emerald-500">
                                Sign up
                            </Link>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
