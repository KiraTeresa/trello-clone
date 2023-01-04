import './collumn.scss'
import Card from '../Card/Card'

export default function Collumn() {
    return (
        <div className="collumn">
            <h2>Column Title</h2>
            <Card />
            <button>Add Card</button>
        </div>
    )
}