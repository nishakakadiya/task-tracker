import React from 'react'
import Button from './Button'
import {useLocation} from 'react-router-dom'

const Header = ({title, onAdd, showAdd}) => {
    const Location = useLocation()
    return (
        <header className='header'>
           <h1>{title}</h1>
           {Location.pathname === "/" && <Button 
            color = {showAdd ? 'red' : 'green'} 
            onClick = {onAdd} text = {showAdd ? 'Close' : 'Add'}
            />}
        </header>
    )
}
Header.defaultProps = {
    title: 'Task Tracker',
}
export default Header
