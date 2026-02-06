
"use client";

import Link from "next/link";
import {
    ArrowRight,
    Calendar,
    CheckCircle2,
    Clock,
    FileText,
    AlertCircle,
    Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SCHOLARSHIPS, NOTIFICATIONS } from "@/lib/mock-data";

import DashboardCalendar from "@/components/shared/DashboardCalendar";

export default function DashboardPage() {
    // Mock user applications based on existing scholarships
    const myApplications = [
        {
            id: "app-1",
            scholarship: SCHOLARSHIPS[0], // AHME
            status: "Under Review",
            submittedDate: "Jan 15, 2026",
            lastUpdate: "2 days ago",
            progress: 40
        },
        {
            id: "app-2",
            scholarship: SCHOLARSHIPS[2], // Medical
            status: "Draft",
            submittedDate: null,
            lastUpdate: "1 week ago",
            progress: 20
        }
    ];

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
                    <p className="text-slate-600">Welcome back, Juan! Here's an overview of your scholarship applications.</p>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <Card className="bg-white border-slate-200 shadow-sm transition-all hover:shadow-md hover:border-emerald-100 group">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wider">Total Applications</CardTitle>
                        <div className="p-2 bg-emerald-50 rounded-lg group-hover:bg-emerald-100 transition-colors">
                            <FileText className="h-4 w-4 text-emerald-600" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-slate-900">2</div>
                        <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                            <span className="font-bold text-emerald-600">1</span> submitted, <span className="font-bold text-slate-400">1</span> draft
                        </p>
                    </CardContent>
                </Card>
                <Card className="bg-white border-slate-200 shadow-sm transition-all hover:shadow-md hover:border-amber-100 group">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wider">Pending Actions</CardTitle>
                        <div className="p-2 bg-amber-50 rounded-lg group-hover:bg-amber-100 transition-colors">
                            <AlertCircle className="h-4 w-4 text-amber-500" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-slate-900">1</div>
                        <p className="text-xs text-amber-600 font-bold mt-1">Document issue requiring attention</p>
                    </CardContent>
                </Card>
                <Card className="bg-white border-slate-200 shadow-sm transition-all hover:shadow-md hover:border-slate-300 group">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wider">Available Slots</CardTitle>
                        <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-slate-100 transition-colors">
                            <CheckCircle2 className="h-4 w-4 text-slate-400" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-slate-900">150+</div>
                        <p className="text-xs text-slate-500 mt-1">Scholarships currently open</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-7">
                {/* Applications & Notifications Column */}
                <div className="lg:col-span-4 space-y-6">
                    <Card className="border-slate-200 shadow-sm overflow-hidden">
                        <CardHeader className="bg-slate-50/50 border-b">
                            <CardTitle className="text-lg">Recent Applications</CardTitle>
                            <CardDescription>Status updates on your submitted applications.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="divide-y divide-slate-100">
                                {myApplications.map((app) => (
                                    <div key={app.id} className="p-6 transition-colors hover:bg-slate-50/50">
                                        <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                                            <div className="flex gap-4">
                                                <div className="h-14 w-14 rounded-xl bg-white border border-slate-100 shadow-sm flex items-center justify-center p-2 flex-shrink-0 group-hover:scale-105 transition-transform">
                                                    {app.scholarship?.logo ? (
                                                        <img
                                                            src={app.scholarship.logo}
                                                            alt={app.scholarship.provider}
                                                            className="h-10 w-10 object-contain"
                                                        />
                                                    ) : (
                                                        <span className="text-xs font-bold text-emerald-700">{app.scholarship?.provider}</span>
                                                    )}
                                                </div>
                                                <div className="space-y-1">
                                                    <h4 className="font-bold text-slate-900 leading-tight group-hover:text-emerald-700 transition-colors">{app.scholarship?.title}</h4>
                                                    <p className="text-sm text-emerald-700 font-bold">{app.scholarship?.providerFull}</p>
                                                    <div className="flex items-center gap-3 mt-2">
                                                        <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                                                            ID: {app.id}
                                                        </span>
                                                        <span className="text-[10px] text-slate-400 font-medium">
                                                            Submitted: {app.submittedDate || "—"}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end gap-2 w-full sm:w-auto h-full justify-between">
                                                <Badge
                                                    variant={app.status === 'Draft' ? 'outline' : 'default'}
                                                    className={
                                                        app.status === 'Under Review' ? 'bg-amber-100 text-amber-700 hover:bg-amber-200 border-amber-200' :
                                                            app.status === 'Draft' ? 'text-slate-500 border-slate-300' :
                                                                'bg-emerald-100 text-emerald-700'
                                                    }
                                                >
                                                    {app.status}
                                                </Badge>
                                                <Link href={`/dashboard/applications/${app.id}`}>
                                                    <Button variant="link" className="h-auto p-0 text-emerald-600 hover:text-emerald-700 text-sm font-bold">
                                                        View Details &rarr;
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="p-4 bg-slate-50 text-center border-t">
                                <Link href="/dashboard/applications">
                                    <Button variant="ghost" size="sm" className="text-emerald-700 font-bold hover:bg-emerald-100/50">
                                        View All Applications <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-slate-200 shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-lg">Recent Notifications</CardTitle>
                            <CardDescription>Latest updates from the portal.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {NOTIFICATIONS.map((notif: any) => (
                                <div key={notif.id} className={`flex gap-4 p-4 rounded-xl border transition-all ${notif.read ? 'bg-white border-slate-100 shadow-none' : 'bg-emerald-50/30 border-emerald-100 shadow-sm'}`}>
                                    <div className={`mt-1 h-2 w-2 rounded-full shrink-0 ${notif.read ? 'bg-slate-300' : 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]'}`} />
                                    <div className="space-y-1">
                                        <p className={`text-sm font-bold leading-none ${notif.read ? 'text-slate-700' : 'text-slate-900 italic'}`}>{notif.title}</p>
                                        <p className="text-sm text-slate-600 leading-relaxed">{notif.message}</p>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-2">{notif.time}</p>
                                    </div>
                                </div>
                            ))}
                            <Link href="/dashboard/notifications" className="block mt-4">
                                <Button variant="outline" className="w-full text-slate-600 font-bold border-slate-200">
                                    View All Notifications
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>

                {/* Calendar Column */}
                <div className="lg:col-span-3 space-y-6">
                    <DashboardCalendar />

                    <Card className="bg-gradient-to-br from-slate-900 to-emerald-950 text-white border-none shadow-xl relative overflow-hidden group">
                        <CardContent className="p-6 relative z-10">
                            <h4 className="text-lg font-bold mb-2">Need Assistance?</h4>
                            <p className="text-emerald-100/80 text-sm mb-6 leading-relaxed">Our support team is ready to help you with your scholarship journey.</p>
                            <Link href="/dashboard/messages">
                                <Button className="bg-emerald-500 hover:bg-emerald-600 font-bold text-white border-none shadow-lg shadow-emerald-900/40 px-6">
                                    Chat with Support
                                </Button>
                            </Link>
                        </CardContent>
                        {/* Decorative elements */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-emerald-500/20 transition-colors"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
