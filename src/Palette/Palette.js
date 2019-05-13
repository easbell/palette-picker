import React, {Component} from 'react';
import Color from '../Color/Color';
import PaletteForm from '../PaletteForm/PaletteForm';
import './Palette.css';

export class Palette extends Component {
  constructor() {
    super()
    this.state = {
      color1: {color: '', locked: false},
      color2: {color: '', locked: false},
      color3: {color: '', locked: false},
      color4: {color: '', locked: false},
      color5: {color: '', locked: false},
      showForm: false
    }
  }

  componentDidMount() {
    this.setColors()
  }
  
  setColors = () => {
    Object.keys(this.state).forEach(color => {
      if(color.includes('color') && this.state[color]['locked'] === false) {
        this.setState({ [color]: { color: this.createColors(), locked: false }})
      }
    })
  }

  createColors = () => {
    let digits = '0123456789ABCDEF'
    let hexCode = '#'
    for( let i = 0; i < 6; i++) {
      hexCode += digits[(Math.floor(Math.random() * 16))]
    }
    return hexCode
  }

  renderColors = () => {
    const stateKeys = Object.keys(this.state)
    const colors = stateKeys.splice(0, stateKeys.length - 1)
    return colors.map((color, i) => {
      const hexCode = this.state[color].color
      return <Color key={i} lockColor={this.lockColor} color={hexCode} savePalette={this.savePalette}/>
    })
  }

  lockColor = (color, index) => {
    const stateKeys = Object.keys(this.state)
    const stateColors = stateKeys.splice(0, stateKeys.length - 1)
    stateColors.forEach(stateColor => {
      if(this.state[stateColor].color === color) {
        this.setState({ [stateColor]: { color: color, locked: 
        !this.state[stateColor].locked }})
      }
      }
    )
  }

  savePalette = (bool) => {
    this.setState({ showForm: bool })
  }

  render() {
    const { showForm, colors } = this.state;
    return(
      <div>
        <button onClick={() => this.savePalette(true)}>Save Palette</button>
        <button onClick={this.setColors}>New Palette</button>
        <div className='palette'>
          {this.renderColors()}
        </div>
        {showForm &&
          <PaletteForm savePalette={this.savePalette} colors={colors}/>
        }
      </div>
    )
  }
}

export default Palette