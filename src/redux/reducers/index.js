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

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'ADD_FILTER':
            return {
                ...state,
                filters: [...state.filters, action.filter]
            }
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
                    if (action.filter.id !== 0)
                        return book.category.id === action.filter.id
                    return true
                })
            }
        case 'REFRESH_STATE':
            return action.state
        default:
            return state
    }
}

export default reducer