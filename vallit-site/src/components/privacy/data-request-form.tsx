"use client";

import { useState } from "react";

export function DataRequestForm() {
    const [email, setEmail] = useState("");
    const [type, setType] = useState<"ACCESS" | "DELETE">("ACCESS");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        setMessage("");

        try {
            const response = await fetch("/api/user/data-request", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, type }),
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.error || "Request failed");

            setStatus("success");
            setMessage(
                type === "ACCESS"
                    ? "We have received your request. You will receive an email shortly with your data or further instructions."
                    : "Your deletion request has been recorded. We will process this within the statutory period and confirm via email."
            );
            setEmail("");
        } catch (error) {
            setStatus("error");
            setMessage("Something went wrong. Please try again or contact us directly via email.");
            console.error(error);
        }
    };

    return (
        <div className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl p-6 mt-8">
            <h3 className="text-xl font-medium text-white mb-4">Manage Your Data</h3>
            <p className="text-gray-300 text-sm mb-6">
                You can request a copy of your personal data or request its deletion directly through this form.
                For security, we will send a confirmation to the email address provided.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm text-gray-400 mb-2">Email Address</label>
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-[rgba(0,0,0,0.2)] border border-[rgba(255,255,255,0.1)] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[var(--accent)]"
                        placeholder="your@email.com"
                    />
                </div>

                <div>
                    <label className="block text-sm text-gray-400 mb-2">Request Type</label>
                    <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="type"
                                value="ACCESS"
                                checked={type === "ACCESS"}
                                onChange={() => setType("ACCESS")}
                                className="accent-[var(--accent)]"
                            />
                            <span className="text-white text-sm">Request Data Access</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="type"
                                value="DELETE"
                                checked={type === "DELETE"}
                                onChange={() => setType("DELETE")}
                                className="accent-[var(--accent)]"
                            />
                            <span className="text-white text-sm">Request Data Deletion</span>
                        </label>
                    </div>
                </div>

                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={status === "loading"}
                        className="bg-[var(--accent)] text-black font-medium px-6 py-2 rounded-lg hover:brightness-110 transition-all disabled:opacity-50"
                    >
                        {status === "loading" ? "Submitting..." : "Submit Request"}
                    </button>
                </div>

                {message && (
                    <div className={`p-4 rounded-lg text-sm ${status === "success" ? "bg-green-500/10 text-green-200" : "bg-red-500/10 text-red-200"}`}>
                        {message}
                    </div>
                )}
            </form>
        </div>
    );
}
