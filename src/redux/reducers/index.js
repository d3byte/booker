import CacheManager from '../../cache'

const cache = new CacheManager()

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

let newState

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'ADD_FILTER':
            newState = {
                ...state,
                filters: [...state.filters, action.filter]
            }
            cache.writeData('state', newState)
            return newState
        case 'ADD_BOOK':
            newState = {
                ...state,
                books: [...state.books, action.book]
            }
            cache.writeData('state', newState)
            return newState
        case 'FILTER_BOOKS':
            console.log(action)
            newState = {
                ...state,
                booksToShow: state.books.filter(book => {
                    // book.category.id === action.filter.id
                    if (action.filter.id !== 0)
                        return book.category.id === action.filter.id
                    return true
                }),
                currentFilter: action.filter
            }
            cache.writeData('state', newState)
            return newState
        case 'REFRESH_STATE':
            return action.state
        default:
            return state
    }
}

export default reducer