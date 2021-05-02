import DataTool from './DataTool'
import DataDisplay from './DataDisplay'
import { useState } from 'react'
import Collapsible from 'react-collapsible';
import { v4 as uuid } from 'uuid';
import isJson from 'is-valid-json'
import cloneDeep from 'clone-deep'

const TeamTool = ({ teams, set, send }) => {
    const [motion, motionSet] = useState([-1, -1])

    const Sort = () => {
        motionSet(-1, -1)
        const teamClone = cloneDeep(teams)
        teamClone.sort(function (a, b) {
            if (a.label < b.label) { return -1; }
            if (a.label > b.label) { return 1; }
            return 0;
        })
        set(teamClone)
    }

    const addTeam = () => {
        motionSet(-1, -1)
        const teamClone = cloneDeep(teams)
        teamClone.push({
            label: "", key: uuid(),
        })
        set(teamClone)
    }

    const saveWaseda = () => {
        localStorage.setItem('waseda', JSON.stringify(teams))
    }

    const loadWaseda = () => {
        if (isJson(JSON.parse(localStorage.getItem('waseda'))) == false) return

        set(JSON.parse(localStorage.getItem('waseda')))
        motionSet(-1, -1)
    }

    return (
        <Collapsible trigger="Team Data Tool">
            <div className="ttBase">
                <div className="ttTop">
                    <Collapsible trigger="Instructions" className="CollapsibleInner" openedClassName="CollapsibleInner" triggerClassName="CollapsibleInner" triggerOpenedClassName="CollapsibleInner">
                        <div className="lazyTextLeft light">
                            <div className="lazyMargin lazyBoost">
                                <h3>Team Tool Instructions</h3>
                        Use the Team Tool to assemble Waseda style 2v2 teams to use with the waseda scoreboards.<br /><br />

                                <strong>Top</strong> and <strong>Bottom</strong> are used but it can just as easily refer to player 1 and 2 or A and B.<br /><br />

                        Character Selection only matters if using something like the "Big W" view.<br /><br />

                                <strong>Save Data</strong> and <strong>Load Data</strong> save the current scoreboard to local storage so it may be reloaded
                        at another time. <strong>Push to Server</strong> sends this data to anyone else using this scoreboard.<br /><br />

                                <strong>Raw Tool</strong> shows the literal string data for all the teams. Use this if you want to edit by hand, or if you simply want to back a team configuration up to a notepad file or something.<br /><br />
                            </div>
                        </div>
                    </Collapsible>
                    <DataTool data={teams} set={set} style="CollapsibleInner" />

                    <hr /><pre className="bold ttIndex">   [ID]           [Team Name]                 [Top]        [Top Char]      [Bottom]     [Bottom Char]</pre></div>
                
                    <DataDisplay data={teams} set={set} type="waseda" />

            </div>
        </Collapsible>
    )
}

export default TeamTool