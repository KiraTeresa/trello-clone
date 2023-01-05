import './collumn.scss'
import Card from '../Card/Card'
import CardForm from '../Card/CardForm'
import { useEffect, useState } from 'react'

export default function Collumn() {
    const [cards, setCards] = useState([])
    const [cardForm, setCardForm] = useState(false)

    // useEffect(() => {
    //     console.log("rendering")
    // }, [cards, cardForm])

    function toggleCardForm() {
        setCardForm(!cardForm)
    }

    function removeCard(title) {
        const updatedCards = cards.filter((card) => card.title !== title)
        setCards(updatedCards)
    }

    return (
        <div className="collumn">
            <h2>Column Title</h2>
            {cards.map((card, index) => {
                return <Card key={index} props={{ card, removeCard }} />
            })}
            {cardForm ? <CardForm props={{ cards, setCards, toggleCardForm }} /> : ""}
            <button onClick={toggleCardForm}>Add Card</button>
        </div>
    )
}