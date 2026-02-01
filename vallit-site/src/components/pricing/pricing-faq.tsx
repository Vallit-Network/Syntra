"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { SectionHeader } from "@/components/ui/section";

const faqs = [
    {
        question: "Why is there a monthly fee?",
        answer: "AI isn't 'set and forget'. The monthly fee covers the server costs, the AI model usage, but most importantly: our proactive work. We analyze your chat logs, find where the AI struggled, and refine the knowledge base to make it smarter every single month. It's like having a dedicated AI employee.",
    },
    {
        question: "What does 'Starting at' mean for the build?",
        answer: "Every business is unique. While a standard setup fits many, you might need complex CRM integrations, custom workflows, or specific security protocols. We give you a transparent quote after our initial free consultation.",
    },
    {
        question: "What is 'Deep Data Analysis'?",
        answer: "We don't just count messages. We analyze the *content* of conversations to tell you what your customers are actually asking for. This business intelligence helps you improve not just the bot, but your product and service.",
    },
    {
        question: "Can I cancel the monthly partnership?",
        answer: "Yes. We operate on a flexible monthly basis. If you decide to stop, your service ends at the next billing cycle. We believe in earning your business every month.",
    },
    {
        question: "Who owns the code?",
        answer: "You own the data and the content. We license the technology stack to you. If you leave, you can export your data and knowledge base anytime.",
    },
];

export function PricingFaq() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-24 bg-[rgba(255,255,255,0.01)]">
            <div className="container mx-auto px-6 max-w-3xl">
                <SectionHeader
                    badge="FAQ"
                    title="Common Questions"
                    subtitle="Understanding our partnership model."
                />

                <div className="space-y-3">
                    {faqs.map((faq, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05, duration: 0.3 }}
                            viewport={{ once: true }}
                            className="bg-[#0A0A0A] rounded-xl border border-white/10 overflow-hidden"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.02] transition-colors"
                            >
                                <span className="text-white font-medium pr-4">{faq.question}</span>
                                <motion.div
                                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="flex-shrink-0"
                                >
                                    <ChevronDown className="w-5 h-5 text-[var(--gray-400)]" />
                                </motion.div>
                            </button>

                            <AnimatePresence>
                                {openIndex === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-5 pb-5 text-[var(--gray-300)] text-sm leading-relaxed border-t border-white/5 pt-4">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
