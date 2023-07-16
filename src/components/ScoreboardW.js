const ScoreboardW = ({ scoreboard }) => (
    <div className="Scoreboard Waseda">
        <div className="WsbSmall">{scoreboard.p1team}</div>
        <div className="WsbHeaderPlayerSm WsbR WsbSmall WsbP1">
            {scoreboard.p1top}<br />{scoreboard.p1bottom}
        </div>
        <div className="WsbBox WsbR WsbSmall">
            {scoreboard.p1topX === true ? 'X' : 'O'}<br />
            {scoreboard.p1bottomX === true ? 'X' : 'O'}
        </div>



        <div className="WsbBox WsbL WsbSmall">
            {scoreboard.p2topX === true ? 'X' : 'O'}<br />
            {scoreboard.p2bottomX === true ? 'X' : 'O'}
        </div>
        <div className="WsbHeaderPlayerSm WsbL WsbSmall WsbP2">
            {scoreboard.p2top}<br />{scoreboard.p2bottom}
        </div>
        <div className="WsbSmall">{scoreboard.p2team}</div>
    </div>
)

export default ScoreboardW