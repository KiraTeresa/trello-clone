import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

export default function CardForm({ props }) {
    const { cards, setCards, toggleCardForm, column } = props
    const cardId = uuidv4()
    const [data, setData] = useState({ id: cardId, title: "", description: "", currCol: column.id })

    function handleChange(e) {
        const { name, value } = e.target

        setData({ ...data, [name]: value })
    }

    function handleSubmit(e) {
        e.preventDefault()
        console.log(data)
        setCards([...cards, data])
        // setColumn({ ...column, cards: [...column.cards, data] })
        setData({ id: uuidv4(), title: "", description: "", currCol: column.id })
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