import BookShelfContainer from "@/app/library/BookshelfContainer";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "Olivier Van D'huynslager - Library",
    description: "a virtual bookshelf / library of books",
    keywords: ["Olivier Van D'huynslager", "books", "p5", "P5", "creative coding", "culture"],
    openGraph: {
        title: "Olivier Van D'huynslager",
        description: "a virtual bookshelf / library of books",
        url: "https://oliviervandhuynslager.net/library",
        type: "website",
        images: [
            {
                url: "https://d3b71b8mgnztvw.cloudfront.net/bookshelf-UI-1024x639.png",
                alt: "dithered screenshot of the interface"
            }
        ]
    }
};
export default function Page() {
    return <BookShelfContainer/>
}