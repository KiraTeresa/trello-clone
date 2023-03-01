import { createContext, useContext, useEffect, useState } from "react"

const CardContext = createContext()

function CardContextProviderWrapper(props) {
    const [allCards, setAllCards] = useState([])

    useEffect(() => {
        setCards()
        // localStorage.clear()
    }, [])

    const setCards = () => {
        const getCards = getAllCards()
        setAllCards(getCards)
    }

    const getAllCards = () => {
        const getCards = localStorage.getItem("cards")
        if (getCards === "undefined" || !getCards) {
            return []
        }
        return JSON.parse(getCards)
    }

    const addNewCard = (cardInfo) => {
        const storedCards = getAllCards()
        const updatedList = [...storedCards, cardInfo]
        localStorage.setItem("cards", JSON.stringify(updatedList))
        setCards()
    }

    const deleteCard = (cardId) => {
        const storedCards = getAllCards()
        const updatedList = storedCards.filter((card) => card.id !== cardId)
        localStorage.setItem("cards", JSON.stringify(updatedList))
        setCards()
    }

    const moveCard = (item, monitor, colId) => {
        const getCards = getAllCards()
        const foundCard = getCards.find((card) => card.id === item.id)
        const idx = getCards.indexOf(foundCard)
        const updatedCard = { ...foundCard, currCol: colId }
        const arrStart = getCards.slice(0, idx)
        const arrEnd = getCards.slice(idx + 1)
        const updatedList = arrStart.concat(updatedCard, ...arrEnd)
        localStorage.setItem("cards", JSON.stringify(updatedList))
        setCards()
    }

    const moveItem = (dragIndex, hoverIndex, item, card) => {
        console.table({ dragIndex, item, hoverIndex, card })

        const getCards = getAllCards()
        const newItems = getCards.filter((i, idx) => idx !== dragIndex);
        newItems.splice(hoverIndex, 0, item);
        localStorage.setItem("cards", JSON.stringify(newItems))
        setCards()
    };
    // TODO: still duplicates cards when not supposed to

    const onDrop = (item, monitor, col) => {
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