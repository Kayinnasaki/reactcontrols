import './SBWBig.css'
import cx from 'classnames'
import pointer1 from './images/SBWasebaPointer1.png'
import pointer2 from './images/SBWasebaPointer2.png'
import { GiSkullCrossedBones } from 'react-icons/gi'

const SBWBig = ({ board }) => {

    function lengthcheck(entry) {
        const check = board[entry]
        console.log(board.p1team + " " + entry)
        if (check === undefined) {return 0}
        console.log(check.length)
        return check.length
    }

    return (
        <div className="overlayWBig">
            <div className="SBWBigTeam P1"><div className={cx('P1 SBWBigTeamName', { 'WBigSmallTitle': lengthcheck("p1team") >= 30, })}>{board.p1team}</div></div>
            <div className="SBWBigTeam P2"><div className={cx('P2 SBWBigTeamName', { 'WBigSmallTitle': lengthcheck("p2team") >= 30, })}>{board.p2team}</div></div>

            <div className="SBWBigPlayers P1">
                <div className='SBWBigPlayer P1'>
                    <span className={cx('player',{ 'selected': board.wPos === "top",'deselected': board.wPos === "bottom",'none': board.wPos === "none" })}>{board.p1top}</span>
                <div className={cx('P1 SBWBigIcon', { 'hidden': board.p1topX === false, 'iconappear': board.p1topX === true })}> <GiSkullCrossedBones /> </div></div>
                <div className='SBWBigPlayer P1'>
                    <span className={cx('player',{ 'selected': board.wPos === "bottom",'deselected': board.wPos === "top",'none': board.wPos === "none" })}>{board.p1bottom}</span>
                <div className={cx('P1 SBWBigIcon', { 'hidden': board.p1bottomX === false, 'iconappear': board.p1bottomX === true  })}> <GiSkullCrossedBones /> </div></div>
            </div>

            <div className="SBWBigVs" />

            <div className="SBWBigPlayers P2">
                <div className='SBWBigPlayer P2'>
                    <span className={cx('player',{ 'selected': board.wPos === "top",'deselected': board.wPos === "bottom",'none': board.wPos === "none" })}>{board.p2top}</span>
                <div className={cx('P2 SBWBigIcon', { 'hidden': board.p2topX === false, 'iconappear': board.p2topX === true  })}> <GiSkullCrossedBones /> </div></div>
                <div className='SBWBigPlayer P2'>
                    <span className={cx('player',{ 'selected': board.wPos === "bottom",'deselected': board.wPos === "top",'none': board.wPos === "none" })}>{board.p2bottom}</span>
                <div className={cx('P2 SBWBigIcon', { 'hidden': board.p2bottomX === false, 'iconappear': board.p2bottomX === true  })}> <GiSkullCrossedBones /> </div></div>
            </div>

            <div className={cx(board.p1topChar + ' character p1 top', { 'destroyed': board.p1topX === true })} />
            <div className={cx(board.p1bottomChar + ' character p1 bottom', { 'destroyed': board.p1bottomX === true })} />
            <div className={cx(board.p2topChar + ' character p2 top', { 'destroyed': board.p2topX === true })} />
            <div className={cx(board.p2bottomChar + ' character p2 bottom', { 'destroyed': board.p2bottomX === true })} />

            <div className="overlayGrad" />
            <div className="transition" />
        </div>
    )
}
export default SBWBig