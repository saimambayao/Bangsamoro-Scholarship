
"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Quote, Award, Calendar, School, BookOpen, Share2 } from "lucide-react";
import { SUCCESS_STORIES } from "@/lib/mock-data";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

export default function StoryDetailPage() {
    const params = useParams();
    const router = useRouter();
    const storyId = params.id as string;

    const story = SUCCESS_STORIES.find(s => s.id === storyId);

    if (!story) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <div className="flex-grow flex flex-col items-center justify-center p-4">
                    <h1 className="text-2xl font-bold mb-4">Story not found</h1>
                    <Button onClick={() => router.push('/success-stories')}>
                        Back to Stories
                    </Button>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <Header />

            <main className="pt-24 pb-20">
                <div className="container mx-auto px-4 md:px-6">
                    {/* Navigation */}
                    <div className="mb-8">
                        <Link
                            href="/success-stories"
                            className="inline-flex items-center text-emerald-700 hover:text-emerald-800 font-medium transition-colors group"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                            Back to Success Stories
                        </Link>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-12">
                        {/* Sidebar Information */}
                        <aside className="lg:col-span-4 space-y-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border-4 border-emerald-50"
                            >
                                <Image
                                    src={story.image}
                                    alt={story.name}
                                    fill
                                    className="object-cover object-top"
                                    priority
                                />
                                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-emerald-900/90 to-transparent p-6 text-white">
                                    <h1 className="text-2xl font-bold">{story.name}</h1>
                                    <p className="text-emerald-100 opacity-90">{story.role}</p>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="bg-slate-50 rounded-2xl p-6 border border-slate-100 space-y-6"
                            >
                                <h3 className="text-lg font-bold text-slate-900 flex items-center">
                                    <Award className="mr-2 h-5 w-5 text-emerald-600" />
                                    Scholar Details
                                </h3>

                                <div className="space-y-4">
                                    <div className="flex items-start">
                                        <School className="h-5 w-5 text-slate-400 mr-3 mt-0.5" />
                                        <div>
                                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Institution</p>
                                            <p className="text-slate-700 font-medium">{story.school}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <BookOpen className="h-5 w-5 text-slate-400 mr-3 mt-0.5" />
                                        <div>
                                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Program</p>
                                            <p className="text-slate-700 font-medium">{story.program}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <Calendar className="h-5 w-5 text-slate-400 mr-3 mt-0.5" />
                                        <div>
                                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Scholarship Year</p>
                                            <p className="text-slate-700 font-medium">{story.role.split(' ').pop()}</p>
                                        </div>
                                    </div>
                                </div>

                                <Separator />

                                <div className="space-y-4">
                                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-tight">Key Achievements</h4>
                                    <ul className="space-y-2">
                                        {story.achievements.map((achievement, idx) => (
                                            <li key={idx} className="flex items-center text-sm text-slate-600 bg-white p-2 rounded-lg border border-slate-100">
                                                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 mr-2" />
                                                {achievement}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <Button className="w-full bg-emerald-700 hover:bg-emerald-800 text-white" variant="default">
                                    <Share2 className="mr-2 h-4 w-4" /> Share This Story
                                </Button>
                            </motion.div>
                        </aside>

                        {/* Main Content */}
                        <div className="lg:col-span-8">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                className="prose prose-emerald lg:prose-xl max-w-none"
                            >
                                <div className="mb-10">
                                    <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-none mb-4 px-3 py-1 text-sm font-semibold">
                                        Success Story
                                    </Badge>
                                    <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-6 mt-2">
                                        Turning Dreams into Reality: The Journey of {story.name.split(',')[0]}
                                    </h2>

                                    <div className="relative p-8 md:p-12 bg-emerald-50 rounded-3xl border-l-8 border-emerald-500 mb-12 italic text-emerald-900 text-xl md:text-2xl font-light leading-relaxed">
                                        <Quote className="absolute top-4 left-4 h-12 w-12 text-emerald-200 opacity-50" />
                                        "{story.quote}"
                                    </div>
                                </div>

                                <div className="text-slate-700 space-y-6 text-lg md:text-xl leading-relaxed">
                                    {story.story.split('\n\n').map((paragraph, idx) => (
                                        <p key={idx}>{paragraph}</p>
                                    ))}

                                    <p>
                                        Today, {story.name.split(',')[0]} stands as a beacon of hope for many young Bangsamoro students. Her journey reminds us that with the right support and unwavering determination, no obstacle is too great to overcome.
                                    </p>

                                    <div className="bg-slate-900 text-white p-8 md:p-12 rounded-3xl mt-16 relative overflow-hidden">
                                        <div className="relative z-10">
                                            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-emerald-400">Ready to start your own journey?</h3>
                                            <p className="text-slate-300 mb-8 max-w-lg">
                                                The Bangsamoro Scholarship Portal connects you with opportunities that can change your life. Explore available programs today.
                                            </p>
                                            <Link href="/scholarships">
                                                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 font-bold px-8">
                                                    Browse Scholarships
                                                </Button>
                                            </Link>
                                        </div>
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
