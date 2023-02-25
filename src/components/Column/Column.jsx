import './column.scss'
import Card from '../Card/Card'
import CardForm from '../Card/CardForm'
import { useEffect, useState } from 'react'
import { useDrop } from 'react-dnd'
import { CardType } from '../../constants/types'
import Cards from '../../data/cards.json'

export default function Column({ props }) {
    const { col, removeColumn } = props
    const [cardForm, setCardForm] = useState(false)
    const { id, title } = col
    const [cards, setCards] = useState([])

    useEffect(() => {
        const currCards = Cards.filter((card) => card.currCol === id)
        setCards(currCards)
    }, [])

    // make each column become a drop target for cards:
    const [{ isOver }, drop] = useDrop(() => ({
        accept: CardType,
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        })
    }))

    function toggleCardForm() {
        setCardForm(!cardForm)
    }

    function removeCard(cardId) {
        const updatedCards = cards.filter((card) => card.id !== cardId)
        setCards(updatedCards)
    }

    return (
        <div className="collumn" style={{ backgroundColor: isOver && "#f38fa0" }}>
            <div className='col-head'>
                <h2>{title}</h2>
                <p>ID: {id}</p>
                <button onClick={() => removeColumn(title)}>remove col</button>
            </div>
            <div className='col-body' ref={drop}>
                {cards.map((card, index) => {
                    return <Card key={index} props={{ card, removeCard }} />
                })}
                {cardForm ? <CardForm props={{ cards, col, setCards, toggleCardForm }} /> : ""}
                <button onClick={toggleCardForm} style={{ borderRadius: "50%", width: "fit-content", cursor: "pointer" }}>+</button>
            </div>
        </div>
    )
}