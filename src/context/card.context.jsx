import { createContext, useContext, useEffect, useState } from "react"
import cardData from '../data/cards.json'

const CardContext = createContext()

function CardContextProviderWrapper(props) {
    const [allCards, setAllCards] = useState(cardData)

    useEffect(() => {
        console.log("Welcome ", allCards)
        const data = JSON.stringify(allCards)
        localStorage.setItem("cards", data)
    }, [allCards])

    const getAllCards = () => {
        return JSON.parse(localStorage.getItem("cards"))
    }

    const addNewCard = (cardInfo) => {
        const storedCards = getAllCards()
        const updatedList = [...storedCards, cardInfo]
        localStorage.setItem("cards", JSON.stringify(updatedList))
    }

    const deleteCard = (cardId) => {
        const storedCards = getAllCards()
        const updatedList = storedCards.filter((card) => card.id !== cardId)
        localStorage.setItem("cards", JSON.stringify(updatedList))
    }

    const moveCard = (item, monitor, colId) => {
        console.log("Every card there ist ****** ", allCards)
        console.log("The item ", item, " -- new col: ", colId)
        const foundCard = allCards.find((card) => card.id === item.id)
        console.log("found: ", foundCard)
        const updatedCard = { ...foundCard, currCol: colId }
        console.log("updated: ", updatedCard)
        setAllCards(prevState => {
            const newState = prevState.filter((card) => card.id !== item.id)
            return [...newState, updatedCard]
        })
    }
    // TODO: >> newly created cards loose info after beeing moved --> allCards gets resettet
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
        <CardContext.Provider value={{
            getAllCards,
            allCards,
            addNewCard,
            deleteCard,
            moveCard,
            moveItem,
            onDrop
        }}>
            {props.children}
        </CardContext.Provider>
    )
}

function useCardContext() {
    return useContext(CardContext)
}

export { CardContextProviderWrapper, CardContext, useCardContext }