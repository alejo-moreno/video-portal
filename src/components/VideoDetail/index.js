import React, {Component} from 'react'
import {Row, Col} from 'react-materialize'
import request from 'superagent'
import Rating from 'react-rating'
import VideoCard from '../VideoCard'

import './VideoDetail.css'

class VideoDetail extends Component {

    constructor(props) {
        super(props)
        this.state = {
            video: {  
                ratings : [0]              
            }
        }                
        this.getVideo = this.getVideo.bind(this)  
        this.handleChangeVideo = this.handleChangeVideo.bind(this)              
        this.handleRatingClick = this.handleRatingClick.bind(this)
    }    

    componentDidMount(){        
        this.getVideo(this.props.match.params.id)
    }

    handleChangeVideo(videoId) {       
        this.getVideo(videoId)        
    }

    handleRatingClick(rating){                
        request.post('http://localhost:3001/video/ratings')
            .query({sessionId: localStorage.getItem('session_id')})
            .send({videoId: this.state.video._id, rating: rating})
            .set('Content-Type', 'application/json')
            .end(function (err, res) {
                // Calling the end function will send the request
                if (err) {                    
                    console.error(err)
                }
                const data = JSON.parse(res.text).data                                
                console.log(data)                
            })
    }

    getVideo(videoId) {  
        const self = this      
        request.get('http://localhost:3001/video')
            .query({
                sessionId: localStorage.getItem('session_id'),
                videoId: videoId
            }) // query string
            .end(function (err, res) {
                if (err) 
                    console.error(err)
                const data = JSON.parse(res.text).data                                
                self.setState({video: data})
                document.querySelector('.responsive-video').load()
            });
    }

    render() {
        const { video } = this.state   
        let rating = (video.ratings.reduce((a,b)=> a+b)/ video.ratings.length).toString().substr(0,3)
        const relatedVideos = JSON.parse(localStorage.getItem('videos'))
                                  .map(v => 
                                 <VideoCard key={v._id} video={v} sCols={12} onSelectedVideo={this.handleChangeVideo} />)
        return (
            <Row className="video-detail">
                <Col s={12} m={9} className="video-detail-player">
                    <p>{video.name}</p>
                    <video className="responsive-video" controls autoPlay>
                        <source src={`../${video.url}`} type="video/mp4"/>
                    </video>
                    <div className="rating">
                        <Rating initialRate={rating} empty="fa fa-star-o fa-2x" full="fa fa-star fa-2x"  onChange={this.handleRatingClick} />
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
