import Column from '../Column/Column';
import { useState } from 'react';
import ColumnForm from '../Column/ColumnForm';

export default function Board() {
    const [columns, setColumns] = useState([{ title: "C-One" }])
    const [columnForm, setColumnForm] = useState(false)

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
            <div>

                {
                    columns.map((col, index) => { return <Column key={index} props={{ col, removeColumn }} /> }
                    )
                }
                {columnForm ? <ColumnForm props={{ columns, setColumns, toggleColumnForm }} /> : ""}
            </div>
        </>
    )
}
