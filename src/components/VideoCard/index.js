import React, {Component} from 'react'
import {Col} from 'react-materialize'
import {Link} from 'react-router-dom'
import './VideoCard.css'

class VideoCard extends Component {

    render() {        
        const {video} = this.props        
        let description = video.description.length > 70 ? video.description.substring(0,70)+' [...Read More]' : video.description
        return (
            <Col s={12} m={4} l={3}>
                <div className="video-card z-depth-4">
                    <Link to={{ pathname: '/video', query: { id: video._id } }} className="video-title">
                        <p>{video.name}</p>
                    </Link>
                    <video className="responsive-video" controls>
                        <source src={video.url} type="video/mp4"/>
                    </video>
                    <div className="video-desc">
                        <p>{description}</p>
                    </div>
                </div>
            </Col>
        )
    }
}

export default VideoCard
