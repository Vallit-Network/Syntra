"use client";

import { SectionHeader } from "@/components/ui/section";
import { motion } from "framer-motion";
import { Clock, Wrench, Calendar, TrendingUp, CheckCircle2 } from "lucide-react";
import { PremiumBackground } from "@/components/ui/premium-background";

const valueProps = [
    {
        icon: Clock,
        title: "No Hidden Costs",
        description: "What you see is what you pay. No surprise fees, no overage charges.",
        visual: <NoCostsVisual />,
    },
    {
        icon: Wrench,
        title: "Setup Included",
        description: "We build and deploy your AI systems. You don't lift a finger.",
        visual: <SetupVisual />,
    },
    {
        icon: Calendar,
        title: "Cancel Anytime",
        description: "No long-term contracts. Leave whenever you want, no questions asked.",
        visual: <CancelVisual />,
    },
    {
        icon: TrendingUp,
        title: "ROI Guaranteed",
        description: "If you don't save time in 30 days, we'll refund your first month.",
        visual: <RoiVisual />,
    },
];

export function PricingValueProps() {
    return (
        <section className="py-24 md:py-32 relative overflow-hidden">
            <PremiumBackground />
            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <SectionHeader
                    badge="Why Choose Us"
                    title="Built for peace of mind"
                    subtitle="Pricing that's fair, simple, and designed around your success."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {valueProps.map((prop, i) => (
                        <motion.div
                            key={prop.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="group relative overflow-hidden rounded-2xl bg-[#0A0A0A] border border-white/10 hover:border-white/20 transition-all duration-300"
                        >
                            {/* Visual Area */}
                            <div className="h-40 flex items-center justify-center bg-[#080808] border-b border-white/5 overflow-hidden">
                                {prop.visual}
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-lg bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center">
                                        <prop.icon className="w-5 h-5 text-[var(--accent)]" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-white">{prop.title}</h3>
                                </div>
                                <p className="text-[var(--gray-300)] text-sm leading-relaxed pl-13">
                                    {prop.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// Mini visual components
function NoCostsVisual() {
    return (
        <div className="w-full max-w-[200px] bg-[#0A0A0A] rounded-lg border border-white/10 p-3 font-mono text-[10px]">
            <div className="flex justify-between text-white/40 mb-2">
                <span>Invoice #1247</span>
                <span className="text-[var(--accent)]">PAID</span>
            </div>
            <div className="space-y-1 text-white/60">
                <div className="flex justify-between">
                    <span>Growth Plan</span>
                    <span>€79.00</span>
                </div>
                <div className="flex justify-between text-white/30">
                    <span>Hidden fees</span>
                    <span className="line-through">€0.00</span>
                </div>
            </div>
            <div className="border-t border-white/10 mt-2 pt-2 flex justify-between font-medium text-white">
                <span>Total</span>
                <span className="text-[var(--accent)]">€79.00</span>
            </div>
        </div>
    );
}

function SetupVisual() {
    return (
        <div className="flex items-center gap-3">
            {[1, 2, 3].map((step) => (
                <div key={step} className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step <= 2 ? 'bg-[var(--accent)]/20 border border-[var(--accent)]/40' : 'bg-white/5 border border-white/10'}`}>
                        {step <= 2 ? (
                            <CheckCircle2 className="w-5 h-5 text-[var(--accent)]" />
                        ) : (
                            <span className="text-xs text-white/40">{step}</span>
                        )}
                    </div>
                    <span className="text-[9px] text-white/40 mt-1">
                        {step === 1 ? 'Onboard' : step === 2 ? 'Build' : 'Launch'}
                    </span>
                </div>
            ))}
            <div className="absolute left-[30%] right-[30%] top-[45%] h-px bg-white/10" />
        </div>
    );
}

function CancelVisual() {
    return (
        <div className="w-full max-w-[180px] bg-[#0A0A0A] rounded-lg border border-white/10 p-3">
            <div className="text-[10px] text-white/40 mb-2">Subscription Status</div>
            <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.5)]" />
                <span className="text-xs text-white">Active • Monthly</span>
            </div>
            <div className="flex gap-2">
                <button className="flex-1 text-[10px] py-1.5 rounded bg-white/5 border border-white/10 text-white/60">
                    Pause
                </button>
                <button className="flex-1 text-[10px] py-1.5 rounded bg-white/5 border border-white/10 text-white/60">
                    Cancel
                </button>
            </div>
            <div className="text-[8px] text-white/30 mt-2 text-center">No cancellation fees</div>
        </div>
    );
}

function RoiVisual() {
    return (
        <div className="flex items-end gap-1 h-20">
            {[20, 35, 30, 45, 55, 60, 75, 85, 95].map((h, i) => (
                <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                    viewport={{ once: true }}
                    className="w-4 bg-gradient-to-t from-[var(--accent)]/30 to-[var(--accent)]/80 rounded-t-sm"
                />
            ))}
            <div className="ml-2 flex flex-col justify-end">
                <span className="text-xs text-[var(--accent)] font-medium">+127%</span>
                <span className="text-[9px] text-white/40">30 days</span>
            </div>
        </div>
    );
}
