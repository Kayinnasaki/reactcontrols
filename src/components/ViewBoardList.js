import Nav from './Nav'
import { Link } from "react-router-dom";
import {
    useParams
  } from "react-router-dom";



const ViewBoardList = () => {
    const { sbidParam } = useParams()

    const sbid = sbidParam || localStorage.getItem('sbid') || getUniqueID()
    return (
    <div className="home">
        <Nav/><br/>
        
        <Link target="_blank" className="sblink" to={"/board/default/" + sbid}><h1>Default Board</h1></Link>
        <pre>{window.location.host + "/board/default/" + sbid}</pre>https://overlay.kayin.moe/controls/gsf

        The default, classic Warm Rock Overlay. The one listed by default<br />
        under the scoreboard controller.
        <br /><br /><br />

        <Link target="_blank" className="sblink" to={"/board/alt/" + sbid}><h1>Alt Board</h1></Link>
        <pre>{window.location.host + "/board/alt/" + sbid}</pre><br />

        An updated board, designed to not intersect with SF6's round indicators,<br />but there is nothing something you from using it with other games!
        <br /><br /><br />

        <Link target="_blank" className="sblink" to={"/board/sf6/" + sbid}><h1>Street Fighter 6 Board</h1></Link>
        <pre>{window.location.host + "/board/sf6/" + sbid}</pre><br />

        The Alt board, but colored to match the SF6 player colors.
        <br /><br /><br />

        <Link target="_blank" className="sblink" to={"/board/waseda/" + sbid}><h1>Waseda Board</h1></Link>
        <pre>{window.location.host + "/board/waseda/" + sbid}</pre><br />

        The basic Waseda board.
        <br /><br /><br />

        <Link target="_blank" className="sblink" to={"/board/wbig/" + sbid}><h1>Waseda Matchup Screen</h1></Link>
        <pre>{window.location.host + "/board/wbig/" + sbid}</pre><br />

        A matchup screen for Rev2 Waseda. Only Rev2 character portraits are supported at this time.
        <br /><br /><br />

     </div>)

}


export default ViewBoardList