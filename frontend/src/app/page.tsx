"use client";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import Hero from "@/components/features/Hero";
import FeaturedScholarships from "@/components/features/FeaturedScholarships";
import PartnerMarquee from "@/components/features/PartnerMarquee";
import { motion } from "framer-motion";
import { STATS, SUCCESS_STORIES, PARTNERS } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, UserPlus, Search, ClipboardList } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />

      <Hero />

      {/* Impact Stats */}
      <section className="border-y bg-background py-4">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {STATS.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center text-center space-y-2 group">
                <span className="text-4xl font-extrabold text-primary md:text-5xl group-hover:scale-110 transition-transform duration-300">
                  {stat.value}
                </span>
                <span className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FeaturedScholarships />

      {/* How It Works */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl uppercase text-primary">How It Works</h2>
            <p className="mt-4 text-muted-foreground mx-auto max-w-2xl">
              Applying for a scholarship has never been easier. Follow these simple steps to start your journey.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-3 whitespace-normal">
            {[
              { step: "01", title: "Create Profile", desc: "Register and complete your academic and personal profile.", icon: <UserPlus className="h-8 w-8" />, href: "/register" },
              { step: "02", title: "Apply Online", desc: "Submit your application and upload documents directly.", icon: <ClipboardList className="h-8 w-8" />, href: "/scholarships" },
              { step: "03", title: "Track Status", desc: "Monitor your application progress in real-time.", icon: <CheckCircle2 className="h-8 w-8" />, href: "/dashboard" },
            ].map((item, idx) => (
              <Link key={idx} href={item.href} className="relative flex flex-col items-center text-center group cursor-pointer">
                <div className="mb-4 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="mb-3 text-xl font-bold group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed px-4 group-hover:text-foreground transition-colors">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stories Peek */}
      <section className="bg-primary py-16 text-white overflow-hidden relative">
        <div className="absolute inset-0 z-0">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.25 }}
            transition={{ duration: 2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="absolute right-0 top-0 w-1/2 h-full"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/20 to-transparent z-10"></div>
            <img
              src="/images/barmm-bg-mosque.png"
              className="w-full h-full object-cover grayscale brightness-200 contrast-75"
              alt=""
            />
          </motion.div>
          <div className="absolute top-0 right-0 w-1/2 h-full bg-secondary/5 skew-x-12 translate-x-1/3"></div>
        </div>
        <div className="container relative z-10 mx-auto px-4">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-center">
            <div className="relative z-20 lg:col-span-5">
              <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl uppercase">
                Inspiring <span className="text-secondary">Message</span>
              </h2>
              <div className="mt-8 relative">
                <span className="absolute -left-4 -top-4 text-6xl text-secondary/20 font-serif">"</span>
                <p className="text-primary-foreground/90 leading-relaxed text-xl italic font-light relative z-10">
                  Although we come from different programs and have faced different struggles, we are united by the same journey of showing up even when it was difficult. As we move forward into our respective professions, may we carry with us the values instilled by Mindanao State University: integrity, humility, excellence, and compassion. May we use our knowledge not only to build successful careers but to serve people, uplift communities, and become instruments of positive change.
                </p>
                <span className="absolute -right-4 bottom-0 text-6xl text-secondary/20 font-serif leading-none">"</span>
              </div>

              <div className="mt-12 flex justify-start">
                <Link href="/success-stories">
                  <Button className="h-12 px-8 bg-secondary text-primary hover:bg-white hover:text-primary transition-all font-bold uppercase tracking-wider group">
                    View Success Stories
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative w-full flex justify-center lg:col-span-7">
              <div className="relative w-full max-w-xl aspect-[3/4] group">
                <img
                  src="/images/top-scholar-sittie-new.jpg"
                  alt="Maria Santos, RN - Top Performing Scholar 2025"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 rounded-lg shadow-2xl"
                />



                {/* Text overlay at bottom */}
                <div className="absolute bottom-8 left-0 right-0 text-center z-30 pointer-events-none">
                  <h4 className="text-2xl font-bold uppercase tracking-widest text-white drop-shadow-[0_4px_6px_rgba(0,0,0,0.9)]">
                    2025 Top Performing Scholar
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PartnerMarquee />

      <Footer />
    </main>
  );
}
