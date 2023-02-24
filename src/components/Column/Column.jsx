import './column.scss'
import Card from '../Card/Card'
import CardForm from '../Card/CardForm'
import { useState, useEffect } from 'react'
import { useDrop } from 'react-dnd'
import { CardType } from '../../constants/types'

export default function Column({ props }) {
    const { col, removeColumn } = props
    const [cardForm, setCardForm] = useState(false)
    const [column, setColumn] = useState({
        id: col.id,
        title: col.title,
        cards: []
    })
    const { id, title, cards } = column

    useEffect(() => {
        console.log("Column title: ", title, " and its cards: ")
        console.table(cards)
    }, [cards, title])

    // make each column become a drop target for cards:
    const [{ isOver }, drop] = useDrop(() => ({
        accept: CardType.CARD,
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        }),
        drop: (item) => addCard(item)
    }))
    // TODO: dropping works, but sometimes replaces existing cards
    // TODO: dragged card need to be removed from starting column

    function toggleCardForm() {
        setCardForm(!cardForm)
    }

    function removeCard(cardTitle) {
        const updatedCards = col.cards.filter((card) => card.title !== cardTitle)
        setColumn({ ...column, cards: updatedCards })
    }

    const addCard = (item) => {
        const containsItem = column.cards.find((card) => card.id === item.id)
        if (!containsItem) {
            setColumn((previousState) => ({
                ...previousState,
                cards: [...previousState.cards, item],
            }))
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
                {cardForm ? <CardForm props={{ cards: column.cards, column, setColumn, toggleCardForm }} /> : ""}
                <button onClick={toggleCardForm}>Add Card</button>
            </div>
        </div>
    )
}