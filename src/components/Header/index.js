import React, {Component} from 'react'
import {Button, Icon} from 'react-materialize'
import {withRouter, Link } from 'react-router-dom'

import './Header.css'

class Header extends Component {

    constructor(props) {
        super(props)
        this.logout = this
            .logout
            .bind(this)
    }

    logout() {
        localStorage.removeItem('session_id')
        this
            .props
            .history
            .push('/')
    }

    render() {
        return (
            <div className="header">
                <Link to="/">
                    <h2>Video Portal
                    </h2>
                </Link>
                <Button waves='light' onClick={this.logout}>Log Out<Icon left>cloud</Icon>
                </Button>
            </div>
        )
    }
}

export default withRouter(Header)