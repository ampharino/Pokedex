import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import styles from './Home.scss'

class Home extends Component {

    render() {
        return(
            <div className="Home">
                <h1>Pokedex with information for the original 151 Pokemon</h1>
            </div>
        )
    }
}

export default Home
