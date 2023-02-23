import './column.scss'
import Card from '../Card/Card'
import CardForm from '../Card/CardForm'
import { useState } from 'react'
import { useDrop } from 'react-dnd'
import { CardType } from '../../constants/types'

export default function Collumn({ props }) {
    const [cards, setCards] = useState([])
    const [cardForm, setCardForm] = useState(false)
    const { col, removeColumn } = props
    const { id, title } = col

    // make each column become a drop target for cards:
    const [{ isOver }, drop] = useDrop(() => ({
        accept: CardType.CARD,
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        }),
        drop: (item) => addCard(item)
    }))

    function toggleCardForm() {
        setCardForm(!cardForm)
    }

    function removeCard(title) {
        const updatedCards = cards.filter((card) => card.title !== title)
        setCards(updatedCards)
    }

    function addCard(item) {
        const containsItem = cards.find((card) => card.id === item.id)
        if (!containsItem) {
            setCards([...cards, item])
        }
    }

    return (
        <div className="collumn" style={{ backgroundColor: isOver && "purple" }}>
            <div className='col-head'>
                <h2>{title}</h2>
                <p>ID: {id}</p>
                <button onClick={() => removeColumn(title)}>remove col</button>
            </div>
            <div className='col-body' ref={drop}>
                {cards.map((card, index) => {
                    return <Card key={index} props={{ card, removeCard }} />
                })}
                {cardForm ? <CardForm props={{ cards, setCards, toggleCardForm }} /> : ""}
                <button onClick={toggleCardForm}>Add Card</button>
            </div>
        </div>
    )
}