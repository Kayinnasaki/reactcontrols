const Scoreboard = ({ scoreboard }) => (
    <div className="Scoreboard">

            {scoreboard.p1pronouns == "" ? (
                <div className="sbHeaderPlayerName p1">
                    <span>{scoreboard.p1name}</span>
                </div>
            ) : (
                <div className="sbHeaderPlayerName pro p1">
                    {scoreboard.p1name}<br />
                    <em>{scoreboard.p1pronouns}</em>
                </div>
            )}
            

        <div className="sbBox p1">{scoreboard.p1score}</div>
        <div className="sbTitle">{scoreboard.title}</div>
        <div className="sbBox p2">{scoreboard.p2score}</div>

            {scoreboard.p2pronouns == "" ? (
                <div className="sbHeaderPlayerName p2">
                    <span>{scoreboard.p2name}</span>
                </div>
            ) : (
                <div className="sbHeaderPlayerName pro p2">
                    {scoreboard.p2name}<br />
                    <em>{scoreboard.p2pronouns}</em>
                </div>
            )}


    </div>
)

export default Scoreboard