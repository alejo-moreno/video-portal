import React, {Component} from 'react'
import request from 'superagent'
import md5 from 'js-md5'
import {Row, Input, Icon, Button} from 'react-materialize'
import './Login.css'

class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            error: ''
        }

        this.handleAuthentication = this
            .handleAuthentication
            .bind(this)
        this.handleFormChange = this
            .handleFormChange
            .bind(this)
    }

    handleFormChange(event) {
        const name = event.target.name;
        this.setState({[name]: event.target.value})
    }
    
    handleAuthentication(event) {
        // sends a JSON post body
        event.preventDefault()
        const that = this
        request
            .post('http://localhost:3001/user/auth')
            .send({username: this.state.username, password: md5(this.state.password)})
            .set('Content-Type', 'application/json')
            .end(function (err, res) {
                // Calling the end function will send the request
                if (err) {                    
                    return that.setState({error: err.toString().substring(0, 35)})
                }

                const data = JSON.parse(res.text)
                if (data.sessionId) {
                    that.setSession(data.sessionId)
                    that.props.history.push('/home');
                } else {
                    that.setState({error: data.error})
                }
            })
    }

    setSession(sessionId){        
        localStorage.setItem('session_id',sessionId)        
    }

    logout() {
        localStorage.setItem('session_id')
        localStorage.setItem('expires_at')
        this.props.history.push('/')
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

export default Login