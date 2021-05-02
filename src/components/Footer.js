
import { Link } from "react-router-dom";
import { BiRefresh } from 'react-icons/bi'

const Footer = ({ config, configSet, sendName, boardview }) => {
    return (
        <div className="Footer">
            <div>
                Name: <input className="footerInput" value={config.uname} onChange={e => configSet({ uname: e.target.value })} />
                <button className="footerInputBtn" onClick={sendName} ><BiRefresh /></button>
                Scoreboard ID: <input className="footerInput" value={config.sbid} onChange={e => configSet({ sbid: e.target.value })} />
                <button className="footerInputBtn" onClick={sendName}><BiRefresh /></button>
            </div>

            <div className="sblinkbox"><Link target="_blank" className="sblink" to={boardview + config.sbid}>{window.location.hostname + boardview + config.sbid}</Link></div>
        </div>
    )
}

export default Footer
