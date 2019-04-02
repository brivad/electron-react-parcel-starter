import React, { Component } from 'react'

import logo from './logo.svg'
import './index.scss'

import SuperList from './SuperList'

// import { ipcRenderer } from 'electron' (brekka con parcel)
const { ipcRenderer } = window.require('electron')

export default class App extends Component {
  state = {
    items: [
      { id: 1, name: 'mario' },
      { id: 2, name: 'ciccio' },
      { id: 3, name: 'eva' }
    ]
  }

  render() {
    return (
      <div className="App">
        <button
          onClick={() => {
            ipcRenderer.send('action:go', this.state.items)
            ipcRenderer.on('items:update', (event, newItems) => {
              this.setState({ items: newItems })
            })
          }}
        >
          Go!
        </button>
        <img src={logo} />
        <SuperList items={this.state.items} />
      </div>
    )
  }
}
