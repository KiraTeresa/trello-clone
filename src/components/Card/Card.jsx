import './card.scss'
import { CardType } from '../../constants/types'
import { useDrag } from 'react-dnd'

export default function Card({ props }) {
    const { card, removeCard } = props
    const { id, title, description, colHistory } = card

    // collecting function for dragging:
    const [{ isDragging }, drag] = useDrag(() => ({
        type: CardType.CARD,
        item: card,
        options: {
            dropEffect: "move"
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }))

    return (
        <div className="card" ref={drag} style={{ opacity: isDragging ? 0.5 : 1, cursor: 'move' }}>
            <h3>{title}</h3>
            <p>ID: {id}</p>
            <p>{description}</p>
            <ul>{colHistory.map(col => <li key={col}>{col}</li>)}</ul>
            <button onClick={() => removeCard(id)}>delete</button>
        </div>
    )
}