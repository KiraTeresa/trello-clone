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
        // console.log("Column title: ", title, " and its cards: ")
        // console.table(cards)
    }, [cards, title])

    // make each column become a drop target for cards:
    const [{ isOver, didDrop }, drop] = useDrop(() => ({
        accept: CardType.CARD,
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            didDrop: !!monitor.didDrop(),
            source: column,
        }),
        drop: (item, source) => addCard(item, source)
    }))
    // TODO: dragged card need to be removed from starting column
    // ? useContext for columns (stored in Board.jsx) ?

    function toggleCardForm() {
        setCardForm(!cardForm)
    }

    function removeCard(cardId) {
        const updatedCards = col.cards.filter((card) => card.id !== cardId)
        setColumn({ ...column, cards: updatedCards })
    }

    const addCard = (item, source) => {
        const containsItem = column.cards.find((card) => card.id === item.id)
        if (!containsItem) {
            const prevCol = "" // TODO: remove card from prev column
            setColumn((previousState) => ({
                ...previousState, // track previous state in order to not overwrite last action
                cards: [...previousState.cards, item],
            }))
            console.log(source)
        }
        console.log("Dropped? ", didDrop)
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