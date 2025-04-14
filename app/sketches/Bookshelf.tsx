import React, { Component } from "react";
import { shuffle } from "../utils/utils.ts";
import { getYear } from "../utils/utils.ts";

class Bookshelf extends Component {
    defaultProps = {
        tags: [],
    };

    componentDidMount() {
        if (this.props.books?.length > 0) {
            this.initSketch();
        }
    }

    componentDidUpdate(prevProps) {
        const tagsChanged = prevProps.tags !== this.props.tags;
        const booksChanged = prevProps.books !== this.props.books;

        if ((tagsChanged || booksChanged) && this.props.books.length > 0) {
            this.initSketch();
        }
    }

    componentWillUnmount() {
        if (this.canvas) {
            this.canvas.remove();
        }
        window.removeEventListener("resize", this.handleResize);
    }

    fetchThemeColors = () => {
        const rootStyles = getComputedStyle(document.documentElement);
        const bgColor = rootStyles.getPropertyValue("--bg-color")?.trim() || "#ffffff";
        const textColor = rootStyles.getPropertyValue("--text-color")?.trim() || "#000000";
        return { bgColor, textColor };
    };

    handleResize = () => {
        if (this.canvas && this.wrapper) {
            this.canvas.resizeCanvas(this.wrapper.offsetWidth, window.innerHeight);
        }
    };

    initSketch = () => {
        if (this.canvas) {
            this.canvas.remove();
            window.removeEventListener("resize", this.handleResize);
        }

        import("p5").then(({ default: P5 }) => {
            const sketch = this.createSketch(this.props.books, this.props.tags);
            this.canvas = new P5(sketch, this.wrapper);
            window.addEventListener("resize", this.handleResize);
        });
    };

    createSketch = (booksProp, tagsProp) => (p) => {
        let filteredBooks;
        const showAll = tagsProp.length === 0 || tagsProp.includes("all");

        if (!showAll) {
            filteredBooks = booksProp.filter((book) =>
                Array.isArray(book.category) && book.category.some((cat) => tagsProp.includes(cat))
            );
        } else {
            filteredBooks = [...booksProp];
        }

        const books = filteredBooks.length > 0 ? shuffle(filteredBooks) : booksProp;
        const numberOfShelfs = 3;
        const gap = 5;
        let scale = window.innerHeight < 700 ? 3 : window.innerHeight < 900 ? 4 : 5;
        let selectedBookIndex = null;

        p.setup = () => {
            p.createCanvas(window.innerWidth, window.innerHeight);
        };

        p.draw = () => {
            const { bgColor, textColor } = this.fetchThemeColors();
            const shelfHeight = p.height / numberOfShelfs;
            let shelf = 0;
            let xPos = 30;

            p.background(p.color(bgColor));
            p.stroke(p.color(textColor));
            p.strokeWeight(3);

            // Draw shelves
            for (let y = 1; y < numberOfShelfs; y++) {
                p.line(30, p.height / numberOfShelfs * y, p.width - 50, p.height / numberOfShelfs * y);
            }

            // Draw books
            p.strokeWeight(0.8);
            let numberOfBooks = books.length;

            for (let i = 0; i < numberOfBooks; i++) {
                let book = books[i];
                let bookHeight = book.height * scale;
                let bookWidth = book.depth * scale;
                let bookX = xPos;
                let bookY = (shelfHeight + shelf * shelfHeight) - 10;

                let isHovering = p.mouseX >= bookX &&
                    p.mouseX <= bookX + bookWidth &&
                    p.mouseY >= bookY - bookHeight &&
                    p.mouseY <= bookY;

                if (book.reading) {
                    p.fill("orange");
                    p.circle(bookX + bookWidth / 2, bookY + 20, 5);
                }

                if (isHovering) {
                    selectedBookIndex = i;
                    p.fill("orange");
                } else {
                    p.noFill();
                }

                p.stroke(p.color(textColor));
                p.rect(bookX, bookY, bookWidth, -bookHeight);

                xPos += bookWidth + gap;
                if (xPos > p.width - 65) {
                    shelf++;
                    xPos = 30;
                    if (shelf >= numberOfShelfs) break;
                }
            }

            if (selectedBookIndex !== null) {
                const book = books[selectedBookIndex];
                p.fill("orange");
                p.noStroke();
                p.textSize(16);
                p.text(
                    `Title: ${book.title}\nAuthor: ${book.author}\nPublished: ${getYear(book.datePublished)}\nPublisher: ${book.publisher}`,
                    30,
                    p.height - 200
                );
            }
        };

        p.mousePressed = () => {
            const shelfHeight = p.height / numberOfShelfs;
            let shelf = 0;
            let xPos = 30;

            for (let i = 0; i < books.length; i++) {
                let book = books[i];
                let bookHeight = book.height * scale;
                let bookWidth = book.depth * scale;
                let bookX = xPos;
                let bookY = (shelfHeight + shelf * shelfHeight) - 10;

                let isClicked = p.mouseX >= bookX &&
                    p.mouseX <= bookX + bookWidth &&
                    p.mouseY >= bookY - bookHeight &&
                    p.mouseY <= bookY;

                if (isClicked) {
                    selectedBookIndex = i;
                    break;
                }

                xPos += bookWidth + gap;
                if (xPos > p.width - 100) {
                    shelf++;
                    xPos = 30;
                    if (shelf >= numberOfShelfs) break;
                }
            }
        };
    };

    render() {
        return (
            <div
                style={{ height: "100vh", overflow: "hidden" }}
                ref={(wrapper) => (this.wrapper = wrapper)}
            />
        );
    }
}

export default Bookshelf;