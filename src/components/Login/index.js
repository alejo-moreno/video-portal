import React, { Component } from 'react'
import md5 from 'js-md5'
import { Row, Input, Icon, Button } from 'react-materialize'
import { withRouter } from 'react-router-dom'
import { authUser } from '../../apiClient'
import './Login.css'

class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            error: ''
        }

        //bind `this` to methods 
        this.handleAuthentication = this
            .handleAuthentication
            .bind(this)
        this.handleFormChange = this
            .handleFormChange
            .bind(this)
    }

    //Sets username and password inputs to state
    handleFormChange(event) {
        const name = event.target.name;
        this.setState({ [name]: event.target.value })
    }

    //Authenticate users through username and MD5 encrypted password 
    handleAuthentication(event) {
        event.preventDefault()
        const that = this
        authUser(this.state.username, md5(this.state.password), function (err, res) {
            if (err)
                return that.setState({ error: err.toString().substring(0, 35) })

            if (res.sessionId) {
                that.setSession(res.sessionId)
                that.props.history.push('/home');
            } else {
                that.setState({ error: res.error })
            }
        })
    }

    //Set session id to localStorage for later use
    setSession(sessionId) {
        localStorage.setItem('session_id', sessionId)
    }    

    render() {
        return (
            <Row className="login z-depth-5">
                <form action="/user/auth" onSubmit={this.handleAuthentication}>
                    <Input
                        type="text"
                        s={12}
                        label="Username"
                        name="username"
                        value={this.state.username}
                        onChange={this.handleFormChange}>
                        <Icon>account_circle</Icon>
                    </Input>
                    <Input
                        s={12}
                        type="password"
                        label="Password"
                        name="password"
                        error={this.state.error}
                        value={this.state.password}
                        onChange={this.handleFormChange}>
                        <Icon>lock</Icon>
                    </Input>
                    <Button className="login-button" type="submit" waves='light'>Log In<Icon right>send</Icon>
                    </Button>
                </form>
            </Row>
        )
    }
}

export default withRouter(Login)