import { createContext, useState } from "react"
import cardData from '../data/cards.json'

const CardContext = createContext()

function CardContextProviderWrapper(props) {
    const [allCards, setAllCards] = useState(cardData)

    const addNewCard = (cardInfo) => {
        const newCardList = [...allCards, cardInfo]
        console.log("updated: ", newCardList)
        setAllCards(newCardList)
    }

    const deleteCard = (cardId) => {
        const updatedCards = allCards.filter(card => card.id !== cardId)
        setAllCards([...updatedCards])
    }

    const moveCard = (item, monitor, colId) => {
        // console.log("the item <<<<<>>>>> ", item)
        // console.log("the monitor <<<<<>>>>> ", monitor)
        console.log("ALL...", allCards)
        const foundCard = allCards.find((card) => card.id === item.id)
        console.log("Before: ", foundCard)

        const updatedCard = { ...foundCard, currCol: colId }
        console.log("Updated: ", updatedCard)

        const filteredCards = allCards.filter((card) => card.id !== item.id)
        console.log("After--> ", [...filteredCards, updatedCard])
        // setAllCards([...filteredCards, updatedCard])
        setAllCards(prevState => {
            const newState = prevState.filter((card) => card.id !== item.id)
            return [...newState, updatedCard]
        })
    }
    // TODO: >> newly created cards loose info after beeing moved
    // TODO: >> does not always move the correct card --> changed index

    const moveItem = (dragIndex, hoverIndex) => {
        console.log("drag: ", dragIndex, " + hover: ", hoverIndex)
        const item = allCards[dragIndex];
        setAllCards(prevState => {
            const newItems = prevState.filter((i, idx) => idx !== dragIndex);
            newItems.splice(hoverIndex, 0, item);
            return [...newItems];
        });
    };

    const onDrop = (item, monitor, col) => {
        // console.log("Drop this item ", item)
        // console.log("dropped in col ", col)
        console.log("WHAT --- ", monitor.getInitialClientOffset())
        moveCard(item, monitor, col.id)
    }

    return (
        <CardContext.Provider value={{ allCards, addNewCard, deleteCard, moveCard, moveItem, onDrop }}>
            {props.children}
        </CardContext.Provider>
    )
}

export { CardContextProviderWrapper, CardContext }