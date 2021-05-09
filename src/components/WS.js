import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import useLegacyState from "use-legacy-state";
import { useIdleTimer } from 'react-idle-timer'
import { w3cwebsocket as W3CWebSocket } from "websocket"
import { v4 as uuid } from 'uuid';
import {
  Switch,
  Route,
  useHistory,
  useParams
} from "react-router-dom";

import Scoreboard from './Scoreboard'
import ScoreboardW from './ScoreboardW'
import Userlist from './Userlist'
import WBPanel from './WBPanel'
import WBWaseda from './WBWaseda'
import ToolsWaseda from './ToolsWaseda'
import ToolsPlayer from './ToolsPlayer'
import ToolsQuick from './ToolsQuick'

const appConfig = window.appConfig
const ws = new W3CWebSocket(appConfig.controlws)

let initialload = 1;
console.log("intial state: " + initialload)

function getUniqueID() {
  function s4() {
    //shorter IDs

    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
  }
  console.log("namegen")
  return s4() + s4()
}

const WS = ({ type }) => {


  let history = useHistory()
  const { sbidParam } = useParams()

  const loadname = localStorage.getItem('name') || getUniqueID()
  const loadsbid = sbidParam || localStorage.getItem('sbid') || getUniqueID()
  const sburl = "https://kayin.moe/matchoverlay/"
  const [sync, syncSet] = useState(-1)

  const [scoreboard, scoreboardSet] = useLegacyState({
    p1name: "",
    p2name: "",
    p1score: 0,
    p2score: 0,
    title: ""
  });

  const [workboard, workboardSet] = useLegacyState({
    p1name: "",
    p2name: "",
    p1score: 0,
    p2score: 0,
    title: "",

  });

  const [config, configSet] = useLegacyState({
    uname: loadname,
    sbid: loadsbid,
    sburl: sburl
  });

  const [players, playersSet] = useState(JSON.parse(localStorage.getItem('players')) || window.appPlayers || [] )
  const [waseda, wasedaSet] = useState(JSON.parse(localStorage.getItem('waseda')) || window.appTeams || [] )
  const [quick, quickSet] = useState(JSON.parse(localStorage.getItem('quick')) || window.appQuick || [] )

  const [uldata, uldataSet] = useLegacyState({
    userlist: [],
    last: ""
  });

  useEffect(() => {
    // Update the document title using the browser API
    const A = (JSON.stringify(workboard))
    const B = (JSON.stringify(scoreboard))
    if (A === B) syncSet(1)
    else syncSet(0)
  }, [syncSet, scoreboard, workboard]);

  useEffect(() => {
    // Send name on reload while checking
    if (ws.readyState === 1) sendName()
    if (sbidParam === undefined) history.push({ pathname: "/" + type + "/" + config.sbid })
    // eslint-disable-next-line
  }, []);

  //
  // Idle
  //

  const [idle, idleSet] = useState(false)

  const handleOnIdle = () => {
    if (idle == false) {
      console.log('user is idle')
      idleSet(true)
      refresh()
    }
  }

  const handleOnActive = () => {
    if (idle == true) idleSet(false)
  }

  const handleOnAction = () => {
    if (idle == true) idleSet(false)
  }

  const { getRemainingTime, getLastActiveTime } = useIdleTimer({
    timeout: 1000 * 10,
    onIdle: handleOnIdle,
    onActive: handleOnActive,
    onAction: handleOnAction,
    debounce: 500
  })

  //
  // Buttons
  //

  const swap = () => {
    let temp = {}
    temp.p1name = workboard.p2name
    temp.p1score = workboard.p2score
    temp.p2name = workboard.p1name
    temp.p2score = workboard.p1score
    console.log("Swapping")
    workboardSet(temp)
  }

  const clear = () => {
    let temp = {}
    temp.p1name = ""
    temp.p1char = ""
    temp.p1rank = ""
    temp.p1bio = ""
    temp.p1score = 0
    temp.p2name = ""
    temp.p2char = ""
    temp.p2rank = ""
    temp.p2bio = ""
    temp.p2score = 0
    console.log("Clearing")
    workboardSet(temp)
  }

  const submit = () => {
    const meta_data = {
      'name': config.uname,
      'type': "update",
      'sbid': config.sbid
    }

    const payload = {
      'meta': meta_data,
      'main': workboard,
    }
    console.log("Sending")
    const json_text = JSON.stringify(payload)
    ws.send(json_text)
  }

  const dataPush = () => {
    console.log("push")
    let datalists = {
      "playerlist": players,
      "wasedalist": waseda,
      "quicklist": quick
    }

    const meta_data = {
      'name': config.uname,
      'type': "datalists",
      'sbid': config.sbid
    }

    const payload = {
      'meta': meta_data,
      'datalists': datalists,
    }
    const json_text = JSON.stringify(payload)
    ws.send(json_text)
  }

  const refresh = () => {
    workboardSet(scoreboard)
  }

  //
  // Websockets
  //

  ws.onopen = () => {
    console.log("Connected!")
    sendName()
  }

  ws.onmessage = (message) => {
    const data = JSON.parse(message.data)
    console.log("Update Type: " + data.meta.type)


    if (data.meta.type == "update" || data.meta.type == "ulist" || data.meta.type == "intro") {
      console.log("Scoreboard Data:" + JSON.stringify(data.main, null, "\t"))
      scoreboardSet(data.main)
      if (idle == true) workboardSet(data.main)
      uldataSet({
        userlist: data.meta.userlist,
        last: data.meta.last
      })

      if (data.meta.type == "intro") dlUpdate(data.datalists)

      if (initialload === 1 && config.sbid !== undefined) {
        workboardSet(data.main)
        initialload = 0
        console.log("intial state: " + initialload)

      }
    }

    if (data.meta.type == "apilist") {
      console.log("Scoreboard Data:" + JSON.stringify(data, null, "\t"))
      //wasedaSet(data.meta.datalists.teamlist)
      playersSet(data.meta.playerlist)
    }

    if (data.meta.type == "datalists") {
      console.log("Datalists:" + JSON.stringify(data.datalists.playerlist, null, "\t"))
      dlUpdate(data.datalists)
    }

  }

  function dlUpdate(dl) {
    if (dl.playerlist != undefined) playersSet(dl.playerlist)
    if (dl.wasedalist != undefined) wasedaSet(dl.wasedalist)
    if (dl.quicklist != undefined) quickSet(dl.quicklist)
  }

  function challongeRequest(cid, tid) {
    let id = ""

    if (cid !== "") id = cid + "-"
    id = id + tid

    console.log("Requesting Challonge List: " + id)

    const meta_data = {
      'name': config.uname,
      'type': "challonge",
      'tid': id,
      'sbid': config.sbid
    }

    const payload = {
      'meta': meta_data
    }

    const json_text = JSON.stringify(payload)
    ws.send(json_text)
  }

  function smashGGRequest(id) {
    console.log("Requesting SmashGG List: " + id)
    const meta_data = {
      'name': config.uname,
      'type': "smashgg",
      'tid': id,
      'sbid': config.sbid
    }

    const payload = {
      'meta': meta_data
    }

    const json_text = JSON.stringify(payload)
    ws.send(json_text)
  }

  // const toKeyedArray = (data) => {
  //   let newArray = []
  //   data.forEach(e => {
  //     newArray.push({
  //       "label": e,
  //       "key": uuid()
  //     })
  //   })
  //   return newArray
  // }

  function sendName() {
    localStorage.setItem('name', config.uname)
    localStorage.setItem('sbid', config.sbid)

    history.push({
      pathname: "/" + type + "/" + config.sbid
    })

    console.log("Telling Server Name Is: " + config.uname + " and Scoreboard ID is: " + config.sbid)
    const payload = {
      'meta': {
        'name': config.uname,
        'type': "rename",
        'sbid': config.sbid || "default"
      }
    }

    const json_text = JSON.stringify(payload)
    ws.send(json_text)
  }

  return (
    <div>
      <div className="wswrapper">
        <div>
          <Switch>
            <Route path="/controls/:sbidParam?">
              <Scoreboard scoreboard={scoreboard} />
              <WBPanel workboard={workboard} workboardSet={workboardSet} players={players} playersSet={playersSet} config={config} configSet={configSet} submit={submit} swap={swap} sendName={sendName} refresh={refresh} clear={clear} sync={sync} />
            </Route>
            <Route path="/waseda/:sbidParam?">
              <ScoreboardW scoreboard={scoreboard} />
              <WBWaseda workboard={workboard} workboardSet={workboardSet} teams={waseda} teamsSet={wasedaSet} config={config} configSet={configSet} submit={submit} swap={swap} sendName={sendName} refresh={refresh} clear={clear} sync={sync} />
            </Route>
          </Switch>
        </div>
        <Userlist userlist={uldata.userlist} last={uldata.last} set={uldataSet} idle={idle} />
      </div>

      <div className="underboard">
        <Switch>
          <Route path="/waseda/:sbidParam?">
            <ToolsWaseda teams={waseda} set={wasedaSet} dataPush={dataPush} /><br />
          </Route>
          <Route path="/controls/:sbidParam?">
            <ToolsPlayer players={players} set={playersSet} dataPush={dataPush} challongeRequest={challongeRequest} smashGGRequest={smashGGRequest} />
            <ToolsQuick players={players} quick={quick} set={quickSet} dataPush={dataPush} workboardSet={workboardSet} submit={submit}/><br />
          </Route>
        </Switch>
      </div>

    </div>
  );
}

export default WS;