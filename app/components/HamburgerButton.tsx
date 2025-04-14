export function HamburgerButton(props) {
    return(
        <h1 onClick={()=>props.toggle()} className={"little-weave__button"}>⩨</h1>
    )
}