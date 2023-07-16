import { GoTriangleUp } from 'react-icons/go'
import { GoTriangleDown } from 'react-icons/go'
import cx from 'classnames'
import { GoX } from 'react-icons/go'
import cloneDeep from 'clone-deep'

const Player = ({ player, players, set, index, motion, motionSet }) => {
  const handleChange = (e, entry) => {
    const newTeams = cloneDeep(players)
    newTeams[index][entry] = e.target.value
    set(newTeams)
  }

  const moveTeam = (num) => {
    // Don't let shit break
    if (num == undefined) return
    if (index + num < 0 || index + num >= players.length) return

    motionSet(-1,-1)

    const playerClone = cloneDeep(players)
    playerClone[index + num] = players[index]
    playerClone[index] = players[index + num]
    set(playerClone)

    const a = [index, index + num]
    a.sort((b, c) => b - c)
    motionSet(a)
  }

  const deleteTeam = () => {
    motionSet(-1,-1)
    const playerClone = cloneDeep(players)
    playerClone.splice(index, 1)
    set(playerClone)
  }

  return (
    <div className={cx('ttTeam', {
      'ttMoveDown': index == motion[0],
      'ttMoveUp': index == motion[1],
    })}>
      <div className="ttSide">[{index}]</div>
      <div className="ttTicker">
        <div className="ttTickerButton" onClick={() => moveTeam(-1)}><GoTriangleUp /></div>
        <div className="ttTickerButton" onClick={() => moveTeam(1)}><GoTriangleDown /></div>
      </div>
      <div><input className="ttInput ttTeamName" value={player.label} onChange={e => { handleChange(e, "label") }} /></div>
      <input list="chars" onClick={e => e.target.value = ""} className="ttInput ttList" value={player.char} onChange={e => { handleChange(e, "char") }} />

      <input className="ttInput titleInput" value={player.pronouns} onChange={e => { handleChange(e, "pronouns") }} />
      <input className="ttInput titleInput ttLong" value={player.team} onChange={e => { handleChange(e, "team") }} />
      <div className="ttX" onClick={deleteTeam}><GoX /></div>
    </div>
  )
}

export default Player