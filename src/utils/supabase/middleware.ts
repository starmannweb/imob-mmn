import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
    // Guard: if env vars are missing, just pass through
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
        console.error("Missing Supabase env vars in middleware");
        return NextResponse.next({ request });
    }

    let supabaseResponse = NextResponse.next({
        request,
    });

    const supabase = createServerClient(
        supabaseUrl,
        supabaseKey,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
                    supabaseResponse = NextResponse.next({
                        request,
                    });
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    );
                },
            },
        }
    );

    // IMPORTANT: Avoid writing any logic between createServerClient and
    // supabase.auth.getUser(). A simple mistake could make it very hard to debug
    // issues with users being randomly logged out.

    try {
        const {
            data: { user },
        } = await supabase.auth.getUser();

        // Redirect users to login if they aren't logged in and trying to access a protected route
        if (!user && request.nextUrl.pathname.startsWith("/painel")) {
            const url = request.nextUrl.clone();
            url.pathname = "/login";
            return NextResponse.redirect(url);
        }

        // Redirect users to painel if they are already logged in and trying to access login/register
        if (user && (request.nextUrl.pathname.startsWith("/login") || request.nextUrl.pathname.startsWith("/registrar"))) {
            const url = request.nextUrl.clone();
            url.pathname = "/painel";
            return NextResponse.redirect(url);
        }
    } catch (err) {
        console.error("Middleware auth error:", err);
    }

    return supabaseResponse;
}
