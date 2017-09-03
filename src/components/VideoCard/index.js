import React, {Component} from 'react'
import {Col} from 'react-materialize'
import {Link} from 'react-router-dom'
import './VideoCard.css'

class VideoCard extends Component {

      constructor(props) {
        super(props)
        this.handleVideoChange = this.handleVideoChange.bind(this);               
      }

      handleVideoChange(e){          
          this.props.onSelectedVideo(this.props.video._id)
      }


    render() {                
        const {video} = this.props        
        let description = video.description.length > 70 ? video.description.substring(0,70)+' [...Read More]' : video.description
        return (             
                <Col s={this.props.sCols} m={this.props.mCols} l={this.props.lCols}>
                    <div className="video-card z-depth-4">
                        <Link onClick={this.handleVideoChange} to={`/video/${video._id}`} className="video-title">
                            <p>{video.name}</p>
                        </Link>
                        <video className="responsive-video" preload="metadata" controls>
                            <source src={`../${video.url}`} type="video/mp4"/>
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
