import { createContext, useContext, useEffect, useState } from "react"
import { useColumnContext } from "./column.context"

const CardContext = createContext()

function CardContextProviderWrapper(props) {
    const [allCards, setAllCards] = useState([])
    const { allColumns, setColumns } = useColumnContext()

    useEffect(() => {
        setCards()
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

        // add new card to local card storage:
        const updatedCardList = [...storedCards, cardInfo]
        localStorage.setItem("cards", JSON.stringify(updatedCardList))
        setCards()

        // add card to its current column:
        const foundColumn = allColumns.find(col => col.id === cardInfo.currCol)
        const idx = allColumns.indexOf(foundColumn)
        const copyColCardArr = foundColumn.cards.slice()
        copyColCardArr.push(cardInfo.id)
        const updatedColumn = { ...foundColumn, cards: [...copyColCardArr] }
        const arrStart = allColumns.slice(0, idx)
        const arrEnd = allColumns.slice(idx + 1)
        const updatedColList = arrStart.concat(updatedColumn, ...arrEnd)
        localStorage.setItem("columns", JSON.stringify(updatedColList))
        setColumns()
    }

    const deleteCard = (cardInfo) => {
        const storedCards = getAllCards()

        // delete card from local card storage:
        const updatedList = storedCards.filter((card) => card.id !== cardInfo.id)
        localStorage.setItem("cards", JSON.stringify(updatedList))
        setCards()

        // remove card from its current column:
        const foundColumn = allColumns.find(col => col.id === cardInfo.currCol)
        const idx = allColumns.indexOf(foundColumn)
        const updatedColCardArr = foundColumn.cards.filter(card => card !== cardInfo.id)
        const updatedColumn = { ...foundColumn, cards: [...updatedColCardArr] }
        const arrStart = allColumns.slice(0, idx)
        const arrEnd = allColumns.slice(idx + 1)
        const updatedColList = arrStart.concat(updatedColumn, ...arrEnd)
        localStorage.setItem("columns", JSON.stringify(updatedColList))
        setColumns()
    }

    const dropCard = (item, monitor, column) => {

        // update local card storage:
        const getCards = getAllCards()
        const foundCard = getCards.find((card) => card.id === item.id)
        const cardIdx = getCards.indexOf(foundCard)
        const updatedCard = { ...foundCard, currCol: column.id }
        const arrStart = getCards.slice(0, cardIdx)
        const arrEnd = getCards.slice(cardIdx + 1)
        const updatedCardList = arrStart.concat(updatedCard, ...arrEnd)
        localStorage.setItem("cards", JSON.stringify(updatedCardList))
        setCards()

        // update local column cards arr:
        // TODO: currently not updating localstorage correctly with new colCardArrays
        // remove from current column:
        const foundCurrCol = allColumns.find(col => col.id === item.currCol)
        console.log("#### ", foundCurrCol)
        const colIdx = allColumns.indexOf(foundCurrCol)
        const updatedColCardArr = foundCurrCol.cards.filter(card => card !== item.id)
        const updatedColumn = { ...foundCurrCol, cards: [...updatedColCardArr] }
        const colArrStart = allColumns.slice(0, colIdx)
        const colArrEnd = allColumns.slice(colIdx + 1)
        const updatedColList = colArrStart.concat(updatedColumn, ...colArrEnd)
        console.log(">>>> ", updatedColList)

        // add to new column:
        const foundNewCol = updatedColList.find(col => col.id === column.id)
        const newColIdx = updatedColList.indexOf(foundNewCol)
        foundNewCol.cards.push(item.id)
        const updatedNewColumn = { ...foundNewCol }
        const newColArrStart = updatedColList.slice(0, newColIdx)
        const newColArrEnd = updatedColList.slice(newColIdx + 1)
        const updatedNewColList = newColArrStart.concat(updatedNewColumn, ...newColArrEnd)
        console.log(">>>> ", updatedNewColList, " <<<<")
        localStorage.setItem("columns", JSON.stringify(updatedNewColList))
        setColumns()
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

    return (
        <CardContext.Provider value={{
            allCards,
            getAllCards,
            addNewCard,
            deleteCard,
            dropCard,
            moveItem
        }}>
            {props.children}
        </CardContext.Provider>
    )
}

function useCardContext() {
    return useContext(CardContext)
}

export { CardContextProviderWrapper, CardContext, useCardContext }