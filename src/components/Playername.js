const Playername = ({board, entry, set, place}) => (
    <div className="wbPlayer">
        <input className="wbPlayerlist" list="players" value={board[entry]} placeholder={place} onChange={e => set({[entry]: e.target.value})}></input>
    </div>
)
export default Playername
