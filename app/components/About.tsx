export default function About(props: { about: any[]; } ) {
    return (
        <>
            {props.about && props.about.map((a, i) => (
                <div key={i}>
                    <div className="about">{a}</div>
                </div>
            ))}
        </>
    );
}