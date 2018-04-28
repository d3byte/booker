export const addFilter = filter => ({
    type: 'ADD_FILTER',
    filter
})

export const addBook = book => ({
    type: 'ADD_BOOK',
    book
})

export const filterBooks = filter => ({
    type: 'FILTER_BOOKS',
    filter
})

export const refreshState = state => ({
    type: 'FILTER_BOOKS',
    state
})