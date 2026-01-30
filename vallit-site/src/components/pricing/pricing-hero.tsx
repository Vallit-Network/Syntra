"use client";

import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { TrendingUp, Clock, Zap, CheckCircle2 } from "lucide-react";

export function PricingHero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    const fadeInUp = {
        hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
        visible: { opacity: 1, y: 0, filter: "blur(0px)" }
    };

    return (
        <section ref={containerRef} className="relative pt-32 pb-0 md:pt-48 overflow-hidden bg-[#020202]">
            {/* Text Content */}
            <div className="container relative z-20 mx-auto px-6 max-w-5xl text-center mb-0">
                <motion.div
                    style={{ opacity, y }}
                    initial="hidden"
                    animate="visible"
                    transition={{ staggerChildren: 0.15 }}
                >
                    <motion.div
                        variants={fadeInUp}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <Badge variant="accent" className="mb-6">
                            Pricing
                        </Badge>
                    </motion.div>

                    <motion.h1
                        variants={fadeInUp}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8"
                    >
                        Invest in AI that <br />
                        <span className="text-[var(--accent)]">pays for itself.</span>
                    </motion.h1>

                    <motion.p
                        variants={fadeInUp}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-xl md:text-2xl text-[var(--gray-300)] leading-relaxed max-w-2xl mx-auto mb-12"
                    >
                        Simple pricing, no surprises. We handle everything—you just watch
                        your team get hours back every week.
                    </motion.p>

                    <motion.div
                        variants={fadeInUp}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <ButtonLink href="#pricing" size="lg" className="shadow-lg shadow-[var(--accent)]/20 px-8 py-6 text-lg">
                            View Plans
                        </ButtonLink>
                        <ButtonLink href="#contact" variant="secondary" size="lg" className="bg-white/5 border border-white/10 hover:bg-white/10 px-8 py-6 text-lg">
                            Talk to Sales
                        </ButtonLink>
                    </motion.div>
                </motion.div>
            </div>

            {/* 3D Dashboard Mockup */}
            <div className="relative w-full max-w-[1400px] mx-auto perspective-[2000px] z-10 -mt-16 md:-mt-24 pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, rotateX: 30, y: 100, filter: "blur(10px)" }}
                    animate={{ opacity: 1, rotateX: 20, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 1.4, ease: "circOut", delay: 0.5 }}
                    style={{
                        transformStyle: "preserve-3d",
                        transformOrigin: "top center",
                    }}
                    className="relative w-full"
                >
                    <div className="relative mx-auto w-full md:w-[90%] aspect-[16/9] bg-[#050505] rounded-t-2xl border-t border-x border-white/10 shadow-[0_-20px_60px_-20px_rgba(255,255,255,0.05)] overflow-hidden ring-1 ring-white/5">
                        {/* Grid Overlay */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
                        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />

                        {/* Status Bar */}
                        <div className="h-10 border-b border-white/5 bg-[#080808] flex items-center px-6 justify-between relative z-10">
                            <div className="flex gap-2">
                                <div className="w-2.5 h-2.5 rounded-full bg-[#FB5454]" />
                                <div className="w-2.5 h-2.5 rounded-full bg-[#FDBB2E]" />
                                <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="px-2 py-0.5 rounded text-[10px] bg-white/5 text-white/40 font-mono border border-white/5">roi-dashboard.tsx</div>
                                <div className="text-[10px] font-mono text-white/20">VALLIT_ANALYTICS</div>
                            </div>
                        </div>

                        {/* Dashboard Content */}
                        <div className="flex h-full relative z-10">
                            {/* Sidebar */}
                            <div className="w-16 hidden md:flex flex-col items-center py-6 gap-6 border-r border-white/5 bg-[#070707]">
                                <div className="w-8 h-8 rounded-lg bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center">
                                    <TrendingUp className="w-4 h-4 text-[var(--accent)]" />
                                </div>
                                <div className="w-full h-px bg-white/5 my-2" />
                                {[Clock, Zap, CheckCircle2].map((Icon, i) => (
                                    <div key={i} className={`w-8 h-8 rounded-lg border flex items-center justify-center ${i === 0 ? 'bg-white/5 border-white/10' : 'border-transparent opacity-40'}`}>
                                        <Icon className="w-4 h-4 text-white/40" />
                                    </div>
                                ))}
                            </div>

                            {/* Main Dashboard Area */}
                            <div className="flex-1 bg-[#030303] p-6">
                                <div className="grid grid-cols-3 gap-4 mb-6">
                                    {/* Stat Cards */}
                                    <StatCard label="Hours Saved" value="127" suffix="/mo" trend="+23%" />
                                    <StatCard label="Cost Reduction" value="€4,200" suffix="/mo" trend="+18%" accent />
                                    <StatCard label="Tasks Automated" value="1,847" suffix="" trend="+45%" />
                                </div>

                                {/* Chart Area */}
                                <div className="h-32 rounded-xl bg-[#0A0A0A] border border-white/5 p-4 relative overflow-hidden">
                                    <div className="text-[10px] uppercase tracking-wider text-white/30 mb-2">ROI Over Time</div>
                                    <div className="flex items-end gap-1 h-16 w-full">
                                        {[30, 45, 40, 55, 60, 70, 65, 80, 85, 95, 90, 100].map((h, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ height: 0 }}
                                                animate={{ height: `${h}%` }}
                                                transition={{ delay: 0.8 + i * 0.05, duration: 0.5 }}
                                                className="flex-1 bg-gradient-to-t from-[var(--accent)]/30 to-[var(--accent)]/80 rounded-t-sm"
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right Panel */}
                            <div className="w-[280px] hidden lg:flex flex-col border-l border-white/5 bg-[#050505] p-4 gap-3">
                                <div className="text-[10px] uppercase tracking-wider text-white/30">Recent Automations</div>
                                {[
                                    { title: "Support email processed", time: "2m ago", status: "success" },
                                    { title: "Meeting scheduled", time: "5m ago", status: "success" },
                                    { title: "Lead qualified", time: "8m ago", status: "success" },
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 1.2 + i * 0.15 }}
                                        className="flex gap-3 items-center p-2 rounded-lg bg-[#0A0A0A] border border-white/5"
                                    >
                                        <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.5)]" />
                                        <div className="flex-1">
                                            <div className="text-[11px] text-white/70">{item.title}</div>
                                            <div className="text-[9px] text-white/30">{item.time}</div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Bottom Fade */}
                        <div className="absolute inset-0 z-50 bg-gradient-to-b from-transparent via-transparent to-[#020202] pointer-events-none" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

function StatCard({ label, value, suffix, trend, accent }: {
    label: string;
    value: string;
    suffix: string;
    trend: string;
    accent?: boolean;
}) {
    return (
        <div className={`rounded-xl p-4 border ${accent ? 'bg-[var(--accent)]/5 border-[var(--accent)]/20' : 'bg-[#0A0A0A] border-white/5'}`}>
            <div className="text-[9px] uppercase tracking-wider text-white/40 mb-1">{label}</div>
            <div className="flex items-baseline gap-1">
                <span className={`text-2xl font-bold ${accent ? 'text-[var(--accent)]' : 'text-white'}`}>{value}</span>
                <span className="text-xs text-white/40">{suffix}</span>
            </div>
            <div className="text-[10px] text-green-400 mt-1">{trend}</div>
        </div>
    );
}
