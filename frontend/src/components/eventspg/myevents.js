import React from 'react'
import NavbarComponent from '../navbar/navbar'
import EventComponent from './eventscmp'
import MyEventComponent from './myeventcomponent'
function Myevents() {
    return (
        <div>
            <NavbarComponent/>
            <h1>My Events</h1>
            <MyEventComponent name="Tathva 2022" time="22nd July 2022" author="Mihir Gokhale"/>
        </div>
    )
}

export default Myevents
