// app/layout.js
import type { Metadata } from "next";

// styling
import "./globals.css";
import "./styles/header.css";
import "./styles/typography.css";
import "./styles/UI.css";
import "./styles/resume.css";
import "./styles/projects.css";

import QueryProvider from "@/app/context/QueryProvider";
import {ThemeProvider} from "@/app/context/ThemeProvider";

export const metadata: Metadata = {
    title: "Olivier Van D'huynslager",
    description: "Website of Olivier Van D'huynslager",
    openGraph: {
        title: "Olivier Van D'huynslager",
        description: "Website of Olivier Van D'huynslager",
        url: "https://oliviervandhuynslager.net",
        images: [
            {
                url: "https://d3b71b8mgnztvw.cloudfront.net/headshot-dither",
                alt: "headshot of Olivier Van D'huynslager"
            }
        ]
    }
};


export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body>
        <ThemeProvider>
            {/* Wrap your entire app with QueryClientProvider */}
            <QueryProvider>
                {children}
            </QueryProvider>
        </ThemeProvider>
        </body>
        </html>
    );
}