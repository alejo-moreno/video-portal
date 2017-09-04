import React, {Component} from 'react'
import {Button, Icon} from 'react-materialize'
import {withRouter, Link} from 'react-router-dom'
import {logoutUser} from '../../apiClient'

import './Header.css'

class Header extends Component {

    constructor(props) {
        super(props)
        this.logout = this
            .logout
            .bind(this)
    }

    logout() {
        const self = this
        logoutUser(localStorage.getItem('session_id'), function (err, res) {
            if(err)
                return console.error(err)
                console.log(res)
            localStorage.removeItem('session_id')
            self.props.history.push('/')
        })        
    }

    render() {
        return (
            <div className="header">
                <Link to="/">
                    <h2>Video Portal
                    </h2>
                </Link>{localStorage.getItem('session_id') !== null
                    ? <Button waves='light' onClick={this.logout}>Log Out<Icon left>exit_to_app</Icon>
                        </Button>
                    : ''
}

            </div>
        )
    }
}

export default withRouter(Header)