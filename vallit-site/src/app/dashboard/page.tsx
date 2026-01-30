"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import {
    Clock,
    LayoutGrid,
    CheckCircle2,
    XCircle,
    AlertCircle,
    Server,
    Database,
    ShieldCheck
} from "lucide-react"

type SystemStatus = 'healthy' | 'degraded' | 'critical' | 'loading';

interface HealthData {
    status: SystemStatus;
    services: {
        database: { status: 'up' | 'down'; message?: string; latency?: string };
        api: { status: 'up' | 'down' };
    };
    timestamp: string;
}

export default function DashboardOverview() {
    const [user, setUser] = useState<any>(null)
    const [health, setHealth] = useState<HealthData | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch User
                const userRes = await fetch("/api/user/me")
                if (userRes.ok) {
                    const userData = await userRes.json()
                    setUser(userData)
                }

                // Fetch Health
                const healthRes = await fetch("/api/health")
                // We parse JSON even if status is not 200, to get error details
                const healthData = await healthRes.json()
                setHealth(healthData)

            } catch (err) {
                console.error("Dashboard data fetch failed", err)
                setHealth({
                    status: 'critical',
                    services: {
                        database: { status: 'down', message: 'Network Error' },
                        api: { status: 'down' }
                    },
                    timestamp: new Date().toISOString()
                })
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    if (loading) {
        return (
            <div className="p-8 pt-12 animate-pulse max-w-[1200px] mx-auto">
                <div className="h-8 w-48 bg-white/5 rounded mb-8" />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="h-64 w-full bg-white/5 rounded-xl border border-white/5" />
                    <div className="h-64 w-full bg-white/5 rounded-xl border border-white/5" />
                </div>
            </div>
        )
    }

    const isHealthy = health?.status === 'healthy'
    const statusColor = isHealthy ? 'text-emerald-400' : (health?.status === 'degraded' ? 'text-yellow-400' : 'text-red-400')
    const statusBg = isHealthy ? 'bg-emerald-500/10' : (health?.status === 'degraded' ? 'bg-yellow-500/10' : 'bg-red-500/10')
    const statusBorder = isHealthy ? 'border-emerald-500/20' : (health?.status === 'degraded' ? 'border-yellow-500/20' : 'border-red-500/20')
    const StatusIcon = isHealthy ? CheckCircle2 : (health?.status === 'degraded' ? AlertCircle : XCircle)

    return (
        <div className="p-8 pt-12 max-w-[1200px] mx-auto space-y-10">

            {/* Header Section */}
            <div className="flex items-end justify-between border-b border-white/5 pb-5">
                <div>
                    <h1 className="text-2xl font-semibold text-white tracking-tight mb-1">
                        {user ? `Good afternoon, ${user.name}` : 'Welcome back'}
                    </h1>
                    <div className={`text-[13px] font-medium flex items-center gap-2 ${statusColor}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${isHealthy ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]' : (health?.status === 'degraded' ? 'bg-yellow-500' : 'bg-red-500')}`} />
                        {isHealthy ? 'All systems operational' : 'System issues detected'}
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-xs text-white/20 font-mono">v2.5.1</span>
                </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Quick Actions */}
                <div className="bg-[#111] border border-white/5 rounded-xl p-6">
                    <h2 className="text-lg font-medium text-white mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <a href="/dashboard/settings" className="block p-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 transition-colors group">
                            <div className="mb-3 w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                                <LayoutGrid className="w-4 h-4" />
                            </div>
                            <h3 className="text-sm font-medium text-white mb-1">Manage Workspace</h3>
                            <p className="text-xs text-white/40">Configure company settings and members.</p>
                        </a>

                        <a href="/dashboard/chat-preview" className="block p-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 transition-colors group">
                            <div className="mb-3 w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                                <Clock className="w-4 h-4" />
                            </div>
                            <h3 className="text-sm font-medium text-white mb-1">Test Chatbot</h3>
                            <p className="text-xs text-white/40">Preview your assistant in real-time.</p>
                        </a>
                    </div>
                </div>

                {/* System Status Widget */}
                <div className="bg-[#111] border border-white/5 rounded-xl p-6 flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-medium text-white">System Health</h2>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${statusBg} ${statusColor} ${statusBorder} flex items-center gap-1.5`}>
                            <StatusIcon className="w-3.5 h-3.5" />
                            {health?.status === 'healthy' ? 'Healthy' : (health?.status === 'degraded' ? 'Degraded' : 'Critical')}
                        </span>
                    </div>

                    <div className="space-y-3 flex-1">
                        {/* Database Status */}
                        <div className="flex items-center justify-between p-3 rounded-lg bg-[#080808] border border-white/5 group hover:border-white/10 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg ${health?.services.database.status === 'up' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                                    <Database className="w-4 h-4" />
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-white/80">Database</div>
                                    <div className="text-xs text-white/30">Supabase integration</div>
                                </div>
                            </div>
                            <div className={`text-xs font-medium px-2 py-0.5 rounded ${health?.services.database.status === 'up' ? 'text-emerald-400 bg-emerald-500/10' : 'text-red-400 bg-red-500/10'}`}>
                                {health?.services.database.status === 'up' ? 'Connected' : 'Error'}
                            </div>
                        </div>

                        {/* API Status */}
                        <div className="flex items-center justify-between p-3 rounded-lg bg-[#080808] border border-white/5 group hover:border-white/10 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg ${health?.services.api.status === 'up' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                                    <Server className="w-4 h-4" />
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-white/80">API Gateway</div>
                                    <div className="text-xs text-white/30">Latency: Low</div>
                                </div>
                            </div>
                            <div className="text-xs font-medium px-2 py-0.5 rounded text-emerald-400 bg-emerald-500/10">
                                Operational
                            </div>
                        </div>

                        {/* Security/Auth (Implied from user load) */}
                        <div className="flex items-center justify-between p-3 rounded-lg bg-[#080808] border border-white/5 group hover:border-white/10 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                                    <ShieldCheck className="w-4 h-4" />
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-white/80">Auth Services</div>
                                    <div className="text-xs text-white/30">Identity provider</div>
                                </div>
                            </div>
                            <div className="text-xs font-medium px-2 py-0.5 rounded text-blue-400 bg-blue-500/10">
                                Active
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
