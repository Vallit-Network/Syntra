"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { SectionHeader } from "@/components/ui/section";

const faqs = [
    {
        question: "What does 'managed setup' include?",
        answer: "We handle everything from start to finish. Our team builds your AI systems, configures integrations with your existing tools, trains the AI on your knowledge base, and deploys everything for you. You don't need to learn any platform or configure anything yourself—just tell us what you need.",
    },
    {
        question: "How long does setup take?",
        answer: "Starter plans are typically live within 7 days. Growth plans include accelerated 3-day setup with dedicated onboarding. Enterprise customers receive white-glove support with timelines customized to their complexity.",
    },
    {
        question: "What counts as a conversation?",
        answer: "A conversation is a single interaction session—from when a customer starts chatting to when they're done. If someone sends 20 messages in one session, that's still just one conversation. We don't nickel-and-dime on message counts.",
    },
    {
        question: "Can I change plans later?",
        answer: "Absolutely. Upgrade or downgrade anytime. If you upgrade mid-cycle, you'll be prorated. If you downgrade, the change takes effect at your next billing date. No penalties, no questions asked.",
    },
    {
        question: "Is there a long-term contract?",
        answer: "No. All plans are month-to-month. Cancel anytime without fees. We also offer annual billing with a 20% discount if you prefer.",
    },
    {
        question: "What happens if I exceed my conversation limit?",
        answer: "We'll notify you when you're approaching your limit. If you go over, we won't cut off your service—we'll just reach out to discuss upgrading to a plan that fits your usage. No surprise charges.",
    },
    {
        question: "Do you offer refunds?",
        answer: "We offer a 30-day ROI guarantee. If you don't see measurable time savings in your first month, we'll refund your payment in full. We're confident in what we deliver.",
    },
    {
        question: "Is my data secure?",
        answer: "Yes. We follow security-first practices with encrypted data at rest and in transit. EU hosting is available for all plans. Enterprise customers can also opt for on-premise deployment for maximum control.",
    },
];

export function PricingFaq() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-24 md:py-32 bg-[rgba(255,255,255,0.01)]">
            <div className="container mx-auto px-6 max-w-3xl">
                <SectionHeader
                    badge="FAQ"
                    title="Common questions"
                    subtitle="Everything you need to know about our pricing and plans."
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

                {/* Additional Help */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    viewport={{ once: true }}
                    className="text-center mt-12 p-6 bg-[#0A0A0A] rounded-xl border border-white/10"
                >
                    <p className="text-[var(--gray-300)] mb-2">
                        Still have questions?
                    </p>
                    <a
                        href="#contact"
                        className="text-[var(--accent)] font-medium hover:underline"
                    >
                        Get in touch with our team →
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
