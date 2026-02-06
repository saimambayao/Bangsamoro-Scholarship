"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SCHOLARS_DIRECTORY } from "@/lib/mock-data";
import { Search, MapPin, GraduationCap, UserPlus, MessageSquare, Loader2 } from "lucide-react";
import Link from "next/link";

export default function ScholarDirectoryPage() {
    const [itemsToShow, setItemsToShow] = useState(6);
    const [isLoading, setIsLoading] = useState(false);

    const handleLoadMore = () => {
        setIsLoading(true);
        // Simulate a small delay for premium feel
        setTimeout(() => {
            setItemsToShow(prev => prev + 3);
            setIsLoading(false);
        }, 600);
    };

    const visibleScholars = SCHOLARS_DIRECTORY.slice(0, itemsToShow);
    const hasMore = itemsToShow < SCHOLARS_DIRECTORY.length;

    return (
        <div className="space-y-6">
            {/* Search and Filters */}
            <Card className="p-4 border-slate-200/60 shadow-sm">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search scholars by name, school, or course..."
                            className="pl-9 bg-slate-50/50 border-slate-200"
                        />
                    </div>
                    <div className="flex gap-2">
                        <Select>
                            <SelectTrigger className="w-[140px] bg-white border-slate-200">
                                <SelectValue placeholder="Scholarship" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Programs</SelectItem>
                                <SelectItem value="ahme">AHME</SelectItem>
                                <SelectItem value="base">BASE</SelectItem>
                                <SelectItem value="tes">TES</SelectItem>
                                <SelectItem value="ministry">Ministry</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select>
                            <SelectTrigger className="w-[140px] bg-white border-slate-200">
                                <SelectValue placeholder="School" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Schools</SelectItem>
                                <SelectItem value="ndu">Notre Dame Univ</SelectItem>
                                <SelectItem value="msu">MSU System</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </Card>

            {/* Directory Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {visibleScholars.map((scholar) => (
                    <Card key={scholar.id} className="overflow-hidden flex flex-col border-slate-200 shadow-sm hover:shadow-md transition-all duration-300">
                        <CardContent className="p-6 flex-1 flex flex-col items-center text-center">
                            <Link href={`/dashboard/community/scholars/${scholar.id}`}>
                                <Avatar className="h-24 w-24 mb-4 ring-2 ring-emerald-50 cursor-pointer hover:ring-emerald-200 transition-all border-4 border-white shadow-sm">
                                    <AvatarImage src={scholar.avatar} alt={scholar.name} />
                                    <AvatarFallback className="text-xl bg-emerald-50 text-emerald-700">
                                        {scholar.name.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>
                            </Link>
                            <h3 className="font-bold text-lg text-slate-900 mb-1">
                                <Link href={`/dashboard/community/scholars/${scholar.id}`} className="hover:text-emerald-700 transition-colors">
                                    {scholar.name}
                                </Link>
                            </h3>
                            <p className="text-sm text-emerald-700 font-semibold mb-2">{scholar.type}</p>

                            <div className="space-y-1 text-sm text-slate-500 mb-4">
                                <p className="font-medium text-slate-600">{scholar.program}</p>
                                <p className="text-xs">{scholar.school}</p>
                            </div>

                            <div className="flex items-center gap-1 text-[11px] font-medium text-slate-500 bg-slate-100/80 px-2.5 py-1 rounded-full mb-4">
                                <MapPin className="h-3 w-3 text-emerald-600" />
                                {scholar.location}
                            </div>

                            {scholar.achievements.length > 0 && (
                                <div className="flex flex-wrap gap-1 justify-center">
                                    {scholar.achievements.slice(0, 2).map((achievement, i) => (
                                        <Badge key={i} variant="secondary" className="text-[10px] bg-amber-50 text-amber-800 border-amber-100 font-bold uppercase tracking-tighter">
                                            🏆 {achievement}
                                        </Badge>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                        <CardFooter className="p-3 bg-slate-50/50 grid grid-cols-2 gap-2 border-t border-slate-100 text-sm">
                            <Button variant="outline" size="sm" className="w-full text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50 border-emerald-200/60 font-semibold">
                                <UserPlus className="h-4 w-4 mr-2" />
                                Connect
                            </Button>
                            <Button variant="ghost" size="sm" className="w-full text-slate-600 font-semibold">
                                <MessageSquare className="h-4 w-4 mr-2" />
                                Message
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {hasMore ? (
                <div className="flex justify-center mt-12 pb-8">
                    <Button
                        variant="outline"
                        size="lg"
                        className="min-w-[200px] border-emerald-200 text-emerald-700 hover:bg-emerald-50 font-bold uppercase tracking-wider transition-all"
                        onClick={handleLoadMore}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Loading...
                            </>
                        ) : (
                            "Load More Scholars"
                        )}
                    </Button>
                </div>
            ) : (
                <div className="text-center py-12 text-slate-400 font-medium italic">
                    All scholars displayed.
                </div>
            )}
        </div>
    );
}
