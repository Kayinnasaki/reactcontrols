import { IoMdSwap } from 'react-icons/io'
import Scoreticker from './Scoreticker'
import Tempdatalist from './Tempdatalist'
import PlayerSelect from './PlayerSelect'
import Titleinput from './Titleinput'
import Footer from './Footer'

const WBpanel = ({ workboard, workboardSet, players, playersSet, config, configSet, submit, swap, sendName, refresh, clear, sync }) => {
    return (
        <div className="Workboard">
            <Tempdatalist />
            <div className="wbFlex">
                <PlayerSelect board={workboard} players={players} side="p1" set={workboardSet} />
                <button className="roundButton darkButton" onClick={swap}><IoMdSwap /></button>
                <PlayerSelect board={workboard} players={players} side="p2" set={workboardSet} />
            </div>
            <div className="wbFlex">
                <Scoreticker board={workboard} entry="p1score" set={workboardSet} submit={submit} />
                <div>
                    <button className="darkButton midButton" onClick={clear}>Clear</button><br />
                    <button className="darkButton midButton" onClick={submit}>Submit</button><br />
                    <button className={sync === 0 ? "darkButton midButton red" : "darkButton midButton"} onClick={refresh}>Refresh</button><br />
                    <Titleinput board={workboard} entry="title" set={workboardSet} />
                </div>
                <Scoreticker board={workboard} entry="p2score" set={workboardSet} submit={submit} />
            </div>
            <div className="wbFooter">
                <Footer config={config} configSet={configSet} sendName={sendName} boardview="/board/default/" />
            </div>
        </div>
    )
}

export default WBpanel