import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Login from '../Login'
import Home from '../Home'

import './Main.css'



const Main = () => (
    <main className="container">
        <Switch>
            <Route exact path='/' component={Login}/>
            <Route path='/home' component={Home}/>
        </Switch>
    </main>
)

export default Main
