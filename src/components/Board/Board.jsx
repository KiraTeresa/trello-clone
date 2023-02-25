import Column from '../Column/Column';
import { useEffect, useState, useContext } from 'react';
import ColumnForm from '../Column/ColumnForm';
import './board.scss'
import colData from '../../data/columns.json'
import cardData from '../../data/cards.json'
import { CardContext } from '../../context/card.context';

export default function Board() {
    const { cardsAll, addNewCard } = useContext(CardContext)
    const [columns, setColumns] = useState(colData)
    const [columnForm, setColumnForm] = useState(false)
    const [cards, setCards] = useState([])

    // console.table(allCards)
    console.table(cardsAll)

    useEffect(() => {
        // setColumns(colData)
        setCards(cardData)
    }, [])

    useEffect(() => {
        console.log(">>> useEffect fired <<<")
    }, [cardsAll])

    function toggleColumnForm() {
        setColumnForm(!columnForm)
    }

    function removeColumn(colId) {
        const updatedColumns = columns.filter((col) => col.id !== colId)
        setColumns(updatedColumns)
    }

    const moveCard = (item, monitor, colId) => {
        const foundCard = cards.find((card) => card.id === item.id)
        // const foundIndex = cards.indexOf(foundCard)
        // console.log("Before: ", cards[foundIndex].currCol)
        console.log("Before: ", foundCard)
        // cards[foundIndex].currCol = colId
        const updatedCard = { ...foundCard, currCol: colId }
        console.log("Updated: ", updatedCard)
        const filteredCards = cards.filter((card) => card.id !== item.id)
        setCards([...filteredCards, updatedCard])
        // console.log("After --> ", cards[foundIndex].currCol)
        console.log("After--> ", [...filteredCards, updatedCard])
        // console.log("The MONITOR ", monitor)
    }
    // TODO: >> does not always move the correct card --> changed index

    function deleteCard(cardId) {
        console.log("Cards before: ", cards)
        const updatedCards = cards.filter(card => card.id !== cardId)
        console.log("Cards after --> ", updatedCards)
        setCards([...updatedCards])
        console.log("Card removed")
    }
    // TODO: >> deleting cards doesn't work anymore

    return (
        <div>
            <button onClick={toggleColumnForm}>Add new column</button>
            <div className='col-wrap'>

                {
                    columns.map((col, index) => { return <Column key={index} props={{ col, removeColumn, moveCard, deleteCard }} /> }
                    )
                }
                {columnForm ? <ColumnForm props={{ columns, setColumns, toggleColumnForm }} /> : ""}
            </div>
        </div>
    )
}
