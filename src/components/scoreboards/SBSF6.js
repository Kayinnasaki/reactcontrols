import './SBSF6.css'
import './SBAlt.css'
import TextFit from 'textfit'
import { useEffect } from 'react'

const SBSF6 = ({ board }) => {
    let sbClass = `overlay-sf6 ${board.showsb === false ? 'hide' : ''}`

    useEffect(() => {
        fit()
    })

    function fit(){
        TextFit(document.getElementsByClassName('p1name-alt'), {minFontSize:10, maxFontSize: 36})
        TextFit(document.getElementsByClassName('p2name-alt'), {minFontSize:10, maxFontSize: 36})
        TextFit(document.getElementsByClassName('title'), {minFontSize:10, maxFontSize: 28,alignHoriz: true, alignVert: true, multiLine: true})
    }

    // Use slug text to detect whether or not board info has been sent yet. If not, generate an empty div to prevent load and animation errors
    if (board.title=="ZZLOADINGZZ") { return(<div></div>)}

    return (
    <div className={sbClass}>
        <div id="p1name" className="p1name-alt">{board.p1name}</div>
        <div id="p2name" className="p2name-alt">{board.p2name}</div>

        <div id="p1score" className="p1score-alt">{board.p1score}</div>
        <div id="p2score" className="p2score-alt">{board.p2score}</div>

        <div id="p1pronouns" className="p1pronouns-alt">{board.p1pronouns}</div>
        <div id="p2pronouns" className="p2pronouns-alt">{board.p2pronouns}</div>

        <div className="title">{board.title}</div>
    </div>
)}
export default SBSF6