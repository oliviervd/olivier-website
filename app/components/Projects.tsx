import {useState, useEffect} from "react";
import serialize from "@/app/utils/serialize";
import MusicPlayer from "@/app/components/MusicPlayer";
import About from "@/app/components/About"

export default function Projects(props: any) {

    const [page, setPage] = useState([]); // State to store the selected page content

    // UseEffect to set the correct page content based on props.type
    useEffect(() => {
        const selectedPage = props.pages.find((p) => p.title === props.type); // Find the page matching the type
        if (selectedPage) {
            setPage(selectedPage.content); // Update state only when the page changes
        }
    }, [props.pages, props.type]); // Re-run effect if library or type changes

    useEffect(() => {
        if (props.scrollToID) {
            scroller(props.scrollToID); // Call scrollToID logic if provided
        }
    }, [props.scrollToID]); // Dependency on scrollToID ensures no infinite loop

    function scroller(id) {
        // Select element
        const scrollToElem = document.getElementById(id);
        const targetScrollPosition = scrollToElem.offsetTop - 5;

        // Scroll to the target position
        window.scrollTo({
            top: targetScrollPosition,
            behavior: "smooth",
        });

        // Remove "selected" class from all elements
        const allElements = document.querySelectorAll(".selected");
        allElements.forEach((element) => {
            element.classList.remove("selected");
            element.classList.add("index");
        });

        // Highlight selected element
        scrollToElem.className = "selected";
    }

    return(
        <div className={"projects__grid"}>
            <div id={"brief"} className={"brief"}>

                {page.map((p, index)=>{
                    return(
                        <section key={p.content.id}>
                            <div>
                                <p id={p.content.id} className={"index"}>{index}</p>
                                <p>
                                    {props.type === "home" && (
                                        <span className={"type"}>{`[${p.content.type}]`} – </span>
                                    )}
                                    {serialize(p.content.brief[0].children)}
                                </p>
                            </div>
                            {p.content.type === "music" &&
                                props.music.map((m, i) => {
                                    if (m.project.id === p.content.id) {
                                        return <MusicPlayer key={i} data={m} index={i} />;
                                    }
                                    return null; // Return null if condition is not met
                                })}
                        </section>
                    )
                })}

            </div>
            <div style={{ paddingTop: "10px" }}>
                {props.type === "home" && (
                    <div className={"bio_text"}>
                        <About about={props.about} />
                    </div>
                )}
                {page.map((p, index) => {
                    return (
                        <div key={p.content.id} style={{ position: "relative" }}>
                            {p.content.heroImage.sizes.tablet.url && (
                                <img
                                    onClick={() => scroller(p.content.id)}
                                    id={p.content.id}
                                    src={p.content.heroImage.sizes.tablet.url}
                                    alt={p.content.heroImage.alt}
                                />
                            )}
                            <p className={"index--image"}>{index}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}