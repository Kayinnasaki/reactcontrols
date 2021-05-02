import './SBWaseda.css'
import cx from 'classnames'
import pointer1 from './images/SBWasebaPointer1.png'
import pointer2 from './images/SBWasebaPointer2.png'

const SBWaseda = ({ board }) => {

    function lengthcheck(entry) {
        const check = board[entry]
        console.log( board.p1team + " " + entry)
        if (check === undefined) {
            return 0
        } else {
        return check.length
        }
    }

    return (
        <div className="overlayWaseda">

            <img src={pointer1} className={cx('wsbP1P', {
                'wsbPTop': (board.wPos === 'top') || (board.wPos === 'none' && board.p1topX === false && board.p1bottomX === true),
                'wsbPBottom': (board.wPos === 'bottom') || (board.wPos === 'none' && board.p1topX === true && board.p1bottomX === false),
                'wsbPNone': ((board.wPos === 'none') && (board.p1topX === false && board.p1bottomX === false)) || (board.p1topX === true && board.p1bottomX === true),

            })} />

            <img src={pointer2} className={cx('wsbP2P', {
                'wsbPTop': (board.wPos === 'top') || (board.wPos === 'none' && board.p2topX === false && board.p2bottomX === true),
                'wsbPBottom': (board.wPos === 'bottom') || (board.wPos === 'none' && board.p2topX === true && board.p2bottomX === false),
                'wsbPNone': ((board.wPos === 'none') && (board.p2topX === false && board.p2bottomX === false)) || (board.p2topX === true && board.p2bottomX === true),
            })} />



            <div className={cx('wsbPlayer wsbP1 wsbTop', {
                'wsbSelected': board.wPos === 'top' || (board.wPos === 'none' && board.p1bottomX === true),
                'wsbSmall': board.wPos === 'bottom',
                'wsbNeutral': board.wPos === 'none' && board.p1bottomX === false,
                'wsbElim': board.p1topX === true,
            })}>{board.p1top}</div>

            <div className={cx('wsbPlayer wsbP1 wsbBottom', {
                'wsbSmall': board.wPos === 'top',
                'wsbSelected': board.wPos === 'bottom' || (board.wPos === 'none' && board.p1topX === true),
                'wsbNeutral': board.wPos === 'none' && board.p1topX === false,
                'wsbElim': board.p1bottomX === true,
            })}>{board.p1bottom}</div>

            <div className={cx('wsbPlayer wsbP2 wsbTop', {
                'wsbSelected': board.wPos === 'top' || (board.wPos === 'none' && board.p2bottomX === true),
                'wsbSmall': board.wPos === 'bottom',
                'wsbNeutral': board.wPos === 'none' && board.p2bottomX === false,
                'wsbElim': board.p2topX === true,
            })}>{board.p2top}</div>

            <div className={cx('wsbPlayer wsbP2 wsbBottom', {
                'wsbSmall': board.wPos === 'top',
                'wsbSelected': board.wPos === 'bottom' || (board.wPos === 'none' && board.p2topX === true),
                'wsbNeutral': board.wPos === 'none' && board.p2topX === false,
                'wsbElim': board.p2bottomX === true,
            })}>{board.p2bottom}</div>

            <div className={cx('wsbTeamP1', {
                'wsbSmallTitle': lengthcheck("p1team") >= 30,
            })}>{board.p1team}</div>
            <div className="wsbTeamP2">{board.p2team}</div>


            <div className="title"><span id="title">{board.title}</span></div>
        </div>
    )
}
export default SBWaseda