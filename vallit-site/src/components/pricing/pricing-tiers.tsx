"use client";

import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section";

const plans = [
    {
        name: "Starter",
        price: "€29",
        period: "/mo",
        description: "Perfect for small teams getting started with AI automation",
        features: [
            "1 AI system deployment",
            "Up to 250 conversations/mo",
            "Email support",
            "Standard integrations",
            "7-day setup",
        ],
        cta: "Get Started",
        popular: false,
    },
    {
        name: "Growth",
        price: "€79",
        period: "/mo",
        description: "For growing teams ready to scale their operations",
        features: [
            "Up to 3 AI deployments",
            "Up to 2,000 conversations/mo",
            "Priority email + chat support",
            "All integrations included",
            "3-day setup + onboarding",
            "Analytics dashboard",
        ],
        cta: "Start Growing",
        popular: true,
    },
    {
        name: "Enterprise",
        price: "Custom",
        period: "",
        description: "For organizations with advanced requirements",
        features: [
            "Unlimited deployments",
            "Unlimited conversations",
            "Dedicated account manager",
            "Custom integrations & API",
            "SLA guarantee",
            "On-premise options",
            "White-glove support",
        ],
        cta: "Contact Sales",
        popular: false,
    },
];

export function PricingTiers() {
    return (
        <section id="pricing" className="py-24 md:py-32 bg-[rgba(255,255,255,0.01)]">
            <div className="container mx-auto px-6 max-w-6xl">
                <SectionHeader
                    badge="Plans"
                    title="Choose your plan"
                    subtitle="Start small and scale as you grow. All plans include managed setup."
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {plans.map((plan, i) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className={`relative group rounded-2xl transition-all duration-300 ${plan.popular
                                    ? "bg-gradient-to-b from-[var(--accent)]/10 to-[#0A0A0A] border-2 border-[var(--accent)]/30 shadow-[0_0_40px_-10px_var(--accent-glow)]"
                                    : "bg-[#0A0A0A] border border-white/10 hover:border-white/20"
                                }`}
                        >
                            {/* Popular Badge */}
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-[var(--accent)] text-[var(--bg-body)] text-xs font-semibold rounded-full flex items-center gap-1.5 shadow-lg">
                                    <Sparkles className="w-3 h-3" />
                                    Most Popular
                                </div>
                            )}

                            <div className="p-8 h-full flex flex-col">
                                {/* Header */}
                                <div className="mb-6">
                                    <h3 className="text-xl font-semibold text-white mb-2">{plan.name}</h3>
                                    <div className="flex items-baseline gap-1 mb-3">
                                        <span className={`text-4xl font-bold ${plan.popular ? 'text-[var(--accent)]' : 'text-white'}`}>
                                            {plan.price}
                                        </span>
                                        {plan.period && (
                                            <span className="text-[var(--gray-400)]">{plan.period}</span>
                                        )}
                                    </div>
                                    <p className="text-sm text-[var(--gray-400)] leading-relaxed">
                                        {plan.description}
                                    </p>
                                </div>

                                {/* Features */}
                                <ul className="space-y-3 mb-8 flex-grow">
                                    {plan.features.map((feature, j) => (
                                        <motion.li
                                            key={feature}
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.2 + j * 0.05, duration: 0.3 }}
                                            viewport={{ once: true }}
                                            className="flex items-start gap-3"
                                        >
                                            <span className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${plan.popular
                                                    ? "bg-[var(--accent)]/20"
                                                    : "bg-white/5"
                                                }`}>
                                                <Check className={`w-3 h-3 ${plan.popular ? 'text-[var(--accent)]' : 'text-white/60'}`} />
                                            </span>
                                            <span className="text-sm text-[var(--gray-200)]">{feature}</span>
                                        </motion.li>
                                    ))}
                                </ul>

                                {/* CTA */}
                                <ButtonLink
                                    href="#contact"
                                    variant={plan.popular ? "primary" : "secondary"}
                                    className={`w-full justify-center ${plan.popular
                                            ? "shadow-[0_0_20px_-5px_var(--accent-glow)]"
                                            : "bg-white/5 border-white/10 hover:bg-white/10"
                                        }`}
                                >
                                    {plan.cta}
                                </ButtonLink>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom Note */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center text-sm text-[var(--gray-400)] mt-12"
                >
                    All prices in EUR. Annual billing available with 20% discount.{" "}
                    <a href="#contact" className="text-[var(--accent)] hover:underline">
                        Contact us
                    </a>{" "}
                    for custom requirements.
                </motion.p>
            </div>
        </section>
    );
}
