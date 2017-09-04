import * as fixtures from './fixtures'
import * as apiClient from './'


it('GET /video', () => {
    const fixture = fixtures.getSingleVideo()
    const sessionId = fixtures.getUser().sessionId
    apiClient.getSingleVideo(sessionId, fixture._id, function (res) {
        expect(res).toEqual(fixture)
    })
});

it('GET /videos', () => {
    const fixture = fixtures.getVideos()
    const sessionId = fixtures.getUser().sessionId
    apiClient.getVideos(fixtures.sessionId, 3, function (res) {
        expect(res).toEqual(fixture)
    })
});

it('POST /user/auth', () => {
    const fixture = fixtures.getUser()
    apiClient.authUser(fixture.username, fixture.password, function (err, res) {
        expect(res).toHaveProperty('sessionId');
    })
});
