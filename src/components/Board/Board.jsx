import Column from '../Column/Column';
import { useEffect, useState } from 'react';
import ColumnForm from '../Column/ColumnForm';
import './board.scss'
import colData from '../../data/columns.json'
import { useCardContext } from '../../context/card.context';

export default function Board() {
    const { getAllCards, allCards, onDrop } = useCardContext()
    const [columns, setColumns] = useState(colData)
    const [columnForm, setColumnForm] = useState(false)

    useEffect(() => {
        console.log(">>> useEffect fired <<<")
        console.log("--- got it from local storage: ", getAllCards())
    }, [allCards])

    function toggleColumnForm() {
        setColumnForm(!columnForm)
    }

    function removeColumn(colId) {
        const updatedColumns = columns.filter((col) => col.id !== colId)
        setColumns(updatedColumns)
    }



    return (
        <div>
            <button onClick={toggleColumnForm}>Add new column</button>
            <div className='col-wrap'>

                {
                    columns.map((col) => { return <Column key={col.id} onDrop={onDrop} props={{ col, removeColumn }} /> }
                    )
                }
                {columnForm ? <ColumnForm props={{ columns, setColumns, toggleColumnForm }} /> : ""}
            </div>
        </div>
    )
}
