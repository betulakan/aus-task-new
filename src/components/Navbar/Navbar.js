import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { SidebarData } from './SidebarData'
import './Navbar.css'
import SelectComponent from '../SelectComponent';

function Navbar() {
  //const [sidebar, setSidebar] = useState(false)

  //const showSidebar = () => setSidebar(!sidebar)
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <>
      <nav className='nav-menu active'>
        <ul className='nav-menu-items'>
          <li className='navbar-toggle'></li>
          {SidebarData.map((item, index) => {
            return (
              <li key={index} className={item.className}>
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </>
  )
}

export default Navbar
