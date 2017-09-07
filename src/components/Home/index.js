import React, {Component} from 'react'
import {Row} from 'react-materialize'
import _throttle from 'lodash.throttle'
import VideoCard from '../VideoCard'
import {getVideos} from '../../apiClient'

class Home extends Component {

    constructor() {
        super()        
        this.state = {
            videos: [],
            limit: 16,
            skip: 0
        }
        this.setLazyElements = this.setLazyElements.bind(this)
        
    }

    componentDidMount() {
        this.fetchVideos()
        this.setupUniqueVideoPlaying()
        window.addEventListener('scroll', _throttle(this.setLazyElements, 2000));
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.setLazyElements);
    }

    setLazyElements() {

        const self = this
        let $window = document.documentElement
        let window_height = $window.clientHeight
        let window_top_position = window.pageYOffset
        let window_bottom_position = (window_top_position + window_height);

        let elements = document.querySelectorAll('.video-card')
        let fetched = false

        elements.forEach(function (element) {
            let element_height = element.offsetHeight
            let element_top_position = element.offsetTop
            let element_bottom_position = element_top_position + element_height
            
            let element_index = element.getAttribute('data-index')

            if ((element_bottom_position > window_top_position) && (element_top_position < window_bottom_position)) {
                //console.log('seen: ' + element_index)                
                if ((element_index >= (self.state.skip - 4)) && !fetched)  {
                    //console.log(`FETCHING...[${element_index}] [${(self.state.skip - 4)}]`)
                    self.fetchVideos()
                    fetched = true
                }
            } else {
                //console.log('unseen: ' + element_index)
            }
        });
    }

    //Get videos and set them to component's state
    fetchVideos() {        
        const self = this //preserving this for later use
        getVideos(localStorage.getItem('session_id'), this.state.limit, this.state.skip, function (res) {
            localStorage.setItem('videos', JSON.stringify(res))
            self.setState((prevState) => {
                return {
                    videos: prevState.videos.concat(res),                    
                    skip: prevState.skip  + prevState.limit,
                }
            })
        })
    }

    //Prevent multiple videos to be played simultaneously
    setupUniqueVideoPlaying() {
        document
            .addEventListener('play', function (e) {
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
        const lazyVideos = videos.map((v, i) => <VideoCard key={i} index={i} video={v} sCols={12} mCols={4} lCols={3}/>)       
        return (
            <Row>
                {lazyVideos}
            </Row>
        )
    }
}

export default Home
