import request from 'superagent'

const prefixDomain = 'http://localhost:3002';

export function postVideoRating(videoId, rating, callback) {
    request.post(prefixDomain + '/video/ratings')
        .query({ sessionId: localStorage.getItem('session_id') })
        .send({ videoId: this.state.video._id, rating: rating })
        .set('Content-Type', 'application/json')
        .end(function (err, res) {
            if (err)
                return console.error(err)
            callback(JSON.parse(res.text).data)
        })
}

export function getSingleVideo(videoId, callback) {
    request.get(prefixDomain + '/video')
        .query({
            sessionId: localStorage.getItem('session_id'),
            videoId: videoId
        })
        .end(function (err, res) {
            if (err)
                return console.error(err)
            callback(JSON.parse(res.text).data)
        });
}

export function getVideos(limit, callback) {
    request
        .get(prefixDomain + '/videos')
        .query({
            sessionId: localStorage.getItem('session_id'),
            limit: limit
        })
        .end(function (err, res) {
            if (err)
                return console.error(err)
            console.log(res)
            let data = JSON.parse(res.text).data
            localStorage.setItem('videos', JSON.stringify(data))
            callback(data)
        });
}

export function authUser(username, password, callback) {
    request
        .post(prefixDomain + '/user/auth')
        .send({ username: username, password: password })
        .set('Content-Type', 'application/json')
        .end(function (err, res) {
            if (err)
                return callback(err)
            callback(null, JSON.parse(res.text))
        })
}