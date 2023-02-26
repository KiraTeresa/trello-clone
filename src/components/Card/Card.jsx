import './card.scss'
import { CardType } from '../../constants/types'
import { useDrag, useDrop } from 'react-dnd'
import { useRef } from 'react'
import { useCardContext } from '../../context/card.context';

export default function Card({ props }) {
    const { deleteCard, moveItem, allCards } = useCardContext()
    const ref = useRef(null)
    const { card, index: cardIndex } = props
    const { id, title, description } = card

    // collecting function for dragging:
    const [{ isDragging, getInitialSourceClientOffset, clientOffset }, drag] = useDrag(() => ({
        type: CardType.CARD,
        item: card,
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
            // boundingClientRect: ref.current.getBoundingClientRect(),
            clientOffset: monitor.getClientOffset(),
            getInitialSourceClientOffset: monitor.getInitialSourceClientOffset()
        })
    }))

    function printPosition(dragIndex, hoverIndex, hoveredRect, hoverMiddleY, mousePosition, hoverClientY) {
        console.table({ dragIndex, hoverIndex, hoveredRect, hoverMiddleY, mousePosition, hoverClientY })
    }

    function displayItemInfo(item, card) {
        console.log("ITEM>>> ", item)
        console.log("card>>> ", card)
    }

    // visualize position of dragged card:
    const [{ handlerId }, drop] = useDrop({
        accept: CardType.CARD,
        collect(monitor) {
            return { handlerId: monitor.getHandlerId() }
        },
        hover(item, monitor) {
            if (!ref.current) {
                return
            }

            const findItem = allCards.find(c => c.id === item.id)
            const dragIndex = allCards.indexOf(findItem)
            const findCard = allCards.find(c => c.id === card.id)
            const hoverIndex = allCards.indexOf(findCard)
            displayItemInfo(item, card)
            // console.log("drag: ", dragIndex, " + hover: ", hoverIndex)

            // if (dragIndex === hoverIndex) {
            //     return
            // }

            const hoveredRect = ref.current.getBoundingClientRect();
            const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2;
            const mousePosition = monitor.getClientOffset();
            const hoverClientY = mousePosition.y - hoveredRect.top;

            // if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            //     return;
            // }

            // if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            //     return;
            // }

            printPosition(dragIndex, hoverIndex, hoveredRect, hoverMiddleY, mousePosition, hoverClientY)

            moveItem(dragIndex, hoverIndex, item, card);
            // item.index = hoverIndex;
        },
    });

    drag(drop(ref));
    const opacity = isDragging ? 0.5 : 1
    // console.table({ getInitialSourceClientOffset: getInitialSourceClientOffset, clientOffset: clientOffset })

    return (
        <>
            <div className="card" ref={ref} data-handler-id={handlerId} style={{ opacity, cursor: 'move' }}>
                <h3>{title}</h3>
                <p>ID: {id}</p>
                <p>{description}</p>
                <button onClick={() => deleteCard(id)}>delete</button>
            </div>
        </>
    )
}