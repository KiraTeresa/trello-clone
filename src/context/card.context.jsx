import { createContext, useContext, useEffect, useState } from "react"

const CardContext = createContext()

function CardContextProviderWrapper(props) {
    const [allCards, setAllCards] = useState([])

    useEffect(() => {
        setCards()
    }, [])

    const setCards = () => {
        const getCards = getAllCards()
        setAllCards(getCards)
    }

    const getAllCards = () => {
        return JSON.parse(localStorage.getItem("cards"))
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
        const filteredList = getCards.filter((card) => card.id !== item.id)
        const foundCard = getCards.find((card) => card.id === item.id)
        const updatedCard = { ...foundCard, currCol: colId }
        const updatedList = [...filteredList, updatedCard]
        localStorage.setItem("cards", JSON.stringify(updatedList))
        setCards()
    }

    const moveItem = (dragIndex, hoverIndex, item, card) => {
        console.table({ dragIndex, item, hoverIndex, card })
        const getCards = getAllCards()
        // const removeDragItem = getCards.filter(c => c.id !== item.id)
        // const item = allCards[dragIndex];
        const newItems = getCards.filter((i, idx) => idx !== dragIndex);
        newItems.splice(hoverIndex, 0, item);
        localStorage.setItem("cards", JSON.stringify(newItems))
        setCards()
        // setAllCards(prevState => {
        //     const newItems = prevState.filter((i, idx) => idx !== dragIndex);
        //     newItems.splice(hoverIndex, 0, item);
        //     return [...newItems];
        // });
    };

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