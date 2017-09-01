import React, {Component} from 'react'
import {Row, Col} from 'react-materialize'
import request from 'superagent'
import Star from '../Star'
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
    }    

    componentDidMount(){        
        this.getVideo(this.props.match.params.id)
    }

    handleChangeVideo(videoId) {       
        this.getVideo(videoId)        
    }

    getVideo(videoId) {  
        var self = this      
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
        let rating = Math.floor(video.ratings.reduce((a,b)=> a+b)/ video.ratings.length)
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
                            <Star rating="5" videoId={video._id} />
                            <Star rating="4" videoId={video._id} />
                            <Star rating="3" videoId={video._id} />
                            <Star rating="2" videoId={video._id} />
                            <Star rating="1" videoId={video._id} />
                        <span>Average Rating: {rating} </span>                                            
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
