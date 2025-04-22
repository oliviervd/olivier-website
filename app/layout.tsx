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
import Head from "next/head";

export const metadata: Metadata = {
    title: "Olivier Van D'huynslager",
    description: "Personal website and portfolio of Olivier Van D'huynslager; a curator and strategist based in Gent, Belgium. Currently working at Design Museum Gent, his work is driven by the intricate relationships between digital technology and design.",
    keywords: [
        "Olivier Van D'huynslager",
        "oliviervandhuynslager",
        "Olivier Dhuynslager",
        "digital design strategist",
        "portfolio",
        "Curator",
        "curator",
        "design",
        "digital",
        "culture"
    ],
    openGraph: {
        title: "Olivier Van D'huynslager",
        description: "Personal website and portfolio of Olivier Van D'huynslager; a curator and strategist based in Gent, Belgium. Currently working at Design Museum Gent, his work is driven by the intricate relationships between digital technology and design.",
        url: "https://oliviervandhuynslager.net",
        type: "website",
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

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Olivier Van D'huynslager",
        "alternateName": "oliviervandhuynslager",
        "url": "https://oliviervandhuynslager.net",
        "jobTitle": "Curator and Digital Strategist",
        "affiliation": {
            "@type": "Organization",
            "name": "Design Museum Gent",
        },
    };


    return (
        <html lang="en">
        <Head>
            <meta name="google-site-verification" content="1dEJnMXmVc9ditPgQL6TNdseYy2jOxAJ_7sjNPJCQgo" />
            <script type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            ></script>
        </Head>
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