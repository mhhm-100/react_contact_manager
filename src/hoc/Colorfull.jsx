import style from "../style.module.css"

const Colorfull = (WrappedComponent) => {
    const colors = [
        "blue",
        "red",
        "black",
        "pink",
        "green",
        "gray"
    ];

    let color = colors[Math.floor(Math.random() * 5)];
    let BgColor = color;

    return (Props) => {
        return (
            <div className={style.headerContecnt} style={{ backgroundColor: BgColor }}>
                <WrappedComponent {...Props} />
            </div>
        )
    }
}

export default Colorfull;