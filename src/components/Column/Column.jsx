import './column.scss'
import Card from '../Card/Card'
import CardForm from '../Card/CardForm'
import { useState, useEffect } from 'react'
import { useDrop } from 'react-dnd'
import { CardType } from '../../constants/types'
import cardData from '../../data/cards.json'

export default function Column({ props }) {
    const { col, removeColumn, addCard, setCards } = props
    const [cardForm, setCardForm] = useState(false)
    const { id, title } = col

    // make each column become a drop target for cards:
    const [{ isOver, didDrop }, drop] = useDrop(() => ({
        accept: CardType.CARD,
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            didDrop: !!monitor.didDrop(),
            source: col,
        }),
        drop: (item, monitor) => addCard(item, monitor, col.id)
    }))
    // TODO: dragged card need to be removed from starting column
    // ? useContext for columns (stored in Board.jsx) ?

    function toggleCardForm() {
        setCardForm(!cardForm)
    }

    // function removeCard(cardId) {
    //     const updatedCards = col.cards.filter((card) => card.id !== cardId)
    //     setColumn({ ...column, cards: updatedCards })
    // }

    return (
        <div className="collumn" style={{ backgroundColor: isOver && "purple" }}>
            <div className='col-head'>
                <h2>{title}</h2>
                <p>ID: {id}</p>
                <button onClick={() => removeColumn(id)}>remove col</button>
            </div>
            <div className='col-body' ref={drop}>
                {cardData.filter(card => card.currCol === id).map((card, index) => {
                    return <Card key={index} props={{ card }} />
                })}
                {cardForm ? <CardForm props={{ cardData, col, setCards, toggleCardForm }} /> : ""}
                <button onClick={toggleCardForm}>Add Card</button>
            </div>
        </div>
    )
}