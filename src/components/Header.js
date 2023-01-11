import React from 'react'
import Button  from './Button'
const Header = (props) => {
    function onClick(e) {
        console.log('Clicked');
    }
  return (
    <header className='header'>
        <h1>
            {props.title}
        </h1>
        {props.showAdd ? <Button color="green" text='Close' onClick ={props.onAdd}/> : 
        <Button color="blue" text='Add' onClick ={props.onAdd}/>  }
    </header>
  )
}
Header.defaultProps = {
    title :"Task tracker"
}

export default Header

