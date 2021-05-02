const ScoreboardW = ({ scoreboard }) => (
    <div className="Scoreboard">
        <div className="sbSmall">{scoreboard.p1team}</div>
        <div className="sbHeaderPlayerSm sbR sbSmall sbP1">
            {scoreboard.p1top}<br />{scoreboard.p1bottom}
        </div>
        <div className="sbBox sbR sbSmall">
            {scoreboard.p1topX === true ? 'X' : 'O'}<br />
            {scoreboard.p1bottomX === true ? 'X' : 'O'}
        </div>



        <div className="sbBox sbL sbSmall">
            {scoreboard.p2topX === true ? 'X' : 'O'}<br />
            {scoreboard.p2bottomX === true ? 'X' : 'O'}
        </div>
        <div className="sbHeaderPlayerSm sbL sbSmall sbP2">
            {scoreboard.p2top}<br />{scoreboard.p2bottom}
        </div>
        <div className="sbSmall">{scoreboard.p2team}</div>
    </div>
)

export default ScoreboardW