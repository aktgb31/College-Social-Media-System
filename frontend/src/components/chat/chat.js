import React from 'react'
import NavbarComponent from '../navbar/navbar'
import Hppost from "../hppost.js/hppost";
import PeopleComponent from '../people/people';
function chat() {
    return (
        <div>
            <NavbarComponent />
            <PeopleComponent author="Navnit Anand"/>
            <PeopleComponent author="Amit Kumar"/>
            <PeopleComponent author="Gopal"/>
        </div>
    )
}

export default chat
//indonesia-idr
//bulgaria -bgn
