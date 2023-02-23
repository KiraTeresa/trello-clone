import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

export default function CardForm({ props }) {
    const cardId = uuidv4()
    const [data, setData] = useState({ id: cardId, title: "", description: "" })
    const { cards, setCards, toggleCardForm } = props

    function handleChange(e) {
        const { name, value } = e.target

        setData({ ...data, [name]: value })
    }

    function handleSubmit(e) {
        e.preventDefault()
        setCards([...cards, data])
        setData({ title: "", description: "" })
        toggleCardForm()
    }

    return (
        <form className="card-form" onSubmit={handleSubmit}>
            <input type="text" name="title" onChange={handleChange} placeholder="title" value={data.title}></input>
            <input type="text" name="description" onChange={handleChange} placeholder="description" value={data.description}></input>
            <button type="submit">create</button>
        </form>
    )
}