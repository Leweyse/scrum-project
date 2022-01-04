export default function SlideElement(props) {
    return (
        <div className={props.parentClassName}>
            <div className={props.childClassName}>
                {props.content}
            </div>
        </div>
    )
}