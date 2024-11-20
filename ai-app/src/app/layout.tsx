import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
    title: 'Tech Review AI Generator',
    description: 'Generate AI-powered tech reviews with SEO analysis',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
} 