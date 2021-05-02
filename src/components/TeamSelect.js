import DataListInput from "react-datalist-input"

const TeamSelect = ({ board, side, set, teams }) => {
    const team = side + "team"
    const top = side + "top"
    const bottom = side + "bottom"
    const topX = side + "topX"
    const bottomX = side + "bottomX"
    const topChar = side + "topChar"
    const bottomChar = side + "bottomChar"

    const clearclick = true
    const checkStyle = side + "check"

    function teamChange(data) {
        set({
            [team]: data.label,
            [top]: data.top,
            [bottom]: data.bottom,
            [topChar]: data.topchar,
            [bottomChar]: data.bottomchar
        })
    }

    function onToggleX(x) {
        set({ [x]: !board[x] })
    }

    return (
        <div className="wbTeam">
            <DataListInput
                value={board[team] || ""}
                inputClassName="wbTeamlist"
                itemClassName="wbTeamitem"
                placeholder="Select a Team"
                items={teams}
                clearInputOnClick={clearclick}
                onSelect={teamChange}
            /><hr />
            <input className="wbPlayerlist plshort" list="players" value={board[top] || ""} placeholder="Top" onChange={e => set({ [top]: e.target.value })}></input>
            <input className={checkStyle} type="checkbox"
                onChange={() => onToggleX(topX)}
                checked={board[topX] || false}
            /><br />

            <input className="wbPlayerlist plshort" list="players" value={board[bottom] || ""} placeholder="Bottom" onChange={e => set({ [bottom]: e.target.value })}></input>
            <input className={checkStyle} type="checkbox"
                onChange={() => onToggleX(bottomX)}
                checked={board[bottomX] || false} /><br />

        </div>
    )
}
export default TeamSelect
