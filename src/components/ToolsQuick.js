import DataDisplay from './DataDisplay'
import DataTool from './DataTool'
import Collapsible from 'react-collapsible';
import DataListInput from "react-datalist-input"
import { useEffect } from 'react'

let update = 0
const ToolsQuick = ({ players, quick, set, dataPush, workboardSet, submit }) => {
    const clearclick = true

    const MatchChange = (data) => {
        data.p1score = 0
        data.p2score = 0
        let p1pull = pullInfo(data, "p1")
        let p2pull = pullInfo(data, "p2")

        const results = Object.assign(p1pull, p2pull);
        results.title = data.title

        workboardSet(results)
        update = 1
    }

    const pullInfo = (data, side) => {
        let pull = players.find(({ label }) => label === data[side + "name"])
        let results = {}

        // If no results find, send back bare minimum information
        if (pull === undefined) {
            results[side + "name"] = data[side + "name"]
        } else {
            results[side + "name"] = pull.label || ""
            results[side + "char"] = pull.char || ""
            results[side + "bio"] = pull.bio || ""
            results[side + "rank"] = pull.rank || ""
        }
        
        return results
    }

    useEffect(() => {
        if (update === 1) {
            console.log("Forcing Update")
            update = 0
            submit()
        }
    }, [submit])

    return (
        <Collapsible trigger="Quick Set Tool" overflowWhenOpen="visible">
            <div className="ttBase">
                <div className="ttTop">
                    Use to set up predefined matches to quickly set the scoreboard. Pick the match off the menu below.
                <DataListInput
                        inputClassName="wbTeamlist"
                        itemClassName="wbTeamitem"
                        placeholder="Select Match"
                        items={quick}
                        clearInputOnClick={clearclick}
                        onSelect={MatchChange}
                    />

                    <DataTool data={quick} set={set} style="CollapsibleInner" />
                    <hr /><pre className="bold ttIndex">   [ID]             [Player 1]                   [Player 2]                    [Title]</pre>

                </div>
                <DataDisplay data={quick} set={set} extra={players} type="quick" dataPush={dataPush} />
            </div>
        </Collapsible>
    )
}

export default ToolsQuick