import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const supabase = await createClient();
        const { data: { user }, error } = await supabase.auth.getUser();

        if (error || !user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Ideally we might want to fetch extra profile data from a 'profiles' table if it exists
        // For now, we return the user object which contains metadata

        return NextResponse.json({
            id: user.id,
            email: user.email,
            name: user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0],
            role: user.role,
            last_sign_in: user.last_sign_in_at
        });

    } catch (err) {
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
