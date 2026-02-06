
"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardCalendar() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        setCurrentDate(new Date());
    }, []);

    if (!mounted) return <Card className="border-slate-200 shadow-sm h-[400px] animate-pulse bg-slate-50" />;

    const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const monthName = currentDate.toLocaleString('default', { month: 'long' });

    const totalDays = daysInMonth(year, month);
    const startDay = firstDayOfMonth(year, month);

    const today = new Date();
    const isToday = (day: number) => {
        return today.getDate() === day &&
            today.getMonth() === month &&
            today.getFullYear() === year;
    };

    const days = [];
    // Padding for first week
    for (let i = 0; i < startDay; i++) {
        days.push(<div key={`empty-${i}`} className="h-8 w-8" />);
    }

    // Days of the month
    for (let d = 1; d <= totalDays; d++) {
        const active = isToday(d);
        days.push(
            <div
                key={d}
                className={`h-8 w-8 flex items-center justify-center text-sm rounded-full transition-all cursor-default relative group
                    ${active
                        ? "bg-emerald-600 text-white font-bold shadow-md shadow-emerald-200"
                        : "text-slate-600 hover:bg-emerald-50 hover:text-emerald-700"}`}
            >
                {d}
                {/* Mock event indicator for some days */}
                {[5, 12, 25].includes(d) && !active && (
                    <span className="absolute bottom-1 h-1 w-1 rounded-full bg-amber-500"></span>
                )}
            </div>
        );
    }

    return (
        <Card className="border-slate-200 shadow-sm overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4 text-emerald-600" />
                        <CardTitle className="text-sm font-bold text-slate-800">Academic Calendar</CardTitle>
                    </div>
                    <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg hover:bg-white border" onClick={prevMonth}>
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg hover:bg-white border" onClick={nextMonth}>
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-4">
                <div className="text-center mb-4">
                    <h3 className="font-bold text-slate-900">{monthName} {year}</h3>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                    {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(day => (
                        <div key={day}>{day}</div>
                    ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                    {days}
                </div>

                <div className="mt-6 space-y-3">
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b pb-1">Upcoming Deadlines</h4>
                    <div className="flex items-start gap-3 p-2 rounded-lg bg-red-50/50 border border-red-100/50">
                        <div className="h-2 w-2 rounded-full bg-red-500 mt-1.5 shrink-0"></div>
                        <div className="space-y-0.5">
                            <p className="text-xs font-bold text-slate-800 leading-tight">AHME Application Closing</p>
                            <p className="text-[10px] text-red-600 font-medium font-bold uppercase">Today • 11:59 PM</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 p-2 rounded-lg bg-emerald-50/50 border border-emerald-100/50">
                        <div className="h-2 w-2 rounded-full bg-emerald-500 mt-1.5 shrink-0"></div>
                        <div className="space-y-0.5">
                            <p className="text-xs font-bold text-slate-800 leading-tight">New Semester Registration</p>
                            <p className="text-[10px] text-emerald-600 font-medium font-bold uppercase">Feb 15, 2026</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
