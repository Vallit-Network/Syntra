"use client";

import { motion } from "framer-motion";
import { Check, Minus } from "lucide-react";
import { SectionHeader } from "@/components/ui/section";

const features = [
    {
        category: "Core Features",
        items: [
            { name: "AI Deployments", starter: "1", growth: "3", enterprise: "Unlimited" },
            { name: "Conversations/month", starter: "250", growth: "2,000", enterprise: "Unlimited" },
            { name: "Knowledge Base", starter: true, growth: true, enterprise: true },
            { name: "Multi-language Support", starter: false, growth: true, enterprise: true },
            { name: "Custom Training", starter: false, growth: false, enterprise: true },
        ],
    },
    {
        category: "Integrations",
        items: [
            { name: "Slack, Discord", starter: true, growth: true, enterprise: true },
            { name: "Google Workspace", starter: true, growth: true, enterprise: true },
            { name: "CRM (HubSpot, Salesforce)", starter: false, growth: true, enterprise: true },
            { name: "Custom API Access", starter: false, growth: false, enterprise: true },
            { name: "Webhooks", starter: false, growth: true, enterprise: true },
        ],
    },
    {
        category: "Support & Security",
        items: [
            { name: "Email Support", starter: true, growth: true, enterprise: true },
            { name: "Priority Chat Support", starter: false, growth: true, enterprise: true },
            { name: "Dedicated Account Manager", starter: false, growth: false, enterprise: true },
            { name: "SLA Guarantee", starter: false, growth: false, enterprise: true },
            { name: "EU Data Hosting", starter: true, growth: true, enterprise: true },
            { name: "On-Premise Option", starter: false, growth: false, enterprise: true },
        ],
    },
];

export function FeatureComparison() {
    return (
        <section className="py-24 md:py-32">
            <div className="container mx-auto px-6 max-w-6xl">
                <SectionHeader
                    badge="Compare Plans"
                    title="Everything you need"
                    subtitle="See what's included in each plan at a glance."
                />

                {/* Desktop Table */}
                <div className="hidden lg:block">
                    <div className="bg-[#0A0A0A] rounded-2xl border border-white/10 overflow-hidden">
                        {/* Header */}
                        <div className="grid grid-cols-4 gap-4 p-6 border-b border-white/10 bg-[#080808]">
                            <div className="text-sm font-medium text-[var(--gray-400)]">Feature</div>
                            <div className="text-center text-sm font-medium text-white">Starter</div>
                            <div className="text-center text-sm font-medium text-[var(--accent)]">Growth</div>
                            <div className="text-center text-sm font-medium text-white">Enterprise</div>
                        </div>

                        {/* Feature Groups */}
                        {features.map((group, gi) => (
                            <div key={group.category}>
                                {/* Category Header */}
                                <div className="px-6 py-3 bg-white/[0.02] border-b border-white/5">
                                    <span className="text-xs font-medium uppercase tracking-wider text-[var(--gray-400)]">
                                        {group.category}
                                    </span>
                                </div>

                                {/* Items */}
                                {group.items.map((item, i) => (
                                    <motion.div
                                        key={item.name}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: gi * 0.1 + i * 0.02, duration: 0.3 }}
                                        viewport={{ once: true }}
                                        className="grid grid-cols-4 gap-4 px-6 py-4 border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                                    >
                                        <div className="text-sm text-[var(--gray-200)]">{item.name}</div>
                                        <FeatureCell value={item.starter} />
                                        <FeatureCell value={item.growth} highlight />
                                        <FeatureCell value={item.enterprise} />
                                    </motion.div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mobile Cards */}
                <div className="lg:hidden space-y-6">
                    {features.map((group) => (
                        <div key={group.category} className="bg-[#0A0A0A] rounded-xl border border-white/10 overflow-hidden">
                            <div className="px-4 py-3 bg-[#080808] border-b border-white/5">
                                <span className="text-xs font-medium uppercase tracking-wider text-[var(--gray-400)]">
                                    {group.category}
                                </span>
                            </div>
                            <div className="divide-y divide-white/5">
                                {group.items.map((item) => (
                                    <div key={item.name} className="p-4">
                                        <div className="text-sm text-white mb-3">{item.name}</div>
                                        <div className="grid grid-cols-3 gap-2 text-xs">
                                            <div className="text-center">
                                                <div className="text-[var(--gray-500)] mb-1">Starter</div>
                                                <MobileFeatureCell value={item.starter} />
                                            </div>
                                            <div className="text-center">
                                                <div className="text-[var(--accent)] mb-1">Growth</div>
                                                <MobileFeatureCell value={item.growth} highlight />
                                            </div>
                                            <div className="text-center">
                                                <div className="text-[var(--gray-500)] mb-1">Enterprise</div>
                                                <MobileFeatureCell value={item.enterprise} />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function FeatureCell({ value, highlight }: { value: boolean | string; highlight?: boolean }) {
    if (typeof value === "boolean") {
        return (
            <div className="flex justify-center">
                {value ? (
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${highlight ? 'bg-[var(--accent)]/20' : 'bg-white/10'}`}>
                        <Check className={`w-3 h-3 ${highlight ? 'text-[var(--accent)]' : 'text-white/60'}`} />
                    </div>
                ) : (
                    <Minus className="w-4 h-4 text-white/20" />
                )}
            </div>
        );
    }
    return (
        <div className={`text-center text-sm ${highlight ? 'text-[var(--accent)] font-medium' : 'text-[var(--gray-200)]'}`}>
            {value}
        </div>
    );
}

function MobileFeatureCell({ value, highlight }: { value: boolean | string; highlight?: boolean }) {
    if (typeof value === "boolean") {
        return value ? (
            <Check className={`w-4 h-4 mx-auto ${highlight ? 'text-[var(--accent)]' : 'text-white/60'}`} />
        ) : (
            <Minus className="w-4 h-4 mx-auto text-white/20" />
        );
    }
    return (
        <span className={highlight ? 'text-[var(--accent)] font-medium' : 'text-white/60'}>
            {value}
        </span>
    );
}
