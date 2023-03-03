import { useState } from "react"
import { v4 as uuidv4 } from 'uuid'
import { useColumnContext } from '../../context/column.context'

export default function ColumnForm({ props }) {
    const colId = uuidv4()
    const [data, setData] = useState({ id: colId, title: "" })
    const { addNewColumn } = useColumnContext()
    const { toggleColumnForm } = props

    function handleChange(e) {
        const { name, value } = e.target

        setData({ ...data, [name]: value })
    }

    function handleSubmit(e) {
        e.preventDefault()
        addNewColumn(data)
        setData({ title: "" })
        toggleColumnForm()
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="title" onChange={handleChange}></input>
            <button type="submit">create</button>
        </form>
    )
}