export interface BotConfig {
    companyName: string;
    primaryColor: string;
    customFieldLabel: string; // e.g., "Seminar Interest" or "Project Type"
    locale: "en" | "de";
}

export interface BotResponse {
    id: string;
    keywords: string[];
    content: string;
    action?: "calendar" | "contact_form";
}

export const defaultBotConfig: BotConfig = {
    companyName: "Vallit",
    primaryColor: "#22c55e",
    customFieldLabel: "Topic of Interest",
    locale: "en",
};

export const botKnowledgeBase: BotResponse[] = [
    {
        id: "greeting",
        keywords: ["hey", "hi", "hello", "hallo", "greetings", "moin"],
        content: "Hello! I'm Kian. I can help you with our custom AI automation, Discord community bots, high-performance websites, and intelligent time tracking. What are you looking for?",
    },
    {
        id: "capabilities",
        keywords: ["what can you do", "help", "features", "capabilities", "können", "hilfe", "services"],
        content: "We build digital solutions that redefine what's possible. I can tell you about:\n• AI Automation (Enterprise Custom Logic)\n• Deep Data Analysis (Patterns & Insights)\n• Discord Bots (Community Intelligence)\n• Immersive Websites (Next.js & React)\n• AI Time Tracking (Cognitive Resource Management)\n\nWhich one interests you?",
    },
    {
        id: "automation",
        keywords: ["automate", "automation", "automatisieren", "automatisierung", "ai"],
        content: "Our AI automation handles complex business logic. From customer support to internal workflows, we build custom neural networks that understand your specific context. No drag-and-drop necessary.",
    },
    {
        id: "data_analysis",
        keywords: ["data", "analysis", "analytics", "insights", "analyze", "predict"],
        content: "We unlock hidden value in your data. Our AI models analyze patterns, optimize workflows, and predict trends to help you make smarter business decisions based on real evidence.",
    },
    {
        id: "discord",
        keywords: ["discord", "bot", "community", "chat"],
        content: "We build deeply integrated Discord bots that manage your community, automate roles, and connect directly to your external tools (CRM, Notion, etc.). It's more than a bot; it's community intelligence.",
    },
    {
        id: "website",
        keywords: ["website", "web", "design", "frontend", "nextjs", "react"],
        content: "We create immersive, high-performance web experiences using Next.js and modern animation libraries. Fast, SEO-optimized, and designed to convert visitors instantly.",
    },
    {
        id: "timetracking",
        keywords: ["time", "tracking", "track", "resource", "management"],
        content: "Our cognitive time tracking uses AI to automatically categorize your work and generate insights. Say goodbye to manual timesheets and get accurate data on where your team's time actually goes.",
    },
    {
        id: "scheduling",
        keywords: ["schedule", "scheduling", "calendar", "termin", "kalender", "appointment"],
        content: "Our scheduling system manages calendars, sends invites, and handles rescheduling automatically. It works with Google Calendar and Outlook seamlessly.",
    },
    {
        id: "pricing",
        keywords: ["price", "pricing", "cost", "kosten", "preis"],
        content: "We create tailored solutions for every client. To give you an exact quote, we'd need to understand your specific requirements. Please reach out via our contact form.",
    },
    {
        id: "continue",
        keywords: ["go on", "tell me more", "continue", "details", "more", "weiter", "erzähl mir mehr"],
        content: "I'd love to! Our core mission is to build the 'impossible' digital solution for you. Whether it's a complex bot or a stunning website, we handle the tech so you can focus on business. Ask me about a specific service to learn more.",
    },
    {
        id: "contact",
        keywords: ["contact", "email", "mail", "kontakt", "sprechen", "talk"],
        content: "I'd be happy to connect you with our team! Please use the contact form on our website to reach out for a consultation.",
        action: "contact_form",
    },
    {
        id: "fallback",
        keywords: [],
        content: "I'm not sure I understood that. However, our team certainly can! Please browse our solutions page or contact us to discuss your idea.",
    }
];

export const gettingStartedPrompts = [
    "AI Automation",
    "Data Analysis",
    "Discord Bots",
    "Immersive Websites"
];
