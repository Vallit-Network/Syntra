"use client";

import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Sparkles, ArrowDown, Handshake } from "lucide-react";

export function PricingHero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section
            ref={containerRef}
            className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#020202] pt-20"
        >
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[var(--accent)]/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[100px]" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
            </div>

            <div className="container relative z-10 mx-auto px-6 max-w-5xl text-center">
                <motion.div
                    style={{ y, opacity }}
                    initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >


                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8">
                        <span className="block text-white mb-2">We build. You grow.</span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] via-emerald-300 to-teal-400">
                            A true partnership.
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-[var(--gray-300)] leading-relaxed max-w-3xl mx-auto mb-12">
                        Get a dedicated automation team without the headcount.
                        <br />
                        <span className="text-white font-medium">Custom built for your business, maintained for your peace of mind.</span>
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <ButtonLink
                            href="#pricing"
                            size="lg"
                            className="bg-white text-black hover:bg-gray-200 border-none shadow-[0_0_20px_rgba(255,255,255,0.3)] px-8 py-6 text-lg font-semibold"
                        >
                            View Packages
                        </ButtonLink>
                        <ButtonLink
                            href="#contact"
                            variant="secondary"
                            size="lg"
                            className="px-8 py-6 text-lg"
                        >
                            Schedule Consultation
                        </ButtonLink>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
            >
                <span className="text-xs uppercase tracking-wider text-[var(--gray-500)]">
                    Scroll to explore
                </span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    <ArrowDown className="w-4 h-4 text-[var(--gray-500)]" />
                </motion.div>
            </motion.div>
        </section>
    );
}
