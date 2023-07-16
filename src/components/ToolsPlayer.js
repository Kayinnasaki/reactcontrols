import DataDisplay from './DataDisplay'
import DataTool from './DataTool'
import DataToolSimple from './DataToolSimple'
import Collapsible from 'react-collapsible';
import { useState } from 'react'

const ToolsPlayer = ({ players, set, dataPush, challongeRequest, smashGGRequest }) => {
    const [ctid, ctidSet] = useState(localStorage.getItem("ctid") || "")
    const [ccid, ccidSet] = useState(localStorage.getItem("ccid") || "")
    const [sggid, sggidSet] = useState(localStorage.getItem("sggid") || "")

    const save = (name, data) => {
        localStorage.setItem(name, data)
    }

    const load = (name, lsSet) => {
        lsSet(localStorage.getItem(name))
    }

    return (
        <Collapsible trigger="Player Data Tool">
            <div className="ttBase">
                <div className="ttTop">
                    <div className="flex">
                        <div className="lazyHalf">
                            <DataToolSimple data={players} set={set} open={true} style="CollapsibleInner" />
                  
                            <Collapsible trigger="Challonge Tool" className="CollapsibleInner" openedClassName="CollapsibleInner" triggerClassName="CollapsibleInner" triggerOpenedClassName="CollapsibleInner">
                                <div className="flex lazyPadding">
                                    <div className="lazy70 lazyAuto">
                                        Community ID:  <input type="text" className="lazy80" value={ccid} onChange={e => ccidSet(e.target.value)} /> <br />
                                        Tournament ID: <input type="text" className="lazy80" value={ctid} onChange={e => ctidSet(e.target.value)} /> <br />&nbsp;
                                    </div>
                                    <div className="lazy30 lazyAuto lazyPadding">
                                        <button type="button" className="lazyFull" onClick={() => challongeRequest(ccid, ctid)}>Pull Down List</button><br />
                                        <button type="button" className="lazyFull" onClick={() => {
                                            save("ctid", ctid)
                                            save("ccid", ccid)
                                        }}>Save</button><br />
                                        <button type="button" className="lazyFull" onClick={() => {
                                            load("ctid", ctidSet)
                                            load("ccid", ccidSet)
                                        }}>Load</button>
                                    </div>
                                </div>
                            </Collapsible>
                            <Collapsible trigger="StartGG Tool" className="CollapsibleInner" openedClassName="CollapsibleInner" triggerClassName="CollapsibleInner" triggerOpenedClassName="CollapsibleInner">
                                <div>
                                    <div className="lazyPadding">
                                        Tournament URL: <input type="text" className="lazyFull " value={sggid} onChange={e => sggidSet(e.target.value)} /> <br />
                                    </div>
                                    <button type="button" onClick={() => smashGGRequest(sggid)}>Pull Down List</button>
                                    <button type="button" onClick={() => save("sggid", sggid)}>Save</button>
                                    <button type="button" onClick={() => load("sggid", sggSet)}>Load</button>

                                </div>
                            </Collapsible>
                        </div>
                        <div className="lazyHalf">

                            <div className="lazyTextLeft lazyFloatRight lazyMargin">
                                <h3>Player Tool Instructions</h3>
                        Use the Player Tool to make it easier to assign players on the scoreboard.<br /><br />

                                <strong>Simple List</strong> Allows you to input players in a simple manner. Be warned that loading players this way will strip metadata out of any existing player list.<br /><br />

                                <strong>Raw List</strong> JSON style player list that allows for the insertion of more data.<br /><br />

                        The <strong>Challonge</strong> and <strong>SmashGG</strong> tools lets you pull player lists from online tournaments. Each of these can have values saved for later use.<br /><br />

                                <strong>Save Data</strong> and <strong>Load Data</strong> save the current scoreboard to local storage so it may be reloaded
                        at another time. <strong>Push to Server</strong> sends this data to anyone else using this scoreboard.<br /><br />
                            </div>

                        </div>
                    </div>
                    <DataTool data={players} set={set} style="CollapsibleInner" />
                    <div>                                                                                                                       
                        <hr /><pre className="bold ttIndex">   [ID]            [Player]              [Char]       [Pronouns]                 [Team]</pre></div>
                </div>
                <DataDisplay data={players} set={set} type="players" dataPush={dataPush} />
            </div>
        </Collapsible>
    )
}

export default ToolsPlayer