import { useState } from 'react'
import { Switch, Route, useParams } from "react-router-dom";
import { w3cwebsocket as W3CWebSocket } from "websocket"
import React from 'react'
import SBDefault from './scoreboards/SBDefault'
import SBWaseda from './scoreboards/SBWaseda'
import SBWBig from './scoreboards/SBWBig'

const appConfig = window.appConfig
const ws = new W3CWebSocket(appConfig.listenws)

const ViewHome = () => {
    const { sbidParam } = useParams()

    const [scoreboard, scoreboardSet] = useState({
        p1name: "",
        p2name: "",
        p1score: 0,
        p2score: 0,
        title: ""
    });

    ws.onopen = () => {
        console.log("Connected!")
        ws.send(sbidParam)
    }

    ws.onmessage = (message) => {
        const data = JSON.parse(message.data)
        scoreboardSet(data.main)
        console.log(JSON.stringify(scoreboard))
    }

    return (

        <div className="home">
            <Switch>
                <Route path="/board/default/:sbidParam?">
                    <SBDefault board={scoreboard} />
                </Route>
                <Route path="/board/waseda/:sbidParam?">
                    <SBWaseda board={scoreboard} />
                </Route>
                <Route path="/board/wbig/:sbidParam?">
                    <SBWBig board={scoreboard} />
                </Route>
            </Switch >
        </div>

    )
}

export default ViewHome