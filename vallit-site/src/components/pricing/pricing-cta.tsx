"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { MouseEvent, useRef } from "react";
import { ButtonLink } from "@/components/ui/button";
import { Rocket, ArrowRight, Check } from "lucide-react";

const benefits = [
    "30-day ROI guarantee",
    "No hidden fees",
    "Cancel monthly plan anytime",
];

export function PricingCTA() {
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0.5);
    const mouseY = useMotionValue(0.5);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            mouseX.set((e.clientX - rect.left) / rect.width);
            mouseY.set((e.clientY - rect.top) / rect.height);
        }
    };

    const springConfig = { damping: 30, stiffness: 200 };
    const spotlightX = useSpring(useTransform(mouseX, [0, 1], [0, 100]), springConfig);
    const spotlightY = useSpring(useTransform(mouseY, [0, 1], [0, 100]), springConfig);

    return (
        <section
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative py-32 md:py-40 overflow-hidden bg-[#020202]"
        >
            {/* Hexagonal Grid Background */}
            <div className="absolute inset-0 pointer-events-none">
                <HexGrid />
            </div>

            {/* Mouse-following Spotlight */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: `radial-gradient(600px circle at ${spotlightX.get()}% ${spotlightY.get()}%, rgba(34,197,94,0.06), transparent 50%)`,
                }}
            />

            {/* Animated Beam Lines */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <BeamLines />
            </div>

            {/* Content */}
            <div className="container relative z-10 mx-auto px-6 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    {/* Icon Badge */}
                    <motion.div
                        className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--accent)]/20 to-[var(--accent)]/5 border border-[var(--accent)]/20 mb-8"
                        animate={{
                            boxShadow: [
                                "0 0 20px rgba(34,197,94,0.2)",
                                "0 0 40px rgba(34,197,94,0.4)",
                                "0 0 20px rgba(34,197,94,0.2)",
                            ],
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                    >
                        <Rocket className="w-7 h-7 text-[var(--accent)]" />
                    </motion.div>

                    {/* Headline */}
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
                        <span className="text-white">Start </span>
                        <span className="relative">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-emerald-300">
                                partnerning
                            </span>
                            <motion.span
                                className="absolute -bottom-2 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent"
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                                viewport={{ once: true }}
                            />
                        </span>
                        <br />
                        <span className="text-white">with Vallit.</span>
                    </h2>

                    <p className="text-lg md:text-xl text-[var(--gray-300)] max-w-xl mx-auto mb-10 leading-relaxed">
                        Stop trying to figure out AI alone.
                        <br className="hidden sm:block" />
                        Let us build and manage the engine for you.
                    </p>

                    {/* Benefits Pills */}
                    <div className="flex flex-wrap justify-center gap-3 mb-10">
                        {benefits.map((benefit, i) => (
                            <motion.div
                                key={benefit}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                                viewport={{ once: true }}
                                className="flex items-center gap-2 px-4 py-2 bg-white/[0.03] border border-white/10 rounded-full text-sm text-[var(--gray-200)]"
                            >
                                <Check className="w-3.5 h-3.5 text-[var(--accent)]" />
                                {benefit}
                            </motion.div>
                        ))}
                    </div>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                        viewport={{ once: true }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <ButtonLink
                            href="#contact"
                            size="lg"
                            className="group shadow-[0_0_50px_-12px_var(--accent)] hover:shadow-[0_0_70px_-12px_var(--accent)] transition-all duration-500 px-10 py-6 text-lg"
                        >
                            Book Free Consultation
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </ButtonLink>
                        <ButtonLink
                            href="#pricing"
                            variant="ghost"
                            size="lg"
                            className="text-[var(--gray-300)] hover:text-white px-8 py-6 text-lg"
                        >
                            View Packages
                        </ButtonLink>
                    </motion.div>
                </motion.div>
            </div>

            {/* Bottom Corners Accent */}
            <div className="absolute bottom-0 left-0 w-64 h-64 pointer-events-none">
                <div className="absolute bottom-0 left-0 w-32 h-[1px] bg-gradient-to-r from-[var(--accent)]/50 to-transparent" />
                <div className="absolute bottom-0 left-0 w-[1px] h-32 bg-gradient-to-t from-[var(--accent)]/50 to-transparent" />
            </div>
            <div className="absolute bottom-0 right-0 w-64 h-64 pointer-events-none">
                <div className="absolute bottom-0 right-0 w-32 h-[1px] bg-gradient-to-l from-[var(--accent)]/50 to-transparent" />
                <div className="absolute bottom-0 right-0 w-[1px] h-32 bg-gradient-to-t from-[var(--accent)]/50 to-transparent" />
            </div>
        </section>
    );
}

function HexGrid() {
    const hexSize = 50;

    return (
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" preserveAspectRatio="xMidYMid slice">
            <defs>
                <pattern
                    id="hex-pattern"
                    width={hexSize * 1.5}
                    height={hexSize * Math.sqrt(3)}
                    patternUnits="userSpaceOnUse"
                >
                    <polygon
                        points={`${hexSize / 2},0 ${hexSize * 1.5},0 ${hexSize * 2},${hexSize * Math.sqrt(3) / 2} ${hexSize * 1.5},${hexSize * Math.sqrt(3)} ${hexSize / 2},${hexSize * Math.sqrt(3)} 0,${hexSize * Math.sqrt(3) / 2}`}
                        fill="none"
                        stroke="white"
                        strokeWidth="0.5"
                    />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hex-pattern)" />
        </svg>
    );
}

function BeamLines() {
    return (
        <>
            {[...Array(5)].map((_, i) => {
                const startX = 10 + i * 20;
                const delay = i * 0.5;

                return (
                    <motion.div
                        key={i}
                        className="absolute h-[200px] w-[1px] bg-gradient-to-b from-transparent via-[var(--accent)]/40 to-transparent"
                        style={{
                            left: `${startX}%`,
                            top: "-100px",
                        }}
                        initial={{ y: -200, opacity: 0 }}
                        animate={{
                            y: ["-100%", "200%"],
                            opacity: [0, 1, 1, 0],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: delay,
                            ease: "linear",
                        }}
                    />
                );
            })}
        </>
    );
}
