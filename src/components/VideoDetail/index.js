import React, { Component } from 'react'
import { Row, Col } from 'react-materialize'
import Rating from 'react-rating'
import { postVideoRating, getSingleVideo } from '../../apiClient'
import VideoCard from '../VideoCard'

import './VideoDetail.css'

class VideoDetail extends Component {

    constructor(props) {
        super(props)
        this.state = {
            video: {
                ratings: [0]
            }
        }
        this.getVideo = this.getVideo.bind(this)
        this.handleChangeVideo = this.handleChangeVideo.bind(this)
        this.handleRatingClick = this.handleRatingClick.bind(this)
    }
    
    componentDidMount() {
        this.getVideo(this.props.match.params.id)
    }

    //handle video selection, SPA behaviour is expected
    handleChangeVideo(videoId) {
        this.getVideo(videoId)
    }

    //handle rating click from user 
    handleRatingClick(rating) {
        postVideoRating(localStorage.getItem('session_id'),this.state.video._id, parseInt(rating), function (res) {
            console.log(res)
        })
    }

    //Get video by id and set it to component's state
    getVideo(videoId) {
        const self = this
        getSingleVideo(localStorage.getItem('session_id'),videoId, function (res) {
            self.setState({ video: res })
            document.querySelector('.responsive-video').load()
        })
    }

    render() {
        const { video } = this.state
        let rating = (video.ratings.reduce((a, b) => a + b) / video.ratings.length).toString().substr(0, 3)
        const relatedVideos = JSON.parse(localStorage.getItem('videos'))
            .map(v =>
                <VideoCard key={v._id} video={v} sCols={12} onSelectedVideo={this.handleChangeVideo} />)
        return (
            <Row className="video-detail">
                <Col s={12} m={9} className="video-detail-player">
                    <p>{video.name}</p>
                    <video className="responsive-video" controls autoPlay>
                        <source src={`/${video.url}`} type="video/mp4" />
                    </video>
                    <div className="rating">
                        <Rating initialRate={rating} empty="fa fa-star-o fa-2x" full="fa fa-star fa-2x" onChange={this.handleRatingClick} />
                        <p>Average Rating: {rating}</p>
                    </div>
                    <div className="video-desc">
                        <p>{video.description}</p>
                    </div>
                </Col>
                <Col m={3} className="video-detail-related">
                    <p>Related Videos</p>
                    {relatedVideos}
                </Col>
            </Row>
        )
    }
}



export default VideoDetail
