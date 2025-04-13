'use client'  // This ensures this file is treated as a client-side module

import {useState} from "react";
import {useCachedPayload} from "@/app/utils/fetchPayload";
import Header from "@/app/components/Header";
import Bookshelf from "@/app/sketches/Bookshelf";
import {BookList} from "@/app/library/Booklist";
import "../styles/library.css"

export default function Page() {
    const [view ,setView] = useState("shelf")
    const [var1, setVar1] = useState(Math.floor(Math.random() * 10))

    // fetch data from API
    const BASE_URI = 'https://p01--admin--cvvgvqwlxhx2.code.run';
    const { data: aboutData } = useCachedPayload(BASE_URI, "about", 10000); // globals
    const { data: booksData } = useCachedPayload(BASE_URI, "book", 10000); //
    const books = booksData?.docs || []
    const globals = aboutData?.docs || []
    let pages = 0;
    const [showFilters, setShowFilters] = useState(true);
    const [tags, setTags] = useState<string[]>([]); // Using state for tags
    let options =  [
        "art",
        "design",
        "graphic design",
        "exhibition catalogue",
        "curatorial",
        "museology",
        "computation",
        "AI",
        "ecology",
        "philosophy",
        "architecture",
        "theory",
        "history",
        "feminism",
        "science-fiction",
        "media",
        "urban",
        "weaving",
        "sociology",
        "creative-coding"
    ] // todo: make this dynamic (parse from API)

    function handleTag(o: string) {
        setTags((prevTags) =>
            prevTags.includes(o) ? prevTags.filter((tag) => tag !== o) : [...prevTags, o]
        );
    }

    console.log(tags)

    for (let i = 0; i < books.length; i += 10) {
        pages += books[i]["pages"] || []
    }

    // todo: number of main (tota)
    // todo: filter (non-fiction, fiction)

    return(
        <>

            {globals[0] &&
                <Header globals={globals} home={false}/>
            }

            {books[0] &&
                <div className={"bookshelf--container"}>
                    <div className={"bookshelf__nav"}>
                        <div className={"bookshelf__switch"}>
                            <a onClick={() => {
                                setView("list")
                            }}>list</a>
                            <a onClick={() => {
                                setView("shelf")
                            }}>shelf</a>
                        </div>
                        <a onClick={()=>setShowFilters(!showFilters)}>filters</a>
                    </div>
                    {view === "shelf" &&
                        <Bookshelf books={books} totalPages={pages} tags={tags}/>
                    }
                    {view === "list" &&
                        <BookList books={books} tags={tags}/>
                    }
                    {showFilters &&
                        <div className={"bookshelf__filters"}>
                            {tags.length > 0 &&
                                <div className={"clear"}>
                                    <a onClick={()=>setTags([])}>clear all</a>
                                </div>
                            }
                            {options.map((o) => {
                                    return (
                                        <div>
                                            <a style={{color: tags.includes(o) ? "white" : "black"}} onClick={()=>handleTag(o)}>{o}</a>
                                        </div>
                                    )
                                }
                            )}
                        </div>
                    }
                </div>
            }

        </>

    )
}