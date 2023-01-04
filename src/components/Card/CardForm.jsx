import { useState } from 'react'

export default function CardForm({ cards, setCards }) {
    const [data, setData] = useState({ title: "", description: "" })
    // console.log("CardForm Props: ", addNewCard)

    function handleChange(e) {
        const { name, value } = e.target

        setData({ ...data, [name]: value })
    }

    function handleSubmit(e) {
        e.preventDefault()
        setCards([...cards, data])
        setData({ title: "", description: "" })
    }

    // console.log("Data: ", data)

    return (
        <form className="card-form" onSubmit={handleSubmit}>
            <input type="text" name="title" onChange={handleChange} placeholder="title" value={data.title}></input>
            <input type="text" name="description" onChange={handleChange} placeholder="description" value={data.description}></input>
            <button type="submit">create</button>
        </form>
    )
}