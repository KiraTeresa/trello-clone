import Column from '../Column/Column';
import { useEffect, useState } from 'react';
import ColumnForm from '../Column/ColumnForm';
import './board.scss'
import { useCardContext } from '../../context/card.context';
import { useColumnContext } from '../../context/column.context'
import { ColumnType } from '../../constants/types';
import { useDrop } from 'react-dnd'

export default function Board() {
    const { allCards, onDrop } = useCardContext()
    const { allColumns, dropColumn } = useColumnContext()
    // const [allColumns, setAllColumns] = useState([])
    const [columnForm, setColumnForm] = useState(false)

    // useEffect(() => {
    //     setColumns()
    // }, [allCards])

    function clearLocalstorage() {
        localStorage.clear()
    }

    function toggleColumnForm() {
        setColumnForm(!columnForm)
    }

    // function deleteColumn(colId) {
    //     const storedColumns = getAllColumns()
    //     const updatedList = storedColumns.filter((col) => col.id !== colId)
    //     localStorage.setItem("columns", JSON.stringify(updatedList))
    //     setColumns()
    // }

    // const getAllColumns = () => {
    //     const getCol = localStorage.getItem("columns")
    //     if (getCol === "undefined" || !getCol) {
    //         return []
    //     }
    //     return JSON.parse(getCol)
    // }

    // const setColumns = () => {
    //     const getColumns = getAllColumns()
    //     setAllColumns(getColumns)
    // }

    // const addNewColumn = (colInfo) => {
    //     const storedColumns = getAllColumns()
    //     const updatedList = [...storedColumns, colInfo]
    //     localStorage.setItem("columns", JSON.stringify(updatedList))
    //     setColumns()
    // }

    // const moveColumn = (item) => {
    //     const getColumns = getAllColumns()
    //     const foundColumn = getColumns.find((col) => col.id === item.id)
    //     const idx = getColumns.indexOf(foundColumn)
    //     const arrStart = getColumns.slice(0, idx)
    //     const arrEnd = getColumns.slice(idx + 1)
    //     const updatedColumns = arrStart.concat(foundColumn, ...arrEnd)
    //     localStorage.setItem("columns", JSON.stringify(updatedColumns))
    //     setColumns()
    // }

    // const moveColItem = (dragIndex, hoverIndex, item, column) => {
    //     console.table({ dragIndex, item, hoverIndex, column })

    //     const getColumns = getAllColumns()
    //     const newItems = getColumns.filter((i, idx) => idx !== dragIndex);
    //     newItems.splice(hoverIndex, 0, item);
    //     localStorage.setItem("columns", JSON.stringify(newItems))
    //     setColumns()
    // }

    // make board become a drop target for columns:
    const [{ isOver }, drop] = useDrop(() => ({
        accept: ColumnType,
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        }),
        drop: (item, monitor) => {
            dropColumn(item, monitor)
        }
    }))

    return (
        <div>
            <button onClick={toggleColumnForm}>Add new column</button>
            <button onClick={clearLocalstorage} style={{ backgroundColor: "red" }}>delete all</button>
            <div className='col-wrap' ref={drop}>
                {
                    allColumns.map((col) => { return <Column key={col.id} onDrop={onDrop} props={{ col }} /> }
                    )
                }
                {columnForm ? <ColumnForm props={{ toggleColumnForm }} /> : ""}
            </div>
        </div>
    )
}
