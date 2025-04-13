import {getYear} from "@/app/utils/utils";
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";

// @ts-ignore
export function BookList({books, tags}) {
    const years: number[] = []; // Using a typed array for clarity

    // Filter books based on the provided tags
    const filteredBooks = books.filter((book: { category: any[]; }) => {
        return tags.length === 0 ||
            (Array.isArray(book.category) && book.category.some((cat) => tags.includes(cat)));
    });

    // Extract unique years from the filtered books
    filteredBooks.forEach((book: { datePublished: string | number | Date; }) => {
        const year = getYear(book.datePublished);
        if (!years.includes(year)) {
            years.push(year);
        }
    });

    return (
        <section>
            <section style={{display: "grid", gridTemplateColumns: "0.5fr 5fr"}}>
                <div></div>
                <div className={"table__header"}>
                    <h2>author</h2>
                    <h2>title - year</h2>
                    <h2>publisher</h2>
                </div>
            </section>

            {years
                .sort()
                .reverse()
                .map((y) => {
                    return (
                        <div key={y}>
                            <section
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "0.5fr 5fr",
                                    paddingBottom: "20px",
                                }}
                            >
                                <div className={"table__group"}>
                                    <h1>{y}</h1>
                                </div>
                                <div>
                                    {filteredBooks.map((book: { datePublished: string | number | Date; title: boolean | Key | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; author: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; subtitle: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; publisher: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => {
                                        if (getYear(book.datePublished) === y) {
                                            // @ts-ignore
                                            // @ts-ignore
                                            return (
                                                <div className={"table__body"} key={book.title}>
                                                    <div>{book.author}</div>
                                                    <div>
                                                        {book.title}
                                                        {book.subtitle && <span>: {book.subtitle}</span>} -{" "}
                                                        {getYear(book.datePublished)}
                                                    </div>
                                                    <div>{book.publisher}</div>
                                                </div>
                                            );
                                        }
                                    })}
                                </div>
                            </section>
                            <div className={"seperator"}>** ** **</div>
                        </div>
                    );
                })}
        </section>
    );
}