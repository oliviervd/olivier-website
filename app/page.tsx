'use client' // allow client-side rendering/

import Header from "./components/Header";
import About from "./components/About"
import Projects from "./components/Projects";
import Resume from "./components/Resume";
import {useCachedPayload} from "@/app/utils/fetchPayload";
import serialize from "./utils/serialize";
import { useRouter } from "next/navigation";

// P5
import Pillar from "./sketches/Pillar";

import {useState, useEffect} from "react";
import type {Metadata} from "next";

export default function Home() {

    let about = null;
    const [var1, setVar1] = useState(Math.floor(Math.random() * 10))

    // router
    const router = useRouter()


    // fetch data from DB
    const BASE_URI = 'https://p01--admin--cvvgvqwlxhx2.code.run'; //todo: move to .env
    const { data: aboutData } = useCachedPayload(BASE_URI, "about", 10000);
    const {data: resumeData} = useCachedPayload(BASE_URI,"resume", 1000);
    const {data: musicData} = useCachedPayload(BASE_URI,"music", 1000);
    const { data: pagesData } = useCachedPayload(BASE_URI, "page", 10000);


    // state management
    const [type, setType] = useState("home")
    const [showResume, setShowResume] = useState(false);
    const [showAbout, setShowAbout] = useState(true);
    const [scrollToID, setScrollToID] = useState(null)

    const resume = resumeData?.docs[0] || [];
    const globals = aboutData?.docs || [];
    const pages = pagesData?.docs || [];
    const music = musicData?.docs || []

    if (aboutData?.docs?.[0]?.bio) {
        about = serialize(aboutData.docs[0].bio);
    }

    useEffect(() => {
        cycle(); // Call cycle() when component mounts
    }, []);

    function toggleComponent(componentName: string) {
        // function that toggles the view on the main page between different sections such as music, curatorial, cv, etc.
        // todo: make so that the URL also changes. (query)
        cycle(); // when clicked, change the P5js params.
        setShowResume(componentName === "resume");
        setType(componentName);
        if (window.innerWidth < 600) {
            setShowAbout(false)
        }
    }

    function cycle() {
        setVar1(Math.floor(Math.random() * 10))
    }

    function navigateToProject(id, type) {
        toggleComponent(type)
        setScrollToID(id)
    }

    return (
        <div className={'main--container'}>
            <Header toggleComponent={toggleComponent} home={true}/>
            <>
                {
                    about && (
                        <div className={"box__half"}>
                            <About about={about}/>
                        </div>
                    )
                }
                {
                    !showResume && (
                        <div className={"projects__container"}>
                            <Projects about={about} type={type} pages={pages} music={music} scrollToID={scrollToID}/>
                        </div>
                    )
                }
                <Resume resume={resume} globals={globals} show={showResume} about={about} navigateToProject={navigateToProject}/>
            </>
            <div className={"pillar__container"}>
                <Pillar var1={var1}/>
            </div>
        </div >

    );
}
