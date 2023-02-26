import Column from '../Column/Column';
import { useEffect, useState } from 'react';
import ColumnForm from '../Column/ColumnForm';
import './board.scss'
import { useCardContext } from '../../context/card.context';
import { ColumnType } from '../../constants/types';
import { useDrop } from 'react-dnd'

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
        if (getCol === "undefined" || !getCol) {
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

    const moveColumn = (item) => {
        // console.log("DROP IT >>> ", item)
        // console.log("DragIndex: ", dragIndex)
        // console.log("HoverIndex: ", hoverIndex)
        // console.log("col: ", col)
        // console.log("ALL ", allColumns)
        // console.table(dragIndex, hoverIndex)
        const getColumns = getAllColumns()
        const updatedColumns = getColumns.filter(col => col.id !== item.id)
        updatedColumns.push(item)
        // console.log(clearColumns)
        // console.log(newColumnList)
        localStorage.setItem("columns", JSON.stringify(updatedColumns))
        // const newItems = getColumns.filter((i, idx) => idx !== dragIndex);
        // newItems.splice(hoverIndex, 0, item);
        // localStorage.setItem("columns", JSON.stringify(newItems))
        setColumns()
    }
    // TODO: logic puts moved col always at the end --> implement dragIndex and hoverIndex

    // make board become a drop target for columns:
    const [{ isOver }, drop] = useDrop(() => ({
        accept: ColumnType,
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        }),
        drop: (item, monitor) => {
            moveColumn(item)
        }
    }))

    return (
        <div>
            <button onClick={toggleColumnForm}>Add new column</button>
            <div className='col-wrap' ref={drop}>
                {
                    allColumns.map((col) => { return <Column key={col?.id} onDrop={onDrop} props={{ col, deleteColumn, allColumns, moveColumn }} /> }
                    )
                }
                {columnForm ? <ColumnForm props={{ addNewColumn, toggleColumnForm }} /> : ""}
            </div>
        </div>
    )
}
