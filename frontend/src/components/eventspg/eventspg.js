import React from 'react'
import NavbarComponent from '../navbar/navbar'
import EventComponent from './eventscmp'

function Eventspg() {
    return (
        <div>
            <NavbarComponent/>
            <h1>Events Page</h1>
            <EventComponent name="Tathva 2022" time="22nd July 2022" author="Mihir Gokhale"/>
        </div>
    )
}

export default Eventspg
