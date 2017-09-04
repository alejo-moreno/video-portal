import React, { Component } from 'react'
import request from 'superagent'
import { Row } from 'react-materialize'
import LazyLoad from 'react-lazy-load'
import VideoCard from '../VideoCard'
import { getVideos } from '../../apiClient'

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

    //Get videos and set them to component's state
    videoList() {   
        const self = this //preserving this for later use
        getVideos(localStorage.getItem('session_id'),40,0, function (res) {
            localStorage.setItem('videos', JSON.stringify(res))
            self.setState({ videos: res })
            self.setupUniqueVideoPlaying()
        })
    }

    //Prevent multiple videos to be played simultaneously
    setupUniqueVideoPlaying() {
        document.addEventListener('play', function (e) {
            var videos = document.getElementsByTagName('video');
            for (var i = 0, len = videos.length; i < len; i++) {
                if (videos[i] !== e.target) {
                    videos[i].pause();
                }
            }
        }, true);
    }

    //Render 4 videos for every row and lazy load next ones
    render() {
        const { videos } = this.state
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
                lCols={3} />)
            if ((index + 1) % 4 === 0) {
                lazyRows.push(
                    <LazyLoad key={index} offsetVertical={200} height={340}>
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
