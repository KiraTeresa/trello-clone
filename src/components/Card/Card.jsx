import './card.scss'
import { CardType } from '../../constants/types'
import { useDrag } from 'react-dnd'
import { useContext } from 'react'
import { CardContext } from '../../context/card.context';

export default function Card({ props }) {
    const { deleteCard } = useContext(CardContext)
    const { card } = props
    const { id, title, description } = card

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
            <button onClick={() => deleteCard(id)}>delete</button>
        </div>
    )
}