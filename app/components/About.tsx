export default function About(props) {
    console.log(props);
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