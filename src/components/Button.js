import React from 'react'
import PropTypes from 'prop-types'
const Button = (props) => {

    function onclick(e) {
        console.log(e);
    }

  return (
    <button 
    className='btn' 
    style={{backgroundColor : props.color }} 
    onClick={props.onClick}>
    {props.text}</button>
  )
}

export default Button

Button.defaultProps = {
    color : 'steelblue' ,
}

Button.prototype= {
    color : PropTypes.string , 
    text : PropTypes.string , 
    onClick : PropTypes.func ,
}