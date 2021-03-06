import React from 'react'
import './DisplayPalette.css'
import PropTypes from 'prop-types'

export const DisplayPalette = ({palette}) => {
    const { palette_name, color_1, color_2, color_3, color_4, color_5 } = palette
    
    return(
      <div className='palette-card'>
        <h3 className='palette-name'>
          {palette_name}
        </h3>
        <div className='display-colors'>
          <div style={{backgroundColor: color_1}} className='display-color'></div>
          <div style={{backgroundColor: color_2}} className='display-color'></div>
          <div style={{backgroundColor: color_3}} className='display-color'></div>
          <div style={{backgroundColor: color_4}} className='display-color'></div>
          <div style={{backgroundColor: color_5}} className='display-color'></div>
        </div>
      </div>
    )
}

DisplayPalette.propTypes = {
  palette: PropTypes.object,
}

export default DisplayPalette

