import Column from '../Column/Column';
import { useEffect, useState } from 'react';
import ColumnForm from '../Column/ColumnForm';
import './board.scss'
import Columns from '../../data/columns.json'

export default function Board() {
    const [columns, setColumns] = useState(Columns)
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

    return (
        <>
            <button onClick={toggleColumnForm}>Add new column</button>
            <div className='col-wrap'>

                {
                    columns.map((col, index) => { return <Column key={index} props={{ col, removeColumn, columns }} /> }
                    )
                }
                {columnForm ? <ColumnForm props={{ columns, setColumns, toggleColumnForm }} /> : ""}
            </div>
        </>
    )
}
