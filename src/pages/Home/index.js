import React, { Component } from 'react'

import './style.css'
import Footer from '../../components/Footer'
import logo from '../../assets/logo.png'
import addIcon from '../../assets/add.svg'
import bookExample from '../../assets/book-example.png'

export default class Home extends Component {
  constructor() {
    super()
    this.state = {
      showModal: false,
      newBook: {
        name: '',
        description: '',
        image: '',
        category: {}
      },
      newBookIsValid: false,
      books: [],
      chooseFilter: true,
      filters: [
        {
          id: 0,
          name: 'Regular',
          color: '#D8D8D8'
        },
      ],
    }
  }

  toggleModal = () => {
    const { showModal } = this.state
    this.setState({ 
      showModal: !showModal, 
      newBook: {
        name: '',
        description: '',
        image: ''
      }
    })
  }

  changeNewBookInfo = e => {
    const { newBook } = this.state
    const { name, value } = e.target
    let changedNewBook = { ...newBook, [name]: value }
    this.setState({ newBook: changedNewBook })
    this.validateNewBook(changedNewBook)
  }

  validateNewBook = book => {
    let newBookIsValid = true
    for (let key in book) {
      if (book[key] === '' && book[key] !== {})
        newBookIsValid = false
    }
    this.setState({ newBookIsValid })
  }

  uploadImage = e => {
    const file = e.target.files[0]
    if (!file) {
      return
    }
    const { newBook } = this.state
    const reader = new FileReader()
    reader.onload = async e => {
      const changedNewBook = { ...newBook, image: e.target.result }
      this.setState({ newBook: changedNewBook })  
      this.validateNewBook(changedNewBook)
    }
    reader.readAsDataURL(file)
  }
  
  startSelectingFilters = () => {
    const { chooseFilter } = this.state
    this.setState({ chooseFilter: !chooseFilter })
  }
  
  selectFilter = filter => {
    const { newBook } = this.state
    const changedNewBook = { ...newBook, category: filter }
    this.setState({ newBook: changedNewBook, chooseFilter: false })  
    this.validateNewBook(changedNewBook)
  }

  addNewBook = () => {
    const { newBook, newBookIsValid, books } = this.state
    if (newBookIsValid) {
      // Change Redux state here
      this.setState({ 
        books: [...books, { ...newBook, id: books.length }], 
        newBook: {
          name: '',
          description: '',
          image: ''
        },
        newBookIsValid: false,
        showModal: false, 
      })
    }
  }


  render() {
    const { showModal, newBook, newBookIsValid, books, filters, chooseFilter } = this.state
    return (
      <div className={'home ' + (showModal ? 'modal-is-active' : '')}>
        <img src={logo} className="logo" alt="Logo" />
        <div className="section">
          <span className="title">Library</span>
          <div className="books">
            <div className="book new" onClick={this.toggleModal}>
              <img src={addIcon} alt="Add book" />
            </div>
            {
              books.map(book => (
                <div key={book.id} className="book">
                  <div className="category" style={{ background: book.category.color }}>
                    <span>{book.category.name}</span>
                  </div>
                  <div className="image">
                    <img src={book.image} alt="Book placeholder" />
                  </div>
                  <div className="info">
                    <span className="name">{book.name}</span>
                    <p className="description">
                      {book.description}
                    </p>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
        <Footer/>
        {
          showModal && <div className="modal-overlay" onClick={this.toggleModal}></div>
        }
        {
          showModal && (
            <div className="modal">
              <div className="modal-header">
                <span className="title">New book</span>
                <i className="material-icons" onClick={this.toggleModal}>close</i>
              </div>
              <div className="modal-body">
                <div className="left">
                  <div className="form-group">
                    <label>Name</label>
                    <input 
                      name="name"
                      className="line-based" placeholder="Alice in Wonderland" 
                      onChange={this.changeNewBookInfo} />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea 
                      name="description"
                      placeholder="A great story..."
                      onChange={this.changeNewBookInfo}
                    />
                  </div>
                </div>
                <div className="right">
                  <div className="form-group">
                    <label>Image</label>
                    <div className="image-upload">
                      <input type="file" onChange={this.uploadImage} name="image" accept="image/*" />
                      {
                        newBook.image ? 
                          <img src={newBook.image} alt="book-image" /> :
                          <i className="material-icons">file_upload</i>
                      }
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <div className="filters">
                
                  {
                    chooseFilter ? filters.map(filter => (
                      <div 
                        key={filter.id} 
                        className="filter" 
                        style={{ background: filter.color }}
                        onClick={() => this.selectFilter(filter)}
                      >
                        {filter.name}
                      </div>
                    )) : (
                      <div 
                        className="filter" 
                        style={{ background: newBook.category.color }}
                        onClick={this.startSelectingFilters}
                      >
                        {newBook.category.name}
                      </div>
                    )
                  }
                </div>
                <button onClick={this.addNewBook} className={'flat ' + (newBookIsValid ? 'blue' : '')}>Add</button>
              </div>
            </div>
          )
        }
      </div>
    )
  }
}
