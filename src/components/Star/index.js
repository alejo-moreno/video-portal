import React, {Component} from 'react'
import {Icon} from 'react-materialize'
import request from 'superagent'

class Star extends Component {
    constructor(){
        super()
        this.state = {
            text : 'star_border',
            videoId: ''
        }
        this.handleEvent = this.handleEvent.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    handleEvent(event){        
        this.setState({ text: event.type === 'mouseenter' ? 'star' : 'star_border' })
    }

    handleClick(){
        request.post('http://localhost:3001/video/ratings')
            .query({sessionId: localStorage.getItem('session_id')})
            .send({videoId: this.props.videoId, rating: this.props.rating})
            .set('Content-Type', 'application/json')
            .end(function (err, res) {
                // Calling the end function will send the request
                if (err) {                    
                    console.error(err)
                }
                console.log(res)                
            })
    }

    render() {
        return (
            <div className="star-wrapper" onMouseEnter={this.handleEvent} onMouseLeave={this.handleEvent} onClick={this.handleClick}>
                <Icon className="star">{this.state.text}</Icon>
            </div>
        )
    }
}

export default Star