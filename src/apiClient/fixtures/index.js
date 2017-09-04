export function getSingleVideo() {
    return {
        _id: '59a74e4d4244801d2fbcee8a',
        name: 'Getting Started With ReactJs',
        description: `React.js is a JavaScript library for building user interfaces. 
            - Just the UI: Lots of people use React as the V in MVC. Since React makes no assumptions about t
            he rest of your technology stack, its easy to try it out on a small feature in a
            n existing project. - Virtual DOM: React uses a virtual DOM diff implementation 
            for ultra-high performance. It can also render on the server using Node.js — no 
            heavy browser DOM required. - Data flow: React implements one-way reactive data 
            flow which reduces boilerplate and is easier to reason about than traditional da
            ta binding.`,
        url: 'videos/Getting_Started_With_React.js.mp4',
        ratings: [
            1,
            5,
            5,
            4,
            3,
            4,
            2,
            5
        ]

    }
}
export function getVideos() {
    return [
        this.getSingleVideo(),
        this.getSingleVideo(),
        this.getSingleVideo()
    ]
}
export function getUser() {
    return {_id: '59a74e4d4244801d2fbcee74', username: 'ali', password: '5f4dcc3b5aa765d61d8327deb882cf99', sessionId: 'byvilmSY8Zc7MfCJB2uGzIbdxMjDc0B0'}
}
