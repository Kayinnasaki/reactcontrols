import DataListInput from "react-datalist-input"

const PlayerSelect = ({ board, side, set, players }) => {
    const pname = side + "name"
    const char = side + "char"
    const rank = side + "rank"
    const bio = side + "bio"

    const clearclick = true
    const checkStyle = side + "check"

    const match = (currentInput, item) =>
  item.label.toLowerCase().includes(currentInput.toLowerCase());

    function PlayerChange(data) {
        set({
            [pname]: data.label,
            [char]: data.top || "",
            [rank]: data.bottom || "",
            [bio]: data.topchar || "",
        })
    }

    function TypeChange(e) {
        set({
            [pname]: e,
        })
    }

    return (
        <div className="wbPlayer">
            <DataListInput
                value={board[pname] || ""}
                inputClassName="wbTeamlist"
                itemClassName="wbTeamitem"
                placeholder="Select Player"
                items={players}
                onInput={TypeChange}
                clearInputOnClick={clearclick}
                onSelect={PlayerChange}
            />
        </div>
    )
}
export default PlayerSelect
