import "./Series.css"

interface Props {
    title: string;
    children: React.ReactNode;
}

interface SerieProps {
    url: string;
    title: string;
    active: boolean;
}

export const Series = ({title, children}: Props) => {
    return (
        <nav className="series">
            <header>{title}</header>
            <div className="items">
                {children}
            </div>
        </nav>  
    )  
}

export const SerieItem = ({url, title, active = false}: SerieProps) => {
    return (
        <a href={url} className={`${active ? "active" : ""}`}>
            <div className="item-wrapper">
                <span>{title}</span>
            </div>
        </a>
    )
}