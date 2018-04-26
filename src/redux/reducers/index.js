import { combineReducers } from 'redux'

const initialState = {
    filters: [{
        color: "#D8D8D8",
        id: 0,
        name: "none"
    }],
    currentFilter: {
        color: "#D8D8D8",
        id: 0,
        name: "none"
    },
    books: [],
    booksToShow: []
}

const filters = (state = initialState, action) => {
    switch(action.type) {
        case 'ADD_FILTER':
            return {
                ...state,
                filters: [...state.filters, action.filter]
            }
        default:
            return state
    }  
}

const books = (state = initialState, action) => {
    switch(action.type) {
        case 'ADD_BOOK':
            return {
                ...state,
                books: [...state.books, action.book]
            }
        case 'FILTER_BOOKS':
            return {
                ...state,
                booksToShow: state.books.filter(book => {
                    // book.category.id === action.filter.id
                    console.log('FILTERING',book)
                    if (action.filter.id !== 0)
                        return book.category.id === action.filter.id
                    return true
                })
            }
        default:
            return state
    }
}

export default combineReducers({
    filters, 
    books
})