import './collumn.scss'
import Card from '../Card/Card'
import { useEffect, useState } from 'react'

export default function Collumn() {
    const [cards, setCards] = useState([])

    useEffect(() => {
        console.log("rendering")
    }, [cards])

    function addCard() {
        console.log('Button clicked')
        setCards([...cards, { title: `card ${cards.length + 1}`, description: "a description" }])
    }

    console.log(cards)

    return (
        <div className="collumn">
            <h2>Column Title</h2>
            {cards.map((card, index) => {
                return <Card key={index} props={card} />
            })}
            <button onClick={addCard}>Add Card</button>
        </div>
    )
}