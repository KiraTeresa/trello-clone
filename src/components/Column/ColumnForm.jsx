import { useState } from "react"
import { v4 as uuidv4 } from 'uuid'

export default function ColumnForm({ props }) {
    const colId = uuidv4()
    const [data, setData] = useState({ id: colId, title: "", cards: [] })
    const { columns, setColumns, toggleColumnForm } = props

    function handleChange(e) {
        const { name, value } = e.target

        setData({ ...data, [name]: value })
    }

    function handleSubmit(e) {
        e.preventDefault()
        setColumns([...columns, data])
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