import './column.scss'
import Card from '../Card/Card'
import CardForm from '../Card/CardForm'
import { useState } from 'react'
import { useDrop } from 'react-dnd'
import { CardType } from '../../constants/types'
import { useCardContext } from '../../context/card.context';

export default function Column({ props }) {
    const { col, deleteColumn } = props
    const { allCards, onDrop } = useCardContext()
    const [cardForm, setCardForm] = useState(false)
    const { id, title } = col

    // make each column become a drop target for cards:
    const [{ isOver }, drop] = useDrop(() => ({
        accept: CardType.CARD,
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        }),
        // drop: (item, monitor) => moveCard(item, monitor, col.id)
        drop: (item, monitor) => {
            onDrop(item, monitor, col)
        }
    }))

    function toggleCardForm() {
        setCardForm(!cardForm)
    }

    return (
        <div className="collumn" style={{ backgroundColor: isOver && "purple" }}>
            <div className='col-head'>
                <h2>{title}</h2>
                <p>ID: {id}</p>
                <button onClick={() => deleteColumn(id)}>remove col</button>
            </div>
            <div className='col-body' ref={drop}>
                {allCards.filter(card => card.currCol === id).map((card, index) => {
                    return <Card key={card.id} props={{ card, index }} />
                })}
                {cardForm ? <CardForm props={{ toggleCardForm, col }} /> : ""}

                <button onClick={toggleCardForm}>Add Card</button>
            </div>
        </div>
    )
}