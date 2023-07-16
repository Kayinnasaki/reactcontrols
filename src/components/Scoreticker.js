import { GoTriangleUp } from 'react-icons/go'
import { GoTriangleDown } from 'react-icons/go'
import { useEffect } from 'react'

let update = 0;
const Scoreticker = ({ board, entry, set, submit }) => {
    useEffect(() => {
        if (update === 1) {
            console.log("Forcing Update")
            update = 0
            submit()
        }

    })

    const AddScore = (val) => {
        update = 1
        set({[entry]: parseInt(board[entry]) + val})
    }

    return (
        <div className="stBox" >
            <div className="stTab top" onClick={() => AddScore(1)}><GoTriangleUp /></div>
            <input className="stNumber wbInput" type="number" value={board[entry]} onChange={e => set({[entry]: e.target.value})} />
            <div className="stTab bottom" onClick={() => AddScore(-1)}><GoTriangleDown /></div>
        </div>
    )
}

export default Scoreticker