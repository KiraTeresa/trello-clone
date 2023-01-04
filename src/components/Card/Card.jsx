import './card.scss'

export default function Card({ props }) {
    const { title, description } = props

    return (
        <div className="card">
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    )
}