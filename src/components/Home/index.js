import React, {Component} from 'react'
import request from 'superagent'
import VideoCard from '../VideoCard'
import {Row} from 'react-materialize'
import LazyLoad from 'react-lazy-load';

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
                limit: 20
            }) // query string
            .end(function (err, res) {
                if (err) 
                    console.error(err)
                const data = JSON
                    .parse(res.text)
                    .data
                localStorage.setItem('videos', JSON.stringify(data))
                that.setState({videos: data})
                that.setupUniqueVideoPlaying()
            });
    }

    setupUniqueVideoPlaying(){
        document.addEventListener('play', function (e) {
                    var videos = document.getElementsByTagName('video');
                    for (var i = 0, len = videos.length; i < len; i++) {
                        if (videos[i] !== e.target) {
                            videos[i].pause();
                        }
                    }
                }, true);
    }

    render() {
        const {videos} = this.state
            let lazyRows = [],
                videoRows = []

            let index = 0
            const videosLenght = videos.length;

            for (index; index < videosLenght; index++) {
                videoRows.push(<VideoCard
                    key={videos[index]._id}
                    video={videos[index]}
                    sCols={12}
                    mCols={4}
                    lCols={3}/>)
                if ((index + 1) % 4 === 0) {
                    lazyRows.push(
                        <LazyLoad key={index} offsetVertical={0} height={340}>
                            <div>
                                {videoRows}
                            </div>
                        </LazyLoad>
                    )
                    videoRows = []
                }
            }
            return (
                <Row>
                    {lazyRows}
                </Row>
            )
        }
    }

    export default Home
