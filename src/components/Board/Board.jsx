import Column from '../Column/Column';
import { useEffect, useState } from 'react';
import ColumnForm from '../Column/ColumnForm';
import './board.scss'
import { useCardContext } from '../../context/card.context';

export default function Board() {
    const { allCards, onDrop } = useCardContext()
    const [allColumns, setAllColumns] = useState([])
    const [columnForm, setColumnForm] = useState(false)

    useEffect(() => {
        setColumns()
    }, [allCards])

    function toggleColumnForm() {
        setColumnForm(!columnForm)
    }

    function deleteColumn(colId) {
        const storedColumns = getAllColumns()
        const updatedList = storedColumns.filter((col) => col.id !== colId)
        localStorage.setItem("columns", JSON.stringify(updatedList))
        setColumns()
    }

    const getAllColumns = () => {
        const getCol = localStorage.getItem("columns")
        if (getCol === "undefined") {
            return []
        }
        return JSON.parse(getCol)
    }

    const setColumns = () => {
        const getColumns = getAllColumns()
        setAllColumns(getColumns)
    }

    const addNewColumn = (colInfo) => {
        const storedColumns = getAllColumns()
        const updatedList = [...storedColumns, colInfo]
        localStorage.setItem("columns", JSON.stringify(updatedList))
        setColumns()
    }

    return (
        <div>
            <button onClick={toggleColumnForm}>Add new column</button>
            <div className='col-wrap'>

                {
                    allColumns.map((col) => { return <Column key={col.id} onDrop={onDrop} props={{ col, deleteColumn }} /> }
                    )
                }
                {columnForm ? <ColumnForm props={{ addNewColumn, toggleColumnForm }} /> : ""}
            </div>
        </div>
    )
}
