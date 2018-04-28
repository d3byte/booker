import React, { Component } from 'react'
import { connect } from 'react-redux'

import { addFilter, filterBooks } from '../../redux/actions'
import './style.css'

class Footer extends Component {
  constructor() {
    super()
    this.state = {
      chooseFilter: false,
      creatingFilter: false,
      newFilter: {},
      currentFilter: {},
      colorInputNotSupported: false,
      filters: [],
      colors: [
        {
          id: 0,
          value: '#D8D8D8'
        },
        {
          id: 1,
          value: '#b97375'
        },
        {
          id: 2,
          value: '#00FFCD'
        },
        {
          id: 3,
          value: '#E3D3E4'
        },
        {
          id: 4,
          value: '#A1CDF4'
        },
        {
          id: 5,
          value: '#9d8df1'
        },
        {
          id: 6,
          value: '#48A9A6'
        },
        {
          id: 7,
          value: '#D4B483'
        },
        {
          id: 8,
          value: '#FFADC6'
        },
      ],
    }
  }

  toggleFilterChoose = () => {
    const { chooseFilter } = this.state
    this.setState({ chooseFilter: !chooseFilter })
  }

  toggleFilterCreating = () => {
    const { creatingFilter } = this.state
    this.setState({ creatingFilter: !creatingFilter })
  }
  
  selectFilter = filter => {
    this.setState({ chooseFilter: false, currentFilter: filter })
    this.props.filterBooks(filter)
  }

  changeNewFilterInfo = (info, changingColor = false) => {
    const { newFilter } = this.state
    if (changingColor) {
      this.setState({ newFilter: { ...newFilter, color: info } })
      return
    }
    const { value, name } = info.target
    this.setState({ newFilter: { ...newFilter, [name]: value } })
  }

  createFilter = () => {
    const { newFilter, filters } = this.state
    this.setState({ 
      newFilter: { id: filters.length + 1, name: '', color: '#D8D8D8' }, 
      filters: [...filters, newFilter],
      creatingFilter: false
    })
    this.props.addFilter(newFilter)
  }

  componentDidMount = () => {
    const { filters } = this.state
    this.setState({ newFilter: { id: filters.length, name: '', color: '#D8D8D8' } })
  }

  componentWillMount = () => {
    // Checking if input[type="color"] is supported by a user`s browser
    const { filters, currentFilter } = this.props
    this.setState({ filters, currentFilter })
    let input = document.createElement("input")
    input.type = "color"
    if (input.type !== "color") {
      this.setState({ colorInputNotSupported: true })
    }
  }
  

  render() {
    const { 
      chooseFilter, creatingFilter, currentFilter, newFilter, 
      filters, colors, colorInputNotSupported,
    } = this.state
    const reversedFilters = filters.slice(0).reverse()
    return (
      <footer className="fixed">
        <div className="wrapper">
            {
              !creatingFilter ? (
                <div className="filters">
                  Filter:
                  {
                    chooseFilter && reversedFilters.map(filter => filter.id === 0 ? (
                      <span key={0} className="filter none" onClick={() => this.selectFilter(filter)}>
                        none
                      </span>
                    ) : (
                      <div 
                        key={filter.id} 
                        className="filter" 
                        style={{ background: filter.color }}
                        onClick={() => this.selectFilter(filter)}
                      >
                        {filter.name}
                      </div>
                    ))
                  }
                  {
                    !chooseFilter ?
                      currentFilter.id === 0 ? (
                        <span className="filter none active" onClick={this.toggleFilterChoose}>
                          none
                        </span>
                      ) : (
                        <div className="filter" onClick={this.toggleFilterChoose} style={{ background: currentFilter.color }}>
                          {currentFilter.name}
                        </div>
                      )
                    : ''
                  }
                </div>
              ) : (
                <form className="new-filter" onSubmit={e => {
                  e.preventDefault()
                  this.createFilter()
                }}>
                  <div className="left">
                    <i className="material-icons" onClick={this.toggleFilterCreating}>close</i>
                    <input className="line-based" placeholder="Filter name" name="name" onChange={this.changeNewFilterInfo} required/>
                  </div>
                  <div className="right">
                    <div className="colors">
                      {
                        colors.map(color => (
                          <div 
                            key={color.id} 
                            className={'color ' + (newFilter.color === color.value ? 'selected' : '')}
                            style={{ background: color.value }}
                            onClick={e => this.changeNewFilterInfo(color.value, true)}
                          >
                          </div>
                        ))
                      }
                      {
                        !colorInputNotSupported && (
                          <div className="color-input">
                            <input type="color" name="color" onChange={this.changeNewFilterInfo} />
                            <i className="material-icons">change_history</i>
                          </div>
                        )
                      }
                    </div>
                    <button type="submit">
                      <i className="material-icons">done</i>
                    </button>
                  </div>
                </form>
              )
            }
            {
              !creatingFilter && <i onClick={this.toggleFilterCreating} className="material-icons">add_circle</i>
            }
        </div>
      </footer>
    )
  }
}

const mapStateToProps = state => ({
  filters: state.filters,
  currentFilter: state.currentFilter
})

const mapDispatchToProps = dispatch => ({
  addFilter: filter => dispatch(addFilter(filter)),
  filterBooks: filter => dispatch(filterBooks(filter))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer)