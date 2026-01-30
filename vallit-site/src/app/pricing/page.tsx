import { Metadata } from "next";
import { PricingHero } from "@/components/pricing/pricing-hero";
import { PricingValueProps } from "@/components/pricing/pricing-value-props";
import { PricingTiers } from "@/components/pricing/pricing-tiers";
import { FeatureComparison } from "@/components/pricing/feature-comparison";
import { TrustSection } from "@/components/pricing/trust-section";
import { PricingFaq } from "@/components/pricing/pricing-faq";
import { Section, SectionHeader } from "@/components/ui/section";
import { ContactForm } from "@/components/pricing/contact-form";
import { CTASection } from "@/components/home/cta-section";

export const metadata: Metadata = {
    title: "Pricing | Vallit - AI Automation That Pays For Itself",
    description:
        "Simple, transparent pricing for managed AI automation. Starter at €29/mo, Growth at €79/mo, or custom Enterprise plans. All include managed setup.",
};

export default function PricingPage() {
    return (
        <>
            {/* Hero Section */}
            <PricingHero />

            {/* Value Propositions */}
            <PricingValueProps />

            {/* Pricing Tiers */}
            <PricingTiers />

            {/* Feature Comparison */}
            <FeatureComparison />

            {/* Trust & Social Proof */}
            <TrustSection />

            {/* FAQ Section */}
            <PricingFaq />

            {/* Contact Form */}
            <Section id="contact">
                <div className="max-w-2xl mx-auto">
                    <SectionHeader
                        badge="Get Started"
                        title="Ready to automate?"
                        subtitle="Fill out the form below and we'll get back to you within 24 hours with a custom plan for your needs."
                    />
                    <div className="bg-[#0A0A0A] rounded-2xl border border-white/10 p-8 md:p-10 shadow-2xl">
                        <ContactForm />
                    </div>
                </div>
            </Section>

            {/* Final CTA */}
            <CTASection />
        </>
    );
}
