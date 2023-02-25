import './column.scss'
import Card from '../Card/Card'
import CardForm from '../Card/CardForm'
import { useEffect, useState, useContext } from 'react'
import { useDrop } from 'react-dnd'
import { CardType } from '../../constants/types'
import { CardContext } from '../../context/card.context';

export default function Column({ props }) {
    const { col, removeColumn, moveCard, deleteCard } = props
    const { allCards } = useContext(CardContext)
    const [cardForm, setCardForm] = useState(false)
    const { id, title } = col

    useEffect(() => {
        console.log("re-render column")
    }, [allCards])

    // make each column become a drop target for cards:
    const [{ isOver }, drop] = useDrop(() => ({
        accept: CardType.CARD,
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        }),
        drop: (item, monitor) => moveCard(item, monitor, col.id)
    }))

    function toggleCardForm() {
        setCardForm(!cardForm)
    }

    return (
        <div className="collumn" style={{ backgroundColor: isOver && "purple" }}>
            <div className='col-head'>
                <h2>{title}</h2>
                <p>ID: {id}</p>
                <button onClick={() => removeColumn(id)}>remove col</button>
            </div>
            <div className='col-body' ref={drop}>
                {allCards.filter(card => card.currCol === id).map((card, index) => {
                    return <Card key={index} props={{ card, deleteCard }} />
                })}
                {cardForm ? <CardForm props={{ toggleCardForm, col }} /> : ""}

                <button onClick={toggleCardForm}>Add Card</button>
            </div>
        </div>
    )
}