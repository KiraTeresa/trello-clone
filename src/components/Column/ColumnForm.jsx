import { useState } from "react"

export default function ColumnForm({ props }) {
    const [data, setData] = useState({ title: "" })
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