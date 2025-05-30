// app/components/Header.js
'use client'  // This ensures this file is treated as a client-side module

import { useCachedPayload } from '@/app/utils/fetchPayload';
import {useState, useEffect} from "react"
import {ThemeToggle} from "@/app/components/ThemeToggle";
import Link from "next/link";
import {HamburgerButton} from "@/app/components/HamburgerButton";

export default function Header(props: {
        toggleComponent: (arg0: string) => void;
        header:boolean
        toggleMenu(): any;
    }) {
    const BASE_URI = 'https://p01--admin--cvvgvqwlxhx2.code.run';
    const { data: booksData, isLoading, error } = useCachedPayload(BASE_URI, 'book', 10000);
    const readingNow = booksData?.docs.filter((book) => book.reading) || [];

    // State to keep track of the current index
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (readingNow.length > 0) {
            const interval = setInterval(() => {
                setCurrentIndex(prevIndex => {
                    // Calculate the next index, looping back to 0 if at the end of the array
                    return (prevIndex + 1) % readingNow.length;
                });
            }, 3000); // Update every three seconds

            // Clean up the interval on component unmount
            return () => clearInterval(interval);
        }
    }, [readingNow]); // Empty dependency array means this effect runs once on mount

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkWidth = () => setIsMobile(window.innerWidth > 600);
        checkWidth();
        window.addEventListener("resize", checkWidth);
        return () => window.removeEventListener("resize", checkWidth);
    }, []);

    return (
        <header className="header">
            <div className="header_logo">
                <Link onClick={() => props.toggleComponent("home")} className="little-weave" href="/">⩨</Link>
                <h1 className="typo_header">OVND</h1>
                {readingNow.length > 0 && readingNow[currentIndex] && readingNow[currentIndex]["url"] &&
                    <h1 className={"typo_header reading"}> – is <span><Link href={"/library"}>reading</Link></span>: <span><a
                        href={readingNow[currentIndex]["url"]}
                        target="_blank">{readingNow[currentIndex]["title"]}</a></span>
                    </h1>
                }
            </div>
            {props.home &&
                <div className={!props.open ? "header__nav off-screen" : "header__nav on-screen"}>
                    <h1 className={"typo_header"} onClick={() => props.toggleComponent("music")}><a>music</a></h1>
                    <h1 className={"typo_header"} onClick={() => props.toggleComponent("curatorial")}><a>curatorial</a></h1>
                    <h1 className={"typo_header"} onClick={() => props.toggleComponent("code")}><a>code</a></h1>
                    <h1 className={"typo_header"} onClick={() => props.toggleComponent("resume")}><a>cv</a></h1>
                    {isMobile && (<h1 className={"typo_header"} ><Link href="/library">library</Link></h1>)}
                    {isMobile && (<h1 className={"typo_header"}><ThemeToggle/></h1>)}
                </div>
            }
            {!props.home &&
                <div>
                    <h1 className={"typo_header"}>
                        <ThemeToggle/>
                    </h1>
                </div>
            }
            <div className={"header__nav-button"}>
                <HamburgerButton toggle={props.toggleMenu} />
            </div>
        </header>
    );
}