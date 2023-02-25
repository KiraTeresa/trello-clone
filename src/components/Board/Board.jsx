import Column from '../Column/Column';
import { useEffect, useState } from 'react';
import ColumnForm from '../Column/ColumnForm';
import './board.scss'
import colData from '../../data/columns.json'
import cardData from '../../data/cards.json'

export default function Board() {
    const [columns, setColumns] = useState([])
    const [columnForm, setColumnForm] = useState(false)
    const [cards, setCards] = useState([])

    useEffect(() => {
        setColumns(colData)
        setCards(cardData)
    }, [columns, cards])

    function toggleColumnForm() {
        setColumnForm(!columnForm)
    }

    function removeColumn(colId) {
        const updatedColumns = columns.filter((col) => col.id !== colId)
        setColumns(updatedColumns)
    }

    const addCard = (item, monitor, colId) => {
        const foundCard = cards.find((card) => card.id === item.id)
        const foundIndex = cards.indexOf(foundCard)
        console.log("Before: ", cards[foundIndex].currCol)
        cards[foundIndex].currCol = colId
        console.log("After --> ", cards[foundIndex].currCol)
    }

    return (
        <>
            <button onClick={toggleColumnForm}>Add new column</button>
            <div className='col-wrap'>

                {
                    columns.map((col, index) => { return <Column key={index} props={{ col, removeColumn, columns, addCard }} /> }
                    )
                }
                {columnForm ? <ColumnForm props={{ columns, setColumns, toggleColumnForm }} /> : ""}
            </div>
        </>
    )
}
