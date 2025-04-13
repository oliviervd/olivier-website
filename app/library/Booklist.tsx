import {getYear} from "@/app/utils/utils";

export function BookList({ books, tags }) {
    const years: number[] = []; // Using a typed array for clarity

    // Filter books based on the provided tags
    const filteredBooks = books.filter((book) => {
        return tags.length === 0 ||
            (Array.isArray(book.category) && book.category.some((cat) => tags.includes(cat)));
    });

    // Extract unique years from the filtered books
    filteredBooks.forEach((book) => {
        const year = getYear(book.datePublished);
        if (!years.includes(year)) {
            years.push(year);
        }
    });

    return (
        <section>
            <section style={{ display: "grid", gridTemplateColumns: "0.5fr 5fr" }}>
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
                                    {filteredBooks.map((book) => {
                                        if (getYear(book.datePublished) === y) {
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