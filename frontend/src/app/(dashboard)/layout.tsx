
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
    CreditCard,
    FileText,
    Home,
    LayoutDashboard,
    LogOut,
    Mail,
    Menu,
    Settings,
    User,
    Bell,
    Search,
    Bookmark,
    Users,
    ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const sidebarNavItems = [
    {
        title: "Home",
        href: "/dashboard",
        icon: Home,
    },
    {
        title: "My Applications",
        href: "/dashboard/applications",
        icon: FileText,
    },
    {
        title: "Saved Scholarships",
        href: "/dashboard/saved",
        icon: Bookmark,
    },
    {
        title: "Documents",
        href: "/dashboard/documents",
        icon: CreditCard,
    },
    {
        title: "Messages",
        href: "/dashboard/messages",
        icon: Mail,
    },
    {
        title: "Community",
        href: "/dashboard/community",
        icon: Users,
    },
    {
        title: "Profile",
        href: "/dashboard/profile",
        icon: User,
    },
    {
        title: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
    },
];


import { NOTIFICATIONS } from "@/lib/mock-data";
import RealTimeClock from "@/components/shared/RealTimeClock";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        router.push('/login');
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/scholarships?q=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    if (!mounted) {
        return <div className="min-h-screen bg-slate-50" />;
    }

    const unreadCount = NOTIFICATIONS.filter(n => !n.read).length;

    return (
        <div className="flex min-h-screen flex-col md:flex-row bg-slate-50">
            {/* Mobile Header */}
            <div className="md:hidden flex items-center justify-between p-4 bg-white border-b">
                <Link href="/" className="font-bold text-xl text-slate-900">Bangsamoro <span className="text-secondary">Scholarship</span> Portal</Link>
                <div className="flex items-center gap-2">
                    <RealTimeClock />
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                            <nav className="flex flex-col gap-4 mt-8">
                                {sidebarNavItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-colors border ${pathname === item.href
                                            ? "bg-emerald-50 text-emerald-900 border-emerald-600"
                                            : "text-slate-600 border-transparent hover:bg-slate-100 hover:text-slate-900"
                                            }`}
                                    >
                                        <item.icon className="h-5 w-5" />
                                        {item.title}
                                    </Link>
                                ))}
                                <div className="mt-auto pt-8 border-t">
                                    <Button
                                        onClick={handleLogout}
                                        variant="ghost"
                                        className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                                    >
                                        <LogOut className="mr-2 h-4 w-4" />
                                        Log out
                                    </Button>
                                </div>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>

            {/* Desktop Sidebar */}
            <aside className="hidden md:flex w-64 flex-col fixed inset-y-0 z-50 bg-white border-r shadow-[1px_0_10px_rgba(0,0,0,0.02)]">
                <div className="h-16 flex items-center px-5 border-b">
                    <Link href="/" className="flex items-center gap-3 group w-full overflow-hidden">
                        <Image
                            src="/images/logo.png"
                            alt="Bangsamoro Scholarship Portal"
                            width={32}
                            height={32}
                            className="flex-shrink-0 w-8 h-8 rounded-full shadow-sm"
                        />
                        <div className="flex flex-col min-w-0">
                            <span className="font-bold text-base text-slate-800 tracking-tight truncate leading-tight">
                                Bangsamoro
                            </span>
                            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest truncate mt-0.5">
                                <span className="text-secondary/80">Scholarship</span> Portal
                            </span>
                        </div>
                    </Link>
                </div>
                <div className="p-4 pt-4">
                    <nav className="flex flex-col gap-1.5 relative text-slate-600">
                        {sidebarNavItems.map((item) => {
                            const active = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="relative px-1"
                                >
                                    <div
                                        className={`flex items-center gap-3.5 px-3 py-2.5 rounded-xl text-sm font-bold transition-all ${active
                                            ? "text-emerald-700"
                                            : "hover:text-emerald-600 hover:bg-slate-50"
                                            }`}
                                    >
                                        <item.icon className={`h-[18px] w-[18px] transition-colors ${active ? "text-emerald-600" : "text-slate-400"}`} />
                                        {item.title}
                                    </div>

                                    {active && (
                                        <motion.div
                                            layoutId="sidebar-active-indicator"
                                            className="absolute left-0 top-3 bottom-3 w-1 bg-gradient-to-b from-emerald-600 to-secondary rounded-full"
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
                <div className="mt-auto p-4 border-t bg-slate-50/50">
                    <div className="flex items-center gap-3 px-2 py-2 mb-3">
                        <div className="relative">
                            <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                                <AvatarImage src="/avatars/user.jpg" alt="User" />
                                <AvatarFallback className="bg-emerald-100 text-emerald-700 font-bold">JD</AvatarFallback>
                            </Avatar>
                            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 border-2 border-white shadow-sm"></span>
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <p className="truncate text-sm font-bold text-slate-800">Juan Dela Cruz</p>
                            <p className="truncate text-[11px] text-slate-500 font-medium">juan@example.com</p>
                        </div>
                    </div>
                    <Button
                        onClick={handleLogout}
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start text-[13px] text-slate-500 hover:text-red-600 hover:bg-red-50 font-bold rounded-lg transition-colors"
                    >
                        <LogOut className="mr-3 h-4 w-4" />
                        Sign Out
                    </Button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
                <header className="h-16 flex items-center justify-between px-6 bg-white/80 backdrop-blur-md border-b sticky top-0 z-40">
                    <div className="flex items-center gap-4 flex-1">
                        <Link href="/scholarships" className="hidden xl:block">
                            <Button variant="ghost" className="text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50 h-10 font-bold text-xs uppercase tracking-wider px-4 rounded-lg transition-all active:scale-95 border-none">
                                Browse Scholarships
                            </Button>
                        </Link>
                        <div className="hidden xl:block h-6 w-px bg-slate-200 mx-1" />
                        <div className="flex-1 max-w-xl">
                            <form onSubmit={handleSearch} className="relative w-full">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <Input
                                    placeholder="Search scholarships..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 h-10 bg-slate-50 border-slate-200 focus-visible:ring-emerald-500 rounded-full transition-all hover:bg-white"
                                />
                            </form>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 ml-4">
                        <div className="hidden sm:block mr-2">
                            <RealTimeClock />
                        </div>

                        {/* Functional Notification Bell with styling from image */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="relative h-10 w-10 flex items-center justify-center bg-amber-100/50 hover:bg-amber-100 rounded-full flex-shrink-0 transition-all duration-300 group shadow-sm active:scale-95"
                                >
                                    <Bell className="h-[22px] w-[22px] text-emerald-800 group-hover:scale-110 transition-transform duration-300" strokeWidth={2} />
                                    {unreadCount > 0 && (
                                        <span className="absolute top-1 right-1 h-3.5 w-3.5 rounded-full bg-red-500 border-2 border-white ring-1 ring-red-200 animate-pulse shadow-sm"></span>
                                    )}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-80 p-0 border-slate-200 shadow-xl rounded-2xl overflow-hidden mt-1">
                                <div className="p-4 bg-slate-50 border-b flex items-center justify-between">
                                    <DropdownMenuLabel className="p-0 font-bold text-base text-slate-900">Notifications</DropdownMenuLabel>
                                    <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-100 font-bold text-[10px]">{unreadCount} New</Badge>
                                </div>
                                <div className="max-h-[350px] overflow-y-auto">
                                    {NOTIFICATIONS.length > 0 ? (
                                        <div className="divide-y divide-slate-100">
                                            {NOTIFICATIONS.map((notif) => (
                                                <DropdownMenuItem
                                                    key={notif.id}
                                                    className={`flex flex-col items-start p-4 cursor-pointer hover:bg-slate-50 focus:bg-slate-50 gap-1 transition-colors ${!notif.read ? 'bg-emerald-50/20' : ''}`}
                                                    onClick={() => router.push('/dashboard/notifications')}
                                                >
                                                    <div className="flex items-center justify-between w-full">
                                                        <span className="font-bold text-sm text-slate-900 leading-none">{notif.title}</span>
                                                        <span className="text-[10px] text-slate-400 font-bold uppercase">{notif.time}</span>
                                                    </div>
                                                    <p className="text-xs text-slate-500 leading-snug">{notif.message}</p>
                                                </DropdownMenuItem>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="p-8 text-center">
                                            <p className="text-sm text-slate-500 italic">No notifications yet.</p>
                                        </div>
                                    )}
                                </div>
                                <DropdownMenuSeparator className="m-0" />
                                <Link href="/dashboard/notifications" className="block w-full">
                                    <Button variant="ghost" className="w-full rounded-none h-12 text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50 border-t-0">
                                        View All Notifications <ArrowRight className="ml-2 h-3 w-3" />
                                    </Button>
                                </Link>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <div className="h-8 w-px bg-slate-200 mx-1" />
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Avatar className="h-8 w-8 cursor-pointer border hover:ring-2 hover:ring-emerald-100 transition-all">
                                    <AvatarImage src="/avatars/user.jpg" alt="User" />
                                    <AvatarFallback>JD</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => router.push('/dashboard/profile')} className="cursor-pointer">
                                    <User className="mr-2 h-4 w-4" /> Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => router.push('/dashboard/settings')} className="cursor-pointer">
                                    <Settings className="mr-2 h-4 w-4" /> Settings
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-700 focus:bg-red-50 cursor-pointer">
                                    <LogOut className="mr-2 h-4 w-4" /> Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>

                <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full">
                    {children}
                </main>
            </div>
        </div>
    );
}
