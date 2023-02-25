import './column.scss'
import Card from '../Card/Card'
import CardForm from '../Card/CardForm'
import { useEffect, useState } from 'react'
import { useDrop } from 'react-dnd'
import { CardType } from '../../constants/types'
import cardData from '../../data/cards.json'

export default function Column({ props }) {
    const { col, removeColumn, moveCard, addCard, deleteCard, cards } = props
    const [cardForm, setCardForm] = useState(false)
    const { id, title } = col

    useEffect(() => {
        console.log("re-render column")
    }, [cards])

    // make each column become a drop target for cards:
    const [{ isOver, didDrop }, drop] = useDrop(() => ({
        accept: CardType.CARD,
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            didDrop: !!monitor.didDrop()
        }),
        drop: (item, monitor) => moveCard(item, monitor, col.id)
    }))

    function toggleCardForm() {
        setCardForm(!cardForm)
    }

    return (
        <div className="collumn" style={{ backgroundColor: isOver && "purple" }}>
            <div className='col-head'>
                <h2>{title}</h2>
                <p>ID: {id}</p>
                <button onClick={() => removeColumn(id)}>remove col</button>
            </div>
            <div className='col-body' ref={drop}>
                {cardData.filter(card => card.currCol === id).map((card, index) => {
                    return <Card key={index} props={{ card, deleteCard }} />
                })}
                {cardForm ? <CardForm props={{ cards, addCard, toggleCardForm, col }} /> : ""}

                <button onClick={toggleCardForm}>Add Card</button>
            </div>
        </div>
    )
}