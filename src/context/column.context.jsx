import { createContext, useContext, useEffect, useState } from "react";

const ColumnContext = createContext()

function ColumnContextProviderWrapper(props) {
    const [allColumns, setAllColumns] = useState([])

    useEffect(() => {
        setColumns()
    }, [])

    const setColumns = () => {
        const getColumns = getAllColumns()
        setAllColumns(getColumns)
    }

    const getAllColumns = () => {
        const getColumns = localStorage.getItem("columns")
        if (getColumns === "undefined" || !getColumns) {
            return []
        }
        return JSON.parse(getColumns)
    }

    const addNewColumn = (colInfo) => {
        const storedColumns = getAllColumns()

        const updatedList = [...storedColumns, colInfo]
        localStorage.setItem("columns", JSON.stringify(updatedList))
        setColumns()
    }

    function deleteColumn(colId) {
        const storedColumns = getAllColumns()
        const updatedList = storedColumns.filter((col) => col.id !== colId)
        localStorage.setItem("columns", JSON.stringify(updatedList))
        setColumns()
    }

    const dropColumn = (item) => {
        const getColumns = getAllColumns()
        const foundColumn = getColumns.find((col) => col.id === item.id)
        const idx = getColumns.indexOf(foundColumn)
        const arrStart = getColumns.slice(0, idx)
        const arrEnd = getColumns.slice(idx + 1)
        const updatedColumns = arrStart.concat(foundColumn, ...arrEnd)
        localStorage.setItem("columns", JSON.stringify(updatedColumns))
        setColumns()
    }

    const moveColItem = (dragIndex, hoverIndex, item, column) => {
        console.table({ dragIndex, item, hoverIndex, column })

        const getColumns = getAllColumns()
        const newItems = getColumns.filter((i, idx) => idx !== dragIndex);
        newItems.splice(hoverIndex, 0, item);
        localStorage.setItem("columns", JSON.stringify(newItems))
        setColumns()
    }

    return (
        <ColumnContext.Provider value={{
            allColumns,
            getAllColumns,
            addNewColumn,
            deleteColumn,
            dropColumn,
            moveColItem
        }}>
            {props.children}
        </ColumnContext.Provider>
    )
}

function useColumnContext() {
    return useContext(ColumnContext)
}

export { ColumnContextProviderWrapper, ColumnContext, useColumnContext }