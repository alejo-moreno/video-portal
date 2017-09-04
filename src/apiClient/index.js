import request from 'superagent'

const prefixDomain = window.location.hostname === 'localhost' ? 'http://localhost:3001': '' ;

//POST request for rate a video
export function postVideoRating(sessionId, videoId, rating, callback) {
    request
        .post(prefixDomain + '/video/ratings')
        .query({sessionId: sessionId})
        .send({videoId: videoId, rating: rating})
        .set('Content-Type', 'application/json')
        .end(function (err, res) {
            if (err) 
                return console.error(err)
            callback(JSON.parse(res.text).data)
        })
}

//GET request for getting a video by Id
export function getSingleVideo(sessionId, videoId, callback) {
    request
        .get(prefixDomain + '/video')
        .query({sessionId: sessionId, videoId: videoId})
        .end(function (err, res) {
            if (err) 
                return console.error(err)
            callback(JSON.parse(res.text).data)
        });
}

//GET request for getting {limit} videos skipped from start with {skip}
export function getVideos(sessionId, limit, skip, callback) {
    request
        .get(prefixDomain + '/videos')
        .query({sessionId: sessionId, limit: limit, skip: skip})
        .end(function (err, res) {
            if (err) 
                return console.error(err)
            callback(JSON.parse(res.text).data)
        });
}

//POST request for authenticating users
export function authUser(username, password, callback) {
    request
        .post(prefixDomain + '/user/auth')
        .send({username: username, password: password})
        .set('Content-Type', 'application/json')
        .end(function (err, res) {
            if (err) 
                return callback(err)
            callback(null, JSON.parse(res.text))
        })
}

//POST request for authenticating users
export function logoutUser(sessionId, callback) {
    request
        .get(prefixDomain + '/user/logout')
        .query({sessionId: sessionId})
        .set('Content-Type', 'application/json')
        .end(function (err, res) {
            if (err) 
                return callback(err)
            callback(null, JSON.parse(res.text))
        })
}
