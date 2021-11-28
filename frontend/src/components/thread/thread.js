import React from 'react'
import NavbarComponent from '../navbar/navbar'
import Threadcomponent from './threadcomponent'
import {Link} from 'react-router-dom'
import { Button } from 'react-bootstrap'
function Thread() {
    return (
        <div>
            <NavbarComponent />
            <Link to="/createthread"><Button variant="primary">Create Thread</Button> </Link>
            <Threadcomponent name="CP vs DEV" author="Kunal" />
        </div>
    )
}

export default Thread
