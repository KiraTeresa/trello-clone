import Column from '../Column/Column';
import { useEffect, useState } from 'react';
import ColumnForm from '../Column/ColumnForm';
import './board.scss'

export default function Board() {
    const [columns, setColumns] = useState([])
    const [columnForm, setColumnForm] = useState(false)

    useEffect(() => {
        console.table(columns)
    }, [columns])

    function toggleColumnForm() {
        setColumnForm(!columnForm)
    }

    function removeColumn(title) {
        const updatedColumns = columns.filter((col) => col.title !== title)
        setColumns(updatedColumns)
    }

    const addCard = (item, monitor) => {
        const containsItem = column.cards.find((card) => card.id === item.id)
        if (!containsItem) {
            const prevCol = "" // TODO: remove card from prev column
            setColumn((previousState) => ({
                ...previousState, // track previous state in order to not overwrite last action
                cards: [...previousState.cards, item],
            }))
            console.log(monitor)
        }
        console.log("Dropped? ", didDrop)
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
