import React, {Component} from 'react'
import request from 'superagent'
import VideoCard from '../VideoCard'
import {Row} from 'react-materialize'
import { withRouter } from 'react-router'

class Home extends Component {
    constructor() {
        super()
        this.state = {
            videos: []
        }        
    }

    componentDidMount() {
        this.videoList()
    }

    videoList() {
        const that = this
        request
            .get('http://localhost:3001/videos')
            .query({
                sessionId: localStorage.getItem('session_id'),
                limit: 12
            }) // query string
            .end(function (err, res) {
                if (err) 
                    console.error(err)
                const data = JSON.parse(res.text).data                
                localStorage.setItem('videos',JSON.stringify(data))
                that.setState({videos: data})
            });
    }

    render() {
        const {videos} = this.state
        return (
            <Row>
                {videos.map((video) => <VideoCard key={video._id} video={video} sCols={12} mCols={4} lCols={3} />)}
            </Row>
        )
    }
}

export default withRouter(Home)
