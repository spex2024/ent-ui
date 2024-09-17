import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(req) {
    const token = req.cookies.get('token')?.value; // Use the Next.js cookies API
    const url = new URL(req.url);

    if (token) {
        try {
            // Decode and verify the token
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET); // Replace with your secret

            // If the token is valid, redirect to home/dashboard if trying to access login/signup
            if (url.pathname === '/login' || url.pathname === '/signup') {
                return NextResponse.redirect(new URL('/', req.url));
            }
        } catch (err) {
            // If token verification fails (expired or invalid), redirect to login
            if (err.name === 'TokenExpiredError' || err.name === 'JsonWebTokenError') {
                return NextResponse.redirect(new URL('/login', req.url));
            }
        }
    } else {
        // Redirect to login if no token is present and trying to access protected routes
        if (url.pathname !== '/login' && url.pathname !== '/signup') {
            return NextResponse.redirect(new URL('/login', req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/users', '/vendors', '/orders', '/enterprises', '/daily-orders', '/return-pack', '/login'],
};
