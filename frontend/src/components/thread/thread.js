import React from 'react'
import NavbarComponent from '../navbar/navbar'
import Threadcomponent from './threadcomponent'

function Thread() {
    return (
        <div>
            <NavbarComponent />
            <Threadcomponent name="CP vs DEV" author="Kunal" />
        </div>
    )
}

export default Thread
