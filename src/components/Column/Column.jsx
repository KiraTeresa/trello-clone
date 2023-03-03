import './column.scss'
import Card from '../Card/Card'
import CardForm from '../Card/CardForm'
import { useRef, useState } from 'react'
import { useDrop, useDrag } from 'react-dnd'
import { CardType, ColumnType } from '../../constants/types'
import { useCardContext } from '../../context/card.context';

export default function Column({ props }) {
    const { col, allColumns, deleteColumn, moveColItem } = props
    const { allCards, dropCard } = useCardContext()
    const [cardForm, setCardForm] = useState(false)
    const { id, title } = col
    const ref = useRef()
    const [hoverIndex, setHoverIndex] = useState(undefined)
    const [hoverCol, setHoverCol] = useState(undefined)

    // collecting function for dragging the column:
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ColumnType,
        item: col,
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }))

    // visualize position of dragged column:
    const [, dropCol] = useDrop({
        accept: ColumnType,
        hover(item, monitor) {
            if (!ref.current) {
                return
            }

            const findItem = allColumns.find(c => c.id === item.id)
            const dragIndex = allColumns.indexOf(findItem)
            // const findCol = allColumns.find(c => c.id === col.id)
            // const hoverIndex = allColumns.indexOf(findCol)

            if (dragIndex === hoverIndex) {
                return
            }

            const hoveredRect = ref.current.getBoundingClientRect();
            const hoverMiddleX = (hoveredRect.right - hoveredRect.left) / 2;
            const mousePosition = monitor.getClientOffset();
            const hoverClientX = mousePosition.x - hoveredRect.left;

            if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
                return;
            }

            if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
                return;
            }

            moveColItem(dragIndex, hoverIndex, item, hoverCol);
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
            dropCard(item, monitor, col)
        }
    }))

    function toggleCardForm() {
        setCardForm(!cardForm)
    }

    function printColInfo() {
        // console.log("You are hovering col-", col.id, " >> ", col.title)
        const findCol = allColumns.find(c => c.id === col.id)
        setHoverCol(findCol)
        const colIndex = allColumns.indexOf(findCol)
        setHoverIndex(colIndex)
    }

    const opacity = isDragging ? 0.5 : 1

    return (
        <div className="collumn" onMouseEnter={() => printColInfo()} style={{ backgroundColor: isOver && "purple", opacity }}>
            <div className='col-head' ref={ref} style={{ cursor: 'move' }}>
                <h2>{title}</h2>
                <p>ID: {id}</p>
                <button onClick={() => deleteColumn(id)}>remove col</button>
            </div>
            <div className='col-body' ref={drop}>
                {allCards.filter(card => card.currCol === id).map((card) => {
                    return <Card key={card.id} props={{ card }} />
                })}
                {cardForm ? <CardForm props={{ toggleCardForm, col }} /> : ""}

                <button onClick={toggleCardForm}>Add Card</button>
            </div>
        </div>
    )
}