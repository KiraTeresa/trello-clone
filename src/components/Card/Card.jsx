import './card.scss'

export default function Card({ props }) {
    const { card, removeCard } = props
    const { id, title, description } = card

    return (
        <div className="card">
            <h3>{title}</h3>
            <p>ID: {id}</p>
            <p>{description}</p>
            <button onClick={() => removeCard(title)}>delete</button>
        </div>
    )
}