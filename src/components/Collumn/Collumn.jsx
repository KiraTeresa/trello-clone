import './collumn.scss'
import Card from '../Card/Card'
import CardForm from '../Card/CardForm'
import { useEffect, useState } from 'react'

export default function Collumn() {
    const [cards, setCards] = useState([])
    const [cardForm, setCardForm] = useState(false)

    useEffect(() => {
        console.log("rendering")
    }, [cards, cardForm])

    function addCard() {
        console.log('Button clicked')
        setCards([...cards, { title: `card ${cards.length + 1}`, description: "a description" }])
    }

    function showCardForm() {
        setCardForm(!cardForm)
    }

    console.log("Cards: ", cards)
    console.log("CardForm: ", cardForm)

    return (
        <div className="collumn">
            <h2>Column Title</h2>
            {cards.map((card, index) => {
                return <Card key={index} props={card} />
            })}
            {cardForm ? <CardForm props={setCards} /> : ""}
            <button onClick={showCardForm}>Add Card</button>
        </div>
    )
}