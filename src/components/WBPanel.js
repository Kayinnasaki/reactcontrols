import { IoMdSwap } from 'react-icons/io'
import { useEffect } from 'react'
import Scoreticker from './Scoreticker'
import Tempdatalist from './Tempdatalist'
import PlayerSelect from './PlayerSelect'
import Extrainput from './Extrainput'
import Titleinput from './Titleinput'
import Footer from './Footer'
import Collapsible from 'react-collapsible';

let update = 0;
const WBpanel = ({ workboard, workboardSet, players, playersSet, config, configSet, submit, swap, sendName, refresh, clear, sync }) => {

    useEffect(() => {
        if (update === 1) {
            console.log("Forcing Update")
            update = 0
            submit()
        }

    }, [swap, submit])

    const wbSwap = () => {
        update = 1
        swap()
    }

    const wbClear = () => {
        update = 1
        clear()
    }

    return (
        <div className="Workboard">
            <Tempdatalist />
            <div className="wbFlex">
                <PlayerSelect board={workboard} players={players} side="p1" set={workboardSet} />
                <button className="roundButton darkButton" onClick={wbSwap}><IoMdSwap /></button>
                <PlayerSelect board={workboard} players={players} side="p2" set={workboardSet} />
            </div>
            <div className="wbFlex">
                <Scoreticker board={workboard} entry="p1score" set={workboardSet} submit={submit} />
                <div>
                    <button className="darkButton midButton" onClick={wbClear}>Clear</button><br />
                    <button className="darkButton midButton" onClick={submit}>Submit</button><br />
                    <button className={sync === 0 ? "darkButton midButton red" : "darkButton midButton"} onClick={refresh}>Refresh</button><br />
                    <Titleinput board={workboard} entry="title" set={workboardSet} />
                </div>
                <Scoreticker board={workboard} entry="p2score" set={workboardSet} submit={submit} />
            </div>
            <Collapsible triggerClassName="wbCollapse wbClosed" triggerOpenedClassName="wbCollapse wbOpen" trigger="" overflowWhenOpen="visible">
                <div className="wbFlex">
                    <div className="wbExtra">
                        Pronouns <Extrainput board={workboard} entry="p1pronouns" set={workboardSet} /><br />
                        Team <Extrainput board={workboard} entry="p1team" set={workboardSet} />
                    </div>

                    <div className="wbExtra">
                        <Extrainput board={workboard} entry="p2pronouns" set={workboardSet} /> Pronouns<br />
                        <Extrainput board={workboard} entry="p2team" set={workboardSet} /> Team
                    </div>
                </div>
            </Collapsible>
            <div className="wbFooter">
                <Footer config={config} configSet={configSet} sendName={sendName} boardview="/board/default/" />
            </div>
        </div>
    )
}

export default WBpanel