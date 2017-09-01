import React, {Component} from 'react'
import {Row, Col} from 'react-materialize'
import request from 'superagent'
import Star from '../Star'
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
    }    

    componentDidMount(){
        this.getVideo()
    }

    getVideo() {  
        var self = this      
        request.get('http://localhost:3001/video')
            .query({
                sessionId: localStorage.getItem('session_id'),
                videoId: this.props.location.query.id
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
        return (
            <Row className="video-detail">
                <Col s={12}>
                    <p>{video.name}</p>
                    <video className="responsive-video" controls autoPlay>
                        <source src={video.url} type="video/mp4"/>
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
            </Row>
        )
    }
}



export default VideoDetail
