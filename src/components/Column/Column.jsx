import './column.scss'
import Card from '../Card/Card'
import CardForm from '../Card/CardForm'
import { useRef, useState } from 'react'
import { useDrop, useDrag } from 'react-dnd'
import { CardType, ColumnType } from '../../constants/types'
import { useCardContext } from '../../context/card.context';

export default function Column({ props }) {
    const { col, deleteColumn, moveColumn } = props
    const { allCards, onDrop } = useCardContext()
    const [cardForm, setCardForm] = useState(false)
    const { id, title } = col
    const ref = useRef()

    // collecting function for dragging the column:
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ColumnType,
        item: col,
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }))

    // visualize position of dragged card:
    const [, dropCol] = useDrop({
        accept: CardType.CARD,
        hover(item, monitor) {
            if (!ref.current) {
                return
            }

            // const findItem = allColumns.find(c => c.id === item.id)
            // // const dragIndex = allColumns.indexOf(findItem)
            // const dragIndex = col
            // const findCol = allColumns.find(c => c.id === col.id)
            // const hoverIndex = allColumns.indexOf(findCol)

            // if (dragIndex === hoverIndex) {
            //     return
            // }

            // const hoveredRect = ref.current.getBoundingClientRect();
            // const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2;
            // const mousePosition = monitor.getClientOffset();
            // const hoverClientY = mousePosition.y - hoveredRect.top;

            // if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            //     return;
            // }

            // if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            //     return;
            // }

            // moveColumn(dragIndex, hoverIndex, item, col);
        },
    });

    drag(dropCol(ref))

    // make each column become a drop target for cards:
    const [{ isOver }, drop] = useDrop(() => ({
        accept: CardType.CARD,
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        }),
        drop: (item, monitor) => {
            onDrop(item, monitor, col)
        }
    }))

    // TODO: implement dnd for columns

    function toggleCardForm() {
        setCardForm(!cardForm)
    }

    const opacity = isDragging ? 0.5 : 1

    return (
        <div className="collumn" style={{ backgroundColor: isOver && "purple", opacity }}>
            <div className='col-head' ref={ref} style={{ cursor: 'move' }}>
                <h2>{title}</h2>
                <p>ID: {id}</p>
                <button onClick={() => deleteColumn(id)}>remove col</button>
            </div>
            <div className='col-body' ref={drop}>
                {allCards.filter(card => card?.currCol === id).map((card) => {
                    return <Card key={card.id} props={{ card }} />
                })}
                {cardForm ? <CardForm props={{ toggleCardForm, col }} /> : ""}

                <button onClick={toggleCardForm}>Add Card</button>
            </div>
        </div>
    )
}