import React, { Component } from 'react'

import './style.css'

export default class Footer extends Component {
  render() {
    return (
      <footer className="fixed">
        <div className="wrapper">
            <div className="filters">
                Filter: 
                <span className="filter none">none</span>
            </div>
            <i className="material-icons">add_circle</i>
        </div>
      </footer>
    )
  }
}
