import './card.scss'

export default function Card({ props }) {
    const { card, removeCard } = props
    const { title, description } = card

    return (
        <div className="card">
            <h3>{title}</h3>
            <p>{description}</p>
            <button onClick={() => removeCard(title)}>delete</button>
        </div>
    )
}