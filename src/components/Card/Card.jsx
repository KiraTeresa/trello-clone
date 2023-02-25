import './card.scss'
import { CardType } from '../../constants/types'
import { useDrag, useDrop } from 'react-dnd'
import { useRef } from 'react'

export default function Card({ props }) {
    const { card, removeCard } = props
    const { id, title, description } = card
    const ref = useRef(null)

    // collecting function for dragging:
    const [{ isDragging }, drag] = useDrag(() => ({
        type: CardType,
        item: card,
        options: {
            dropEffect: "move"
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }))

    const [, drop] = useDrop({
        accept: CardType,

    })

    return (
        <div className="card" ref={drag} style={{ opacity: isDragging ? 0.5 : 1, cursor: 'move' }}>
            <h3>{title}</h3>
            <p>ID: {id}</p>
            <p>{description}</p>
            <button onClick={() => removeCard(id)}>delete</button>
        </div>
    )
}