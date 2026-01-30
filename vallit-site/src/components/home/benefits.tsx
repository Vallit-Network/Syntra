"use client";

import { SectionHeader } from "@/components/ui/section";
import { motion } from "framer-motion";
import { Bot, Youtube, Code2, Globe, Clock, Workflow, Zap, BarChart3 } from "lucide-react";
import React from "react";

import { PremiumBackground } from "@/components/ui/premium-background";

export function Benefits() {
    return (
        <section className="py-24 md:py-32 relative overflow-hidden">
            <PremiumBackground />
            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <SectionHeader
                    badge="What We Do"
                    title="Digital Solutions. Redefined."
                    subtitle="We don't just follow trends. We build the systems that define them. Personalized, intelligent, and built for your specific needs."
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[420px]">
                    {/* Row 1: AI Automation (2) + Discord (1) */}
                    <BentoCard
                        className="md:col-span-2"
                        title="AI Automation"
                        description="Custom enterprise neural networks. We automate your business logic, from customer support to complex internal workflows."
                        icon={Workflow}
                        visual={<WorkflowUI />}
                    />
                    <BentoCard
                        title="Discord Intelligence"
                        description="Deeply integrated community bots that understand context, manage roles, and connect to your stack."
                        icon={Bot}
                        visual={<DiscordUI />}
                    />

                    {/* Row 2: Data Analysis (2) + Website (1) */}
                    <BentoCard
                        className="md:col-span-2"
                        title="Deep Data Analysis"
                        description="Unlock hidden value in your data. We use AI to analyze patterns, optimize workflows, and predict trends."
                        icon={BarChart3}
                        visual={<DataAnalysisUI />}
                    />
                    <BentoCard
                        title="Immersive Websites"
                        description="High-performance, Next.js web experiences designed to convert. Smooth animations and premium aesthetics."
                        icon={Globe}
                        visual={<WebsiteUI />}
                    />

                    {/* Row 3: Time Tracking (3) */}
                    <BentoCard
                        className="md:col-span-3"
                        title="Cognitive Time Tracking"
                        description="AI that knows what you're working on. Automatically categorize time, generate invoices, and get productivity insights without the manual hassle."
                        icon={Clock}
                        visual={<TimeTrackingUI />}
                    />
                </div>
            </div>
        </section>
    );
}

function BentoCard({
    className,
    title,
    description,
    icon: Icon,
    visual,
}: {
    className?: string;
    title: string;
    description: string;
    icon: any;
    visual: React.ReactNode;
}) {
    return (
        <div
            className={`group relative overflow-hidden rounded-3xl bg-[#0A0A0A] border border-white/10 hover:border-white/20 transition-all duration-300 shadow-2xl ${className}`}
        >
            {/* Visual Area */}
            <div className="absolute inset-x-0 top-0 h-[60%] flex items-center justify-center overflow-hidden bg-[#0A0A0A]">
                {/* Inner lighting effect - simplified */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
                <div className="relative w-full h-full p-8 md:p-10 flex items-center justify-center">
                    {visual}
                </div>
            </div>

            {/* Content */}
            <div className="absolute inset-x-0 bottom-0 z-20 p-8 flex flex-col justify-end bg-[#0A0A0A] border-t border-white/5 h-[40%]">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                        <Icon className="w-4 h-4 text-[#888] group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-lg font-medium text-white tracking-tight">{title}</h3>
                </div>
                <p className="text-[15px] text-[#666] group-hover:text-[#888] transition-colors leading-relaxed pl-11 max-w-lg">
                    {description}
                </p>
            </div>
        </div>
    );
}

// --- PREMIUM VISUALS ---

function DataAnalysisUI() {
    return (
        <div className="w-full max-w-[400px] bg-[#0A0A0A] rounded-xl border border-white/[0.08] shadow-2xl overflow-hidden relative font-sans transform group-hover:scale-105 transition-transform duration-500 flex flex-col p-4 gap-4">
            {/* Header */}
            <div className="flex justify-between items-center pb-2 border-b border-white/5">
                <div className="text-[10px] text-gray-400 font-mono">DATA_EXPLORER</div>
                <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-[var(--accent)]" />
                    <div className="text-[10px] text-[var(--accent)] font-bold">Optimizing</div>
                </div>
            </div>

            <div className="flex-1 flex gap-4 items-end h-[100px] px-2">
                {[35, 55, 40, 70, 60, 85, 95].map((h, i) => (
                    <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${h}%` }}
                        transition={{ duration: 0.8, delay: i * 0.1 }}
                        className="flex-1 bg-gradient-to-t from-[var(--accent)]/10 to-[var(--accent)]/40 border-t border-[var(--accent)]/50 rounded-t-sm relative group"
                    >
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 text-[9px] text-white transition-opacity">
                            {h}%
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Analysis Text */}
            <div className="bg-white/[0.03] rounded-lg p-3 border border-white/5">
                <div className="flex gap-2 mb-1">
                    <Zap className="w-3 h-3 text-[var(--accent)]" />
                    <span className="text-[10px] font-bold text-white">Insight Detected</span>
                </div>
                <p className="text-[10px] text-gray-400 leading-relaxed">
                    Workflow efficiency increased by <span className="text-white font-mono">24%</span> after implementing automated routing.
                </p>
            </div>
        </div>
    )
}

// --- PREMIUM VISUALS ---

function DiscordUI() {
    return (
        <div className="w-full max-w-[280px] bg-[#313338] rounded-xl border border-white/[0.08] shadow-2xl overflow-hidden relative font-sans transform group-hover:scale-105 transition-transform duration-500">
            {/* Header */}
            <div className="h-9 border-b border-[#1E1F22] flex items-center px-4 bg-[#2B2D31]">
                <div className="text-[10px] text-gray-400 font-bold"># general</div>
            </div>

            {/* Chat Area */}
            <div className="p-4 space-y-4 text-[12px] h-[160px] relative">
                {/* Message 1 */}
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="flex gap-3"
                >
                    <div className="w-8 h-8 rounded-full bg-white/10 flex-shrink-0" />
                    <div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-white font-medium text-[11px]">User</span>
                            <span className="text-[9px] text-gray-500">Today at 2:00 PM</span>
                        </div>
                        <div className="text-gray-300 mt-0.5">
                            Check project status
                        </div>
                    </div>
                </motion.div>

                {/* Message 2 (Bot) */}
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex gap-3"
                >
                    <div className="w-8 h-8 rounded-full bg-[#5865F2] flex items-center justify-center flex-shrink-0 text-[10px] text-white font-bold">
                        <Bot className="w-4 h-4" />
                    </div>
                    <div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-white font-medium text-[11px] flex gap-1 items-center">
                                Vallit Bot <span className="bg-[#5865F2] text-[8px] px-1 rounded text-white">BOT</span>
                            </span>
                            <span className="text-[9px] text-gray-500">Today at 2:00 PM</span>
                        </div>
                        <div className="bg-[#2B2D31] border-l-4 border-[#5865F2] p-2 mt-1 rounded text-gray-300 text-[10px]">
                            <p className="font-bold text-white mb-1">Project Delta Status</p>
                            <div className="flex gap-2 mb-1">
                                <span className="text-green-400">● On Track</span>
                                <span className="text-gray-400">Due in 2 days</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

function WebsiteUI() {
    return (
        <div className="w-full max-w-[280px] bg-[#0A0A0A] rounded-xl border border-white/[0.08] shadow-2xl overflow-hidden relative font-sans transform group-hover:scale-105 transition-transform duration-500">
            {/* Browser Header */}
            <div className="h-8 border-b border-white/[0.06] flex items-center px-3 gap-2 bg-white/[0.02]">
                <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-[#FF5F56]" />
                    <div className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
                    <div className="w-2 h-2 rounded-full bg-[#27C93F]" />
                </div>
                <div className="flex-1 bg-white/[0.05] h-4 rounded text-[8px] flex items-center px-2 text-gray-500 font-mono">
                    vallit.com
                </div>
            </div>

            {/* Content Mockup */}
            <div className="p-4 relative h-[160px] flex flex-col items-center justify-center space-y-3">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-24 h-6 bg-[var(--accent)]/20 rounded-lg flex items-center justify-center border border-[var(--accent)]/30"
                >
                    <div className="w-16 h-2 bg-[var(--accent)] rounded-full opacity-60" />
                </motion.div>
                <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-1.5 w-full max-w-[180px]"
                >
                    <div className="h-2 w-full bg-white/10 rounded-full" />
                    <div className="h-2 w-[80%] bg-white/10 rounded-full mx-auto" />
                </motion.div>
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex gap-2 mt-2"
                >
                    <div className="w-16 h-5 bg-white/5 rounded border border-white/10" />
                    <div className="w-16 h-5 bg-[var(--accent)] rounded" />
                </motion.div>
            </div>
        </div>
    )
}

function TimeTrackingUI() {
    return (
        <div className="w-full max-w-[320px] bg-[#0A0A0A] rounded-xl border border-white/[0.08] shadow-2xl relative overflow-hidden font-sans transform group-hover:scale-105 transition-transform duration-500">
            {/* Header */}
            <div className="px-4 py-3 border-b border-white/[0.06] flex justify-between items-center bg-white/[0.01]">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] font-medium text-white tracking-wide">TRACKING ACTIVE</span>
                </div>
                <span className="text-[10px] font-mono text-[var(--accent)]">02:14:32</span>
            </div>

            {/* List */}
            <div className="p-2 space-y-1">
                {[
                    { project: "Website Redesign", client: "Acme Corp", time: "1h 30m", active: true },
                    { project: "Bot Logic", client: "Startup Inc", time: "45m", active: false },
                    { project: "Client Meeting", client: "Global Ltd", time: "1h 00m", active: false },
                ].map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={`p-2 rounded-lg flex items-center justify-between ${item.active ? 'bg-white/[0.03] border border-white/[0.05]' : 'opacity-50'}`}
                    >
                        <div>
                            <div className="text-[10px] text-white font-medium">{item.project}</div>
                            <div className="text-[9px] text-gray-500">{item.client}</div>
                        </div>
                        <div className="text-[10px] font-mono text-gray-400">{item.time}</div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

function WorkflowUI() {
    return (
        <div className="w-full h-full flex items-center justify-center relative">
            {/* SVG Graph */}
            <svg width="300" height="150" viewBox="0 0 300 150">
                {/* Definitions */}
                <defs>
                    <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgba(255,255,255,0.05)" />
                        <stop offset="50%" stopColor="rgba(255,255,255,0.2)" />
                        <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
                    </linearGradient>
                </defs>

                {/* Connection Paths */}
                <path d="M50 75 L110 75" stroke="url(#lineGrad)" strokeWidth="1" />
                <path d="M150 75 L210 50" stroke="url(#lineGrad)" strokeWidth="1" />
                <path d="M150 75 L210 100" stroke="url(#lineGrad)" strokeWidth="1" />

                {/* Nodes */}
                {/* Trigger */}
                <g transform="translate(30, 55)">
                    <rect width="40" height="40" rx="8" fill="#0A0A0A" stroke="rgba(255,255,255,0.1)" />
                    <path d="M12 20 L28 20" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
                    <path d="M20 12 L20 28" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
                </g>

                {/* Process */}
                <g transform="translate(110, 55)">
                    <rect width="40" height="40" rx="8" fill="#0A0A0A" stroke="rgba(0,212,170,0.5)" />
                    <Zap x="10" y="10" width="20" height="20" className="text-[var(--accent)]" />
                </g>

                {/* End 1 */}
                <g transform="translate(210, 30)">
                    <rect width="40" height="40" rx="8" fill="#0A0A0A" stroke="rgba(255,255,255,0.1)" />
                </g>

                {/* End 2 */}
                <g transform="translate(210, 80)">
                    <rect width="40" height="40" rx="8" fill="#0A0A0A" stroke="rgba(255,255,255,0.1)" />
                </g>

                {/* Data Packet Animation */}
                <circle r="3" fill="var(--accent)">
                    <animateMotion
                        dur="2s"
                        repeatCount="indefinite"
                        path="M50 75 L110 75"
                    />
                </circle>
            </svg>
        </div>
    )
}
