import Column from '../Column/Column';
import { useEffect, useState, useContext } from 'react';
import ColumnForm from '../Column/ColumnForm';
import './board.scss'
import colData from '../../data/columns.json'
import { CardContext } from '../../context/card.context';

export default function Board() {
    const { allCards, onDrop } = useContext(CardContext)
    const [columns, setColumns] = useState(colData)
    const [columnForm, setColumnForm] = useState(false)

    useEffect(() => {
        console.log(">>> useEffect fired <<<")
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
                    columns.map((col, index) => { return <Column key={index} onDrop={onDrop} props={{ col, removeColumn }} /> }
                    )
                }
                {columnForm ? <ColumnForm props={{ columns, setColumns, toggleColumnForm }} /> : ""}
            </div>
        </div>
    )
}
