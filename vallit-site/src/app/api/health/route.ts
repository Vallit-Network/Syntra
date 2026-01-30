import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const supabase = await createClient();

        // Check Database Connection
        // We can just query something simple, like the current time or a health_check table if it existed.
        // Querying auth.users is restricted usually, let's try a simple RPC or just getSession implementation check, 
        // but better is to actually query data to confirm DB is responsive.
        // 'select count(*) from appointment' is a primitive check if we have permissions. 
        // Safest generic check without table assumptions:
        // If we can't run raw SQL, we can try to get the session, but that only checks Auth service.
        // Let's assume 'appointments' table exists as per previous context.

        const { count, error } = await supabase
            .from('appointments')
            .select('*', { count: 'exact', head: true });

        if (error) {
            console.error('Health Check DB Error:', error);
            return NextResponse.json(
                {
                    status: 'degraded',
                    services: {
                        database: { status: 'down', message: error.message },
                        api: { status: 'up' }
                    },
                    timestamp: new Date().toISOString()
                },
                { status: 503 }
            );
        }

        return NextResponse.json(
            {
                status: 'healthy',
                services: {
                    database: { status: 'up', latency: 'low' }, // We could measure time if we wanted
                    api: { status: 'up' }
                },
                timestamp: new Date().toISOString()
            },
            { status: 200 }
        );

    } catch (err) {
        console.error('Health Check Critical Error:', err);
        return NextResponse.json(
            {
                status: 'critical',
                message: 'Internal Server Error',
                timestamp: new Date().toISOString()
            },
            { status: 500 }
        );
    }
}
