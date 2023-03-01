import './card.scss'
import { CardType } from '../../constants/types'
import { useDrag, useDrop } from 'react-dnd'
import { useRef } from 'react'
import { useCardContext } from '../../context/card.context';

export default function Card({ props }) {
    const { deleteCard, moveItem, allCards } = useCardContext()
    const ref = useRef(null)
    const { card } = props
    const { id, title, description } = card

    // collecting function for dragging the card:
    const [{ isDragging }, drag] = useDrag(() => ({
        type: CardType.CARD,
        item: card,
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }))

    // visualize position of dragged card:
    const [, drop] = useDrop({
        accept: CardType.CARD,
        hover(item, monitor) {
            if (!ref.current) {
                return
            }

            const findItem = allCards.find(c => c.id === item.id)
            const dragIndex = allCards.indexOf(findItem)
            const findCard = allCards.find(c => c.id === card.id)
            const hoverIndex = allCards.indexOf(findCard)

            if (dragIndex === hoverIndex) {
                return
            }

            const hoveredRect = ref.current.getBoundingClientRect();
            const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2;
            const mousePosition = monitor.getClientOffset();
            const hoverClientY = mousePosition.y - hoveredRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            moveItem(dragIndex, hoverIndex, item, card);
        },
    });

    drag(drop(ref));

    const opacity = isDragging ? 0.5 : 1

    return (
        <>
            <div className="card" ref={ref} style={{ opacity, cursor: 'move' }}>
                <h3>{title}</h3>
                <p>ID: {id}</p>
                <p>{description}</p>
                <button onClick={() => deleteCard(id)}>delete</button>
            </div>
        </>
    )
}