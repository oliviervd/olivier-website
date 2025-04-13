import serialize from "@/app/utils/serialize";

export default function Resume(props) {
    // todo: add function for generating and downloading pdf?
    // function that constructs the resume based on the data in payload
    let r = props.resume;
    console.log(props.show);

    if (r && r.intro) {
        return (
            <section className={props.show ? "resume__container on-screen" : "resume__container off-screen-right"}>
                {props.globals[0] &&
                    <img className={"bio-img"} src={props.globals[0]["headshot"]["url"]}
                         alt={"profile picture of Olivier Van D'huynslager"}/>
                }
                <p className={"intro"}>{serialize(r.intro[0].children)}</p>
                <p className={"typo_header resume__container-divider"}>EXPERIENCE</p>
                {r.experiences.map((exp)=>{
                    if (exp.display) {
                        return(
                            <div className={"experience"}>
                                <p>{exp.startDate} – {exp.endDate}</p>
                                <p>{exp.title}</p>
                                <p>{exp.organisation}</p>
                            </div>
                        )
                    }
                })}
                <p className={"typo_header resume__container-divider"}>TEACHING</p>
                {r.teachings.map((t)=>{
                    if (t.display) {
                        return (
                            <div className={"experience"}>
                                <p>{t.startDate}</p>
                                <p>{t.title}</p>
                                <p>{t.organisation}</p>
                            </div>
                        )
                    }
                })}
                <p className={"typo_header resume__container-divider"}>EDUCATION</p>
                {r.educations.map((edu)=>{
                    if (edu.display) {
                        return (
                            <div className={"education"}>
                                <p>{edu.endDate}</p>
                                <p>{edu.title}</p>
                                <p>{edu.organisation}</p>
                            </div>
                        )
                    }

                })}
                <p className={"typo_header resume__container-divider"}>WORK//COMMISSIONS</p>
                {r.commissions.map((c)=> {
                    if (c.display) {
                        return (
                            <div className={"experience"}>
                                <p>{c.endDate}</p>
                                <p><a id={c.id} onClick={()=>props.navigateToProject(c.relatedProjects.id, c.type)}>{c.title}</a></p>
                                <p>{c.type}</p>
                            </div>
                        )
                    }
                })}
            </section>
        )
    }

}