import { GoTriangleUp } from 'react-icons/go'
import { GoTriangleDown } from 'react-icons/go'
import cx from 'classnames'
import { GoX } from 'react-icons/go'
import cloneDeep from 'clone-deep'

const Team = ({ team, teams, set, index, motion, motionSet }) => {
  const handleChange = (e, entry) => {
    const newTeams = cloneDeep(teams)
    newTeams[index][entry] = e.target.value
    set(newTeams)
  }

  const moveTeam = (num) => {
    // Don't let shit break
    if (num == undefined) return
    if (index + num < 0 || index + num >= teams.length) return

    motionSet(-1,-1)

    const teamClone = cloneDeep(teams)
    teamClone[index + num] = teams[index]
    teamClone[index] = teams[index + num]
    set(teamClone)

    const a = [index, index + num]
    a.sort((b, c) => b - c)
    motionSet(a)
  }

  const deleteTeam = () => {
    motionSet(-1,-1)
    const teamClone = cloneDeep(teams)
    teamClone.splice(index, 1)
    set(teamClone)
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
      <div><input className="ttInput ttTeamName" value={team.label} onChange={e => { handleChange(e, "label") }} /></div>
      <input className="ttInput titleInput" value={team.top} onChange={e => { handleChange(e, "top") }} />
      <input list="chars" onClick={e => e.target.value = ""} className="ttInput ttList" value={team.topchar} onChange={e => { handleChange(e, "topchar") }} />
      <input className="ttInput titleInput" value={team.bottom} onChange={e => { handleChange(e, "bottom") }} />
      <input list="chars" onClick={e => e.target.value = ""} className="ttInput ttList" value={team.bottomchar} onChange={e => { handleChange(e, "bottomchar") }} />
      <div className="ttX" onClick={deleteTeam}><GoX /></div>
    </div>
  )
}

export default Team