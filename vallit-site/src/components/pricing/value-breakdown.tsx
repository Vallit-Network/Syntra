"use client";

import { motion } from "framer-motion";
import { Hammer, RefreshCw } from "lucide-react";

export function ValueBreakdown() {
    return (
        <section className="py-24 relative">
            <div className="container mx-auto px-6 max-w-5xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Where your money goes</h2>
                    <p className="text-[var(--gray-300)] text-lg max-w-2xl mx-auto">
                        We believe in transparency. Here is exactly what you pay for in the Build phase versus the Monthly retainer.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* The Build Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-[#0A0A0A] rounded-3xl border border-white/10 p-8 md:p-10 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-32 bg-blue-500/5 rounded-full blur-[80px]" />

                        <div className="flex items-center gap-4 mb-8 relative z-10">
                            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                                <Hammer className="w-6 h-6 text-blue-400" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white">The Build</h3>
                                <p className="text-sm text-blue-400 font-medium">One-time Investment</p>
                            </div>
                        </div>

                        <ul className="space-y-4 relative z-10">
                            <ListItem title="Custom Development" text="Tailoring the solution to your specific business infrastructure." />
                            <ListItem title="Integration Setup" text="Connecting your CRM, Database, and internal tools." />
                            <ListItem title="AI Training" text="Preparing the knowledge base and fine-tuning the model." />
                            <ListItem title="Design & UI" text="Building a polished, branded interface for your users." />
                        </ul>
                    </motion.div>

                    {/* The Engine Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-[#0A0A0A] rounded-3xl border border-[var(--accent)]/20 p-8 md:p-10 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-32 bg-[var(--accent)]/5 rounded-full blur-[80px]" />

                        <div className="flex items-center gap-4 mb-8 relative z-10">
                            <div className="w-12 h-12 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center border border-[var(--accent)]/20">
                                <RefreshCw className="w-6 h-6 text-[var(--accent)]" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white">The Engine</h3>
                                <p className="text-sm text-[var(--accent)] font-medium">Monthly Growth</p>
                            </div>
                        </div>

                        <ul className="space-y-4 relative z-10">
                            <ListItem title="Deep Data Analysis" text="We analyze conversation logs to find user pain points." highlight />
                            <ListItem title="Proactive Improvements" text="We fix bot gaps before your customers notice them." highlight />
                            <ListItem title="Server Hosting" text="High-performance, secure hosting for your AI infrastructure." />
                            <ListItem title="Maintenance" text="Regular updates, security patches, and API management." />
                        </ul>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function ListItem({ title, text, highlight }: { title: string, text: string, highlight?: boolean }) {
    return (
        <li className="flex gap-4">
            <div className={`w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0 ${highlight ? 'bg-[var(--accent)]' : 'bg-[var(--gray-500)]'}`} />
            <div>
                <strong className={`block text-md ${highlight ? 'text-white' : 'text-[var(--gray-200)]'}`}>{title}</strong>
                <p className="text-sm text-[var(--gray-400)] leading-relaxed">{text}</p>
            </div>
        </li>
    );
}
