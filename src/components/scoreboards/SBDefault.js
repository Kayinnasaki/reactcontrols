import './SBDefault.css'

const SBDefault = ({ board }) => (
    <div className="overlayDefault">
        <div id="p1name" className="p1name">{board.p1name}</div>
        <div id="p2name" className="p2name">{board.p2name}</div>

        <div id="p1score" className="p1score">{board.p1score}</div>
        <div id="p2score" className="p2score">{board.p2score}</div>

        <div className="title"><span id="title">{board.title}</span></div>
    </div>
)
export default SBDefault