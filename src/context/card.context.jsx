import { createContext, useState } from "react"
import cardData from '../data/cards.json'

const CardContext = createContext()

function CardContextProviderWrapper(props) {
    const [allCards, setAllCards] = useState(cardData)

    const addNewCard = (cardInfo) => {
        setAllCards([...allCards, cardInfo])
    }

    return (
        <CardContext.Provider value={{ addNewCard, allCards }}>
            {props.children}
        </CardContext.Provider>
    )
}

export { CardContextProviderWrapper, CardContext }