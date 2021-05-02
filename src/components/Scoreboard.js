const Scoreboard = ({ scoreboard }) => (
    <div className="Scoreboard">
        <div className="sbHeaderPlayer sbR">
            {scoreboard.p1name}
            <div className="sbBox sbR">{scoreboard.p1score}</div>
        </div>
        <div className="sbTitle">{scoreboard.title}</div>
        <div className="sbHeaderPlayer sbL">
            <div className="sbBox sbL">{scoreboard.p2score}</div>
            {scoreboard.p2name}
        </div>
    </div>
)

export default Scoreboard