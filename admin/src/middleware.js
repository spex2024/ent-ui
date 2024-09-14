import { NextResponse } from 'next/server';

export function middleware(req) {
    const token = req.cookies.get('token')?.value; // Use the Next.js cookies API

    console.log('Token:', token); // Debugging: Log the token

    const url = new URL(req.url);

    if (url.pathname === '/login' || url.pathname === '/signup') {
        if (token) {
            // Redirect to the dashboard or home page if the user is already logged in
            return NextResponse.redirect(new URL('/', req.url));
        }
    }

    if (token) {
        // Allow access if token is present
        return NextResponse.next();
    } else {
        // Redirect to the login page if token is not present
        return NextResponse.redirect(new URL('/login', req.url));
    }
}


export const config = {
    matcher: ['/', '/users', '/vendors', '/orders','/enterprises','/daily-orders','/login', '/signup'], // Adjust paths to match the routes you want to protect
};
