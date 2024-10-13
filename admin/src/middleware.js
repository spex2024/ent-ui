import { NextResponse } from 'next/server';

export function middleware(req) {
    const token = req.cookies.get('admin')?.value; // Use the Next.js cookies API
    const url = new URL(req.url);

    if (token) {
        // Redirect to home or dashboard if trying to access login or signup page while logged in
        if (url.pathname === '/login' || url.pathname === '/signup') {
            return NextResponse.redirect(new URL('/', req.url));
        }
    } else {
        // Redirect to login if no token is present
        if (url.pathname !== '/login' && url.pathname !== '/signup') {
            return NextResponse.redirect(new URL('/login', req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/users', '/vendors', '/orders', '/enterprises', '/daily-orders', '/return-pack', '/login','/add-subscription'],
};
