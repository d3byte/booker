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
      newBook: {}
    }
  }

  toggleModal = () => {
    const { showModal } = this.state
    this.setState({ showModal: !showModal, newBook: {} })
  }

  changeNewBookInfo = e => {
    const { newBook } = this.state
    const { name, value } = e.target
    this.setState({ newBook: { ...newBook, [name]: value } })
  }

  uploadImage = e => {
    const file = e.target.files[0]
    if (!file) {
      return
    }
    const { newBook } = this.state
    const reader = new FileReader()
    reader.onload = async e => {
      this.setState({ newBook: { ...newBook, image: e.target.result } })  
    }
    reader.readAsDataURL(file)
  }

  render() {
    const { showModal, newBook } = this.state
    return (
      <div className={'home ' + (showModal ? 'modal-is-active' : '')}>
        <img src={logo} className="logo" alt="Logo" />
        <div className="section">
          <span className="title">Library</span>
          <div className="books">
            <div className="book new" onClick={this.toggleModal}>
              <img src={addIcon} alt="Add book" />
            </div>
            <div className="book">
              <div className="category">
                <span>Intelligence</span>
              </div>
              <div className="image">
                <img src={bookExample} alt="Book placeholder" />
              </div>
              <div className="info">
                <span className="name">Вспомнить всё</span>
                <p className="description">
                  Практическое руководство по развитию памяти
                </p>
              </div>
            </div>
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
            </div>
          )
        }
      </div>
    )
  }
}
