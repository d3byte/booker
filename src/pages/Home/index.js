import React, { Component } from 'react'

import './style.css'
import logo from '../../assets/logo.png'
import addIcon from '../../assets/add.svg'
import bookExample from '../../assets/book-example.png'

export default class Home extends Component {
  render() {
    return (
      <div className="home">
        <img src={logo} className="logo" alt="Logo" />
        <div className="section">
          <span className="title">Library</span>
          <div className="books">
            <div className="book new">
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
      </div>
    )
  }
}
