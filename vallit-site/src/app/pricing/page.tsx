import { Metadata } from "next";
import { PricingHero } from "@/components/pricing/pricing-hero";
import { HybridPricing } from "@/components/pricing/hybrid-pricing";
import { ValueBreakdown } from "@/components/pricing/value-breakdown";
import { TrustSection } from "@/components/pricing/trust-section";
import { PricingFaq } from "@/components/pricing/pricing-faq";
import { PricingCTA } from "@/components/pricing/pricing-cta";
import { Section, SectionHeader } from "@/components/ui/section";
import { ContactForm } from "@/components/pricing/contact-form";

export const metadata: Metadata = {
    title: "Pricing | Vallit - Managed AI Automation Partnerships",
    description:
        "Transparent agency pricing. One-time build from €2.5k, monthly growth engine from €299. We build, manage, and optimize your AI infrastructure.",
};

export default function PricingPage() {
    return (
        <>
            {/* 1. Partnership Hero */}
            <PricingHero />

            {/* 2. Hybrid Packages (Launch / Scale / Enterprise) */}
            <HybridPricing />

            {/* 3. Why Monthly? (Build vs Run) */}
            <ValueBreakdown />

            {/* 4. Social Proof */}
            <TrustSection />

            {/* 5. FAQ */}
            <PricingFaq />

            {/* 6. Contact Form */}
            <Section id="contact">
                <div className="max-w-2xl mx-auto">
                    <SectionHeader
                        badge="Start Your Project"
                        title="Let's build something great"
                        subtitle="Tell us about your business goals. We'll design a custom automation roadmap for free."
                    />
                    <div className="bg-[#0A0A0A] rounded-2xl border border-white/10 p-8 md:p-10 shadow-2xl">
                        <ContactForm />
                    </div>
                </div>
            </Section>

            {/* 7. Unique Final CTA */}
            <PricingCTA />
        </>
    );
}
