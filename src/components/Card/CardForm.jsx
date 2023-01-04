import { useState } from 'react'

export default function CardForm({ props }) {
    const [data, setData] = useState({ title: "", description: "" })

    function handleChange(e) {
        console.log("E: ", e)
        const { name, value } = e.target

        setData({ ...data, [name]: value })
    }

    console.log("Data: ", data)

    return (
        <form className="card-form">
            <input type="text" name="title" onChange={handleChange} placeholder="title" value={data.title}></input>
            <input type="text" name="description" onChange={handleChange} placeholder="description" value={data.description}></input>
            <button type="submit">create</button>
        </form>
    )
}