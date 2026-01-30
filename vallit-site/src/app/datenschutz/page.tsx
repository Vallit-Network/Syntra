import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy | Vallit",
    description: "Privacy policy and data protection information for Vallit. Compliant with EU GDPR.",
};

export default function DatenschutzPage() {
    return (
        <div className="pt-32 pb-20 md:pt-40 md:pb-24">
            <div className="container mx-auto px-6 max-w-4xl">
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">
                    Privacy Policy
                </h1>
                <p className="text-[var(--gray-400)] mb-12">
                    Information pursuant to Art. 13, 14 and 21 of the General Data Protection Regulation (GDPR).
                </p>

                <div className="prose prose-invert max-w-none space-y-12 text-[var(--gray-300)] opacity-90">

                    {/* 1. Overview */}
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-6">1. An Overview of Data Protection</h2>
                        <h3 className="text-xl font-medium text-white mb-3">General Information</h3>
                        <p>
                            The following information provides a simple overview of what happens to your personal data when you visit this website.
                            Personal data usage is any data with which you can be personally identified. Detailed information on the subject of data protection can be found in our privacy policy below.
                        </p>
                        <h3 className="text-xl font-medium text-white mb-3 mt-6">Data Recording on this Website</h3>
                        <ul className="list-disc pl-6 space-y-2 mt-2">
                            <li>
                                <strong>Who is responsible for the data recording on this website?</strong><br />
                                The data processing on this website is carried out by the website operator. You can find their contact details in the section "Information about the Responsible Party" in this privacy policy.
                            </li>
                            <li>
                                <strong>How do we collect your data?</strong><br />
                                Your data is collected when you provide it to us. This could, for example, be data you enter in a contact form or share with our AI assistant "Kian".
                                Other data is collected automatically by our IT systems when you visit the website (e.g., technical data such as internet browser, operating system, or time of the page request).
                            </li>
                            <li>
                                <strong>What do we use your data for?</strong><br />
                                Part of the data is collected to ensure the error-free provision of the website. Other data may be used to analyze your user behavior, process your inquiries, or schedule appointments.
                            </li>
                            <li>
                                <strong>What rights do you have regarding your data?</strong><br />
                                You have the right at any time to receive information free of charge about the origin, recipient, and purpose of your stored personal data. You also have the right to request that this data be corrected or deleted.
                            </li>
                        </ul>
                    </section>

                    {/* 2. Hosting */}
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-6">2. Hosting</h2>
                        <h3 className="text-xl font-medium text-white mb-3">Vercel</h3>
                        <p>
                            We host our website with Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA.
                        </p>
                        <p className="mt-2">
                            Vercel is a tool for creating and hosting websites. When you visit our website, your data is processed on Vercel's servers.
                            Information such as your IP address is processed to ensure the security and stability of the service.
                            Vercel participates in the EU-US Data Privacy Framework, providing a guarantee to comply with European data protection laws.
                        </p>
                        <p className="mt-2">
                            <strong>Legal basis:</strong> The use of Vercel is based on Art. 6(1)(f) GDPR (Legitimate Interest). We have a legitimate interest in the most reliable implementation of our website.
                        </p>
                    </section>

                    {/* 3. General & Mandatory */}
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-6">3. General Information and Mandatory Information</h2>

                        <div className="p-6 bg-[rgba(255,255,255,0.05)] rounded-xl border border-[rgba(255,255,255,0.1)] mb-8">
                            <h3 className="text-lg font-semibold text-white mb-4">Information about the Responsible Party (Controller)</h3>
                            <p className="mb-2">The responsible party for data processing on this website is:</p>
                            <p className="font-mono text-sm bg-[rgba(0,0,0,0.3)] p-4 rounded-lg border border-[rgba(255,255,255,0.05)]">
                                <span className="text-[var(--accent)]">Vallit</span><br />
                                Parkstraße 1<br />
                                76131 Karlsruhe<br />
                                Germany<br /><br />
                                Email: contact@vallit.net
                            </p>

                        </div>

                        <h3 className="text-xl font-medium text-white mb-3">Revocation of Your Consent to Data Processing</h3>
                        <p>
                            Many data processing operations are only possible with your express consent. You can revoke your consent at any time.
                            The legality of the data processing carried out until the revocation remains unaffected by the revocation.
                        </p>

                        <h3 className="text-xl font-medium text-white mb-3 mt-6">Right to Object (Art. 21 GDPR)</h3>
                        <p>
                            IF THE DATA PROCESSING IS BASED ON ART. 6(1)(E) OR (F) GDPR, YOU HAVE THE RIGHT TO OBJECT TO THE PROCESSING OF YOUR PERSONAL DATA AT ANY TIME FOR REASONS ARISING FROM YOUR PARTICULAR SITUATION.
                        </p>

                        <h3 className="text-xl font-medium text-white mb-3 mt-6">Right of Appeal to the Competent Supervisory Authority</h3>
                        <p>
                            In the event of GDPR violations, data subjects are entitled to log a complaint with a supervisory authority, in particular in the Member State of their habitual residence, place of work, or place of the alleged violation.
                        </p>

                        <h3 className="text-xl font-medium text-white mb-3 mt-6">SSL and/or TLS Encryption</h3>
                        <p>
                            For security reasons and to protect the transmission of confidential content, such as inquiries you send to us, this site uses SSL or TLS encryption.
                            You can recognize an encrypted connection in your browser's address line when it changes from "http://" to "https://" and by the lock icon in your browser line.
                        </p>
                    </section>

                    {/* 4. Data Collection */}
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-6">4. Data Collection on this Website</h2>

                        <h3 className="text-xl font-medium text-white mb-3">Cookies and Local Storage</h3>
                        <p>
                            Our website uses "Local Storage" to save your preferences and session state locally in your browser.
                            Specifically, we use <code>vallit_session_id</code> to maintain the continuity of your chat conversation with our AI assistant "Kian".
                            This data is stored on your device and is not automatically transmitted to us unless you interact with the chat.
                        </p>
                        <p className="mt-2">
                            We do not use third-party tracking cookies or advertising cookies without your explicit consent.
                        </p>

                        <h3 className="text-xl font-medium text-white mb-3 mt-6">Server Log Files</h3>
                        <p>
                            The provider of the pages (Vercel) automatically collects and stores information in so-called server log files, which your browser automatically transmits to us. These are:
                        </p>
                        <ul className="list-disc pl-6 space-y-1 mt-2 mb-4">
                            <li>Browser type and browser version</li>
                            <li>Operating system used</li>
                            <li>Referrer URL</li>
                            <li>Hostname of the accessing computer</li>
                            <li>Time of the server request</li>
                            <li>IP address</li>
                        </ul>
                        <p>
                            This data is not merged with other data sources. The collection of this data is based on Art. 6(1)(f) GDPR. The website operator has a legitimate interest in the technically error-free presentation and optimization of its website.
                        </p>

                        <h3 className="text-xl font-medium text-white mb-3 mt-6">Contact Form and E-Mail Request</h3>
                        <p>
                            If you send us inquiries via the contact form, email, or our scheduling tools, your details from the inquiry form, including the contact details you provided there (Name, Email, Company Name), will be stored by us for the purpose of processing the inquiry and in case of follow-up questions. We do not pass on this data without your consent.
                        </p>
                        <p className="mt-2">
                            The processing of this data is based on Art. 6(1)(b) GDPR, if your request is related to the fulfillment of a contract or is necessary for the implementation of pre-contractual measures. In all other cases, the processing is based on our legitimate interest in the effective processing of the inquiries addressed to us (Art. 6(1)(f) GDPR).
                        </p>
                    </section>

                    {/* 5. Custom Features */}
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-6">5. Custom Features & Tools</h2>

                        <h3 className="text-xl font-medium text-white mb-3">AI Assistant "Kian"</h3>
                        <p>
                            We use an AI-powered chatbot ("Kian") on our website to answer your questions and assist with scheduling.
                            The content of your chat interactions is processed by our backend and forwarded to OpenAI, L.L.C., San Francisco, USA, for generating responses.
                        </p>
                        <p className="mt-2">
                            <strong>Data transmitted:</strong> Your chat messages, session ID, and any personal information you voluntarily provide in the chat.
                        </p>
                        <p className="mt-2">
                            <strong>Purpose:</strong> Providing immediate customer support, answering product questions, and facilitating appointment bookings.
                        </p>
                        <p className="mt-2">
                            <strong>Legal Basis:</strong> Art. 6(1)(f) GDPR (Legitimate Interest) and Art. 6(1)(b) GDPR (Contract Initiation).
                            We have concluded a Data Processing Agreement (DPA) with OpenAI to ensure compliance with European data protection standards.
                        </p>

                        <h3 className="text-xl font-medium text-white mb-3 mt-6">Supabase</h3>
                        <p>
                            We use Supabase (provided by Supabase Inc.) as our backend database and authentication provider.
                            Data you enter in forms or the chat widget may be stored in our Supabase database to ensure we can provide our services.
                            Supabase servers are located in AWS data centers protected by high security standards.
                        </p>
                    </section>

                    {/* 6. Contact */}
                    <section className="mb-20">
                        <h2 className="text-2xl font-semibold text-white mb-6">6. Contact for Privacy Concerns</h2>
                        <p>
                            If you have any questions about this privacy policy or our data protection practices, please contact us at:
                        </p>
                        <p className="mt-4 font-bold text-white">
                            contact@vallit.net
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
