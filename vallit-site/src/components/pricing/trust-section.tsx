"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/section";
import { Star } from "lucide-react";

const stats = [
    { value: "500+", label: "Businesses served" },
    { value: "98%", label: "Client retention" },
    { value: "2M+", label: "Conversations handled" },
    { value: "127hrs", label: "Avg. time saved/mo" },
];

const testimonial = {
    quote: "The monthly analysis reports alone are worth the fee. They found a bottleneck in our support process we didn't even know existed.",
    author: "Sarah Chen",
    role: "Head of Operations",
    company: "TechFlow",
};

export function TrustSection() {
    return (
        <section className="py-24 md:py-32">
            <div className="container mx-auto px-6 max-w-6xl">
                <SectionHeader
                    badge="Trusted By"
                    title="Teams that choose results"
                    subtitle="Join hundreds of businesses growing with our automation ecosystem."
                />

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="text-center p-6 bg-[#0A0A0A] rounded-xl border border-white/10"
                        >
                            <div className="text-3xl md:text-4xl font-bold text-[var(--accent)] mb-2">
                                {stat.value}
                            </div>
                            <div className="text-sm text-[var(--gray-400)]">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Testimonial */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto"
                >
                    <div className="relative bg-[#0A0A0A] rounded-2xl border border-white/10 p-8 md:p-12">
                        {/* Quote Icon */}
                        <div className="absolute -top-4 left-8 w-8 h-8 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center">
                            <svg
                                className="w-4 h-4 text-[var(--accent)]"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                            </svg>
                        </div>

                        {/* Stars */}
                        <div className="flex gap-1 mb-6">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                            ))}
                        </div>

                        {/* Quote */}
                        <blockquote className="text-lg md:text-xl text-white leading-relaxed mb-8">
                            &ldquo;{testimonial.quote}&rdquo;
                        </blockquote>

                        {/* Author */}
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--accent)]/30 to-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center text-[var(--accent)] font-semibold">
                                {testimonial.author.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                                <div className="font-medium text-white">{testimonial.author}</div>
                                <div className="text-sm text-[var(--gray-400)]">
                                    {testimonial.role}, {testimonial.company}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
