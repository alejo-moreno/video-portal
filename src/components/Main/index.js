import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Login from '../Login'
import Home from '../Home'
import VideoDetail from '../VideoDetail'

import './Main.css'

const Main = () => (
    <main className="container">
        <Switch>            
            <Route exact
                path='/'
                render={() => (localStorage.getItem('session_id') === null
                ? (<Login />)
                : (<Home />))}/>
            <Route path='/home' component={Home}/>
            <Route path='/video/:id' component={VideoDetail}/>
        </Switch>
    </main>
)

export default Main
