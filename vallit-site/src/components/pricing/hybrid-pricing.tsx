"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Check, ArrowRight, Zap, Server, Play, MousePointer2 } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { MouseEvent } from "react";

const packages = [
    {
        name: "Launch",
        subtitle: "The Foundation",
        description: "Perfect for small businesses needing a professional web presence and initial automation.",
        monthlyPrice: "299",
        oneTimePrice: "2,500",
        features: [
            "Modern Website Development",
            "Basic AI Chatbot Integration",
            "Monthly Maintenance & Hosting",
            "Bot Knowledge Updates",
            "Email Support"
        ],
        highlight: false,
        icon: Play,
        // Blue/Cyan glow
        glowColor: "#60A5FA",
        gradient: "from-blue-500/20 to-cyan-500/20",
        accent: "text-blue-400",
        borderAccent: "group-hover:border-blue-500/50"
    },
    {
        name: "Scale",
        subtitle: "The Growth Engine",
        description: "For companies ready to leverage deep data and fully automate complex workflows.",
        monthlyPrice: "899",
        oneTimePrice: "6,000",
        features: [
            "Everything in Launch",
            "Deep Data Analysis & Insights",
            "Custom Automation Workflows",
            "Proactive System Improvements",
            "Priority Support",
            "Dedicated Slack Channel"
        ],
        highlight: true,
        icon: Zap,
        // Green/Emerald glow
        glowColor: "#22c55e",
        gradient: "from-[var(--accent)]/20 to-emerald-500/20",
        accent: "text-[var(--accent)]",
        borderAccent: "group-hover:border-[var(--accent)]/50"
    },
    {
        name: "Enterprise",
        subtitle: "The Ecosystem",
        description: "Full-scale digital transformation with custom logic and dedicated development resources.",
        monthlyPrice: "Custom",
        oneTimePrice: "Custom",
        features: [
            "Full Digital Transformation",
            "Custom Discord/Platform Bots",
            "Dedicated Development Team",
            "Custom SLA & Security",
            "On-Premise Deployment Options",
            "White-Glove Onboarding"
        ],
        highlight: false,
        icon: Server,
        // Purple/Pink glow
        glowColor: "#e879f9",
        gradient: "from-purple-500/20 to-pink-500/20",
        accent: "text-purple-400",
        borderAccent: "group-hover:border-purple-500/50"
    }
];

export function HybridPricing() {
    return (
        <section id="pricing" className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {packages.map((pkg, i) => (
                        <PricingCard key={pkg.name} pkg={pkg} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function PricingCard({ pkg, index }: { pkg: typeof packages[0], index: number }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            onMouseMove={handleMouseMove}
            className={`
                group relative flex flex-col rounded-3xl overflow-hidden border transition-all duration-500
                ${pkg.highlight
                    ? 'border-[var(--accent)]/30 bg-[#0A0A0A] shadow-[0_0_40px_-10px_rgba(34,197,94,0.15)]'
                    : 'border-white/10 bg-[#050505]'
                }
                hover:shadow-2xl hover:scale-[1.01] hover:-translate-y-1
                ${pkg.borderAccent}
            `}
        >
            {/* Spotlight Effect Layer */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                            650px circle at ${mouseX}px ${mouseY}px,
                            ${pkg.glowColor}15,
                            transparent 80%
                        )
                    `,
                }}
            />

            {/* Top Section: Monthly Retainer */}
            <div className="p-8 pb-6 bg-gradient-to-b from-white/[0.03] to-transparent relative overflow-hidden z-10">
                {pkg.highlight && (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-[var(--accent)] text-black text-xs font-bold rounded-full uppercase tracking-wide shadow-[0_0_10px_var(--accent)]">
                        Most Popular
                    </div>
                )}

                <div className={`
                    w-12 h-12 rounded-xl bg-gradient-to-br ${pkg.gradient} flex items-center justify-center mb-6 
                    border border-white/5 group-hover:scale-110 transition-transform duration-500
                `}>
                    <pkg.icon className={`w-6 h-6 ${pkg.accent}`} />
                </div>

                <h3 className="text-2xl font-bold text-white mb-1">{pkg.name}</h3>
                <p className={`text-sm font-medium ${pkg.accent} mb-4`}>{pkg.subtitle}</p>
                <p className="text-[var(--gray-400)] text-sm leading-relaxed mb-8 min-h-[40px]">
                    {pkg.description}
                </p>

                <div className="mb-2">
                    <span className="text-sm text-[var(--gray-500)] uppercase tracking-wider block mb-1">Running Cost</span>
                    <div className="flex items-baseline gap-1">
                        {pkg.monthlyPrice !== "Custom" && <span className="text-lg text-[var(--gray-400)]">€</span>}
                        <span className="text-4xl font-bold text-white tracking-tight">{pkg.monthlyPrice}</span>
                        {pkg.monthlyPrice !== "Custom" && <span className="text-[var(--gray-500)]">/mo</span>}
                    </div>
                </div>
            </div>

            {/* Separator */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-white/20 transition-colors" />

            {/* Bottom Section: One-time Build */}
            <div className="p-8 pt-6 flex-grow flex flex-col bg-white/[0.01] relative z-10">
                <div className="mb-8">
                    <span className="text-xs text-[var(--gray-500)] uppercase tracking-wider block mb-1">One-time Build</span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-sm text-[var(--gray-400)]">Starting at</span>
                        <div className="flex items-baseline gap-1">
                            {pkg.oneTimePrice !== "Custom" && <span className="text-sm text-[var(--gray-400)]">€</span>}
                            <span className={`text-xl font-bold ${pkg.accent}`}>{pkg.oneTimePrice}</span>
                        </div>
                    </div>
                </div>

                <ul className="space-y-4 mb-8 flex-grow">
                    {pkg.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-[var(--gray-300)] group-hover:text-[var(--gray-200)] transition-colors">
                            <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${pkg.highlight ? 'text-[var(--accent)]' : 'text-white/40 group-hover:text-white/60'}`} />
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>

                <ButtonLink
                    href="#contact"
                    variant={pkg.highlight ? "primary" : "secondary"}
                    className="w-full justify-center group/btn"
                >
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </ButtonLink>
            </div>
        </motion.div>
    );
}
