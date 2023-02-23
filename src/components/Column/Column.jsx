import './column.scss'
import Card from '../Card/Card'
import CardForm from '../Card/CardForm'
import { useState } from 'react'

export default function Collumn({ props }) {
    const [cards, setCards] = useState([])
    const [cardForm, setCardForm] = useState(false)
    const { col, removeColumn } = props
    const { title } = col

    function toggleCardForm() {
        setCardForm(!cardForm)
    }

    function removeCard(title) {
        const updatedCards = cards.filter((card) => card.title !== title)
        setCards(updatedCards)
    }

    return (
        <div className="collumn">
            <h2>{title}</h2>
            <button onClick={() => removeColumn(title)}>remove col</button>
            {cards.map((card, index) => {
                return <Card key={index} props={{ card, removeCard }} />
            })}
            {cardForm ? <CardForm props={{ cards, setCards, toggleCardForm }} /> : ""}
            <button onClick={toggleCardForm}>Add Card</button>
        </div>
    )
}