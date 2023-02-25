import { createContext, useState } from "react"
import cardData from '../data/cards.json'

const CardContext = createContext()

function CardContextProviderWrapper(props) {
    const [allCards, setAllCards] = useState(cardData)

    const addNewCard = (cardInfo) => {
        setAllCards([...allCards, cardInfo])
    }

    function deleteCard(cardId) {
        console.log("Cards before: ", allCards)
        const updatedCards = allCards.filter(card => card.id !== cardId)
        console.log("Cards after --> ", updatedCards)
        setAllCards([...updatedCards])
        console.log("Card removed")
    }

    return (
        <CardContext.Provider value={{ allCards, addNewCard, deleteCard }}>
            {props.children}
        </CardContext.Provider>
    )
}

export { CardContextProviderWrapper, CardContext }