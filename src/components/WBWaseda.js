import { IoMdSwap } from 'react-icons/io'
import { useEffect } from 'react'
import Tempdatalist from './Tempdatalist'
import TeamSelect from './TeamSelect'
import Footer from './Footer'

let update = 0;
const WBWaseda = ({ workboard, workboardSet, teams, teamsSet, config, configSet, submit, swap, sendName, refresh, clear, sync }) => {

    function wSwap() {
        console.log("Swap")
        let temp = {}

        temp.p1team = workboard.p2team
        temp.p2team = workboard.p1team
        temp.p1top = workboard.p2top
        temp.p2top = workboard.p1top
        temp.p1bottom = workboard.p2bottom
        temp.p2bottom = workboard.p1bottom
        temp.p1topX = workboard.p2topX
        temp.p2topX = workboard.p1topX
        temp.p1bottomX = workboard.p2bottomX
        temp.p2bottomX = workboard.p1bottomX
        temp.p1topChar = workboard.p2topChar
        temp.p2topChar = workboard.p1topChar
        temp.p1bottomChar = workboard.p2bottomChar
        temp.p2bottomChar = workboard.p1bottomChar
        workboardSet(temp)
    }

    function clear() {
        let temp = {}

        temp.p2team = ""
        temp.p1team = ""
        temp.p2top = ""
        temp.p1top = ""
        temp.p2bottom = ""
        temp.p1bottom = ""
        temp.p2topX = false
        temp.p1topX = false
        temp.p2bottomX = false
        temp.p1bottomX = false
        temp.wPos = "none"
        workboardSet(temp)
    }

    function onRadioChange(e) {
        console.log("Match Position: " + e.target.value)
        workboardSet({
            "wPos": e.target.value || "none"
        })
        update = 1;
    }

    useEffect(() => {
        if (update === 1) {
            console.log("Forcing Update")
            update = 0
            submit()
        }

    }, [workboard, submit])

    return (
        <div className="Workboard">
            <Tempdatalist />
            <div className="wbFlex">
                <TeamSelect board={workboard} teams={teams} side="p1" set={workboardSet} />
                <div className="wbTeam">
                    <button className="roundButton darkButton" onClick={wSwap}><IoMdSwap /></button>
                    <div className="radioBox" onChange={e => onRadioChange(e)}>
                        <input type="radio" value="top" name="wPosition" checked={workboard.wPos === "top"} readOnly /><br />
                        <input type="radio" value="none" name="wPosition" checked={workboard.wPos === "none"} readOnly /><br />
                        <input type="radio" value="bottom" name="wPosition" checked={workboard.wPos === "bottom"} readOnly />
                    </div>
                </div>
                <TeamSelect board={workboard} teams={teams} side="p2" set={workboardSet} />
            </div>

            <div className="wbFlex">
                <button className="darkButton midButton" onClick={clear}>Clear</button>
                <button className="darkButton midButton" onClick={submit}>Submit</button>
                <button className={sync === 0 ? "darkButton midButton red" : "darkButton midButton"} onClick={refresh}>Refresh</button>
            </div>

            <div className="wbFlex wbFooter wbBot">
                <Footer config={config} configSet={configSet} sendName={sendName} boardview="/board/waseda/" />
            </div>
        </div>
    )
}

export default WBWaseda