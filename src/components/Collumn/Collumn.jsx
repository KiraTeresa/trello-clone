import './collumn.scss'
import Card from '../Card/Card'
import CardForm from '../Card/CardForm'
import { useEffect, useState } from 'react'

export default function Collumn() {
    const [cards, setCards] = useState([])
    const [cardForm, setCardForm] = useState(true)
    const [newData, setNewData] = useState(undefined)

    useEffect(() => {
        console.log("rendering")
    }, [cards, newData])

    const addCard = (d) => {
        console.log('Button clicked')
        setNewData(d)
        // setCards([...cards, { title: `card ${cards.length + 1}`, description: "a description" }])
    }

    function showCardForm() {
        setCardForm(!cardForm)
    }

    // console.log("Cards: ", cards)
    // console.log("CardForm: ", cardForm)
    console.log("New data: ", newData)

    return (
        <div className="collumn">
            <h2>Column Title</h2>
            {cards.map((card, index) => {
                return <Card key={index} props={card} />
            })}
            {cardForm ? <CardForm cards={cards} setCards={setCards} /> : ""}
            <button onClick={showCardForm}>Add Card</button>
        </div>
    )
}