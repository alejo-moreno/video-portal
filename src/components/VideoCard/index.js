import React, {Component} from 'react'
import {Col} from 'react-materialize'
import {Link} from 'react-router-dom'
import Rating from 'react-rating'
import './VideoCard.css'


class VideoCard extends Component {

      constructor(props) {
        super(props)
        this.handleVideoChange = this.handleVideoChange.bind(this);               
      }

      //Pass video id to component's parent on title clicked
      handleVideoChange(e){          
          this.props.onSelectedVideo(this.props.video._id)
      }


    render() {                
        const {video} = this.props        

        //limits description to 70 characters
        let description = video.description.length > 70 ? video.description.substring(0,70)+'...' : video.description

        //Get average rating from video
        let rating = parseInt((video.ratings.reduce((a,b)=> a+b)/ video.ratings.length).toString().substr(0,3))
        return (             
                <Col s={this.props.sCols} m={this.props.mCols} l={this.props.lCols}>
                    <div className="video-card z-depth-4" data-index={this.props.index}>
                        <Link onClick={this.handleVideoChange} to={`/video/${video._id}`} className="video-title">
                            <p>{video.name}</p>
                        </Link>
                        <video className="responsive-video" preload="metadata" controls>
                            <source src={`/${video.url}`} type="video/mp4"/>
                        </video>
                        <Rating initialRate={rating} full="fa fa-star" empty="fa fa-star-o" readonly />
                        <div className="video-desc">
                            <p>{description}</p>
                        </div>
                    </div>
                </Col>            
        )
    }
}

export default VideoCard
