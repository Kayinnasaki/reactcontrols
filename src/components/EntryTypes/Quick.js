import { GoTriangleUp } from 'react-icons/go'
import { GoTriangleDown } from 'react-icons/go'
import cx from 'classnames'
import { GoX } from 'react-icons/go'
import cloneDeep from 'clone-deep'
import DataListInput from "react-datalist-input"

const Quick = ({ quick, quicklists, players, set, index, motion, motionSet }) => {
  const clearclick = true

  const selectChange = (e, entry) => {
    let newQuicks = cloneDeep(quicklists)
    console.log(e)
    console.log("testddd " + e.label)
    newQuicks[index][entry] = e.label
    newQuicks[index].label = newQuicks[index].p1name + " vs " + newQuicks[index].p2name
    set(newQuicks)
  }

  const typeChange = (e, entry) => {
    let newQuicks = cloneDeep(quicklists)
    console.log(e)
    console.log("testddd " + e.target.value)
    newQuicks[index][entry] = e.target.value
    newQuicks[index].label = newQuicks[index].p1name + " vs " + newQuicks[index].p2name
    set(newQuicks)
  }

  const moveQuick = (num) => {
    // Don't let shit break
    if (num == undefined) return
    if (index + num < 0 || index + num >= quicklists.length) return

    motionSet(-1, -1)

    const quickClone = cloneDeep(quicklists)
    quickClone[index + num] = quicklists[index]
    quickClone[index] = quicklists[index + num]
    set(quickClone)

    const a = [index, index + num]
    a.sort((b, c) => b - c)
    motionSet(a)
  }

  const deleteQuick = () => {
    motionSet(-1, -1)
    const quickClone = cloneDeep(quicklists)
    quickClone.splice(index, 1)
    set(quickClone)
  }

  return (
    <div className={cx('ttTeam', {
      'ttMoveDown': index == motion[0],
      'ttMoveUp': index == motion[1],
    })}>
      <div className="ttSide">[{index}]</div>
      <div className="ttTicker">
        <div className="ttTickerButton" onClick={() => moveQuick(-1)}><GoTriangleUp /></div>
        <div className="ttTickerButton" onClick={() => moveQuick(1)}><GoTriangleDown /></div>
      </div>
      <div className="lazy30">
      <DataListInput
        value={quick.p1name}
        inputClassName="ttquicklist"
        itemClassName="wbTeamitem"
        placeholder="Select Player"
        items={players}
        onInput={e => { selectChange(e, "p1name") }}
        clearInputOnClick={clearclick}
        onSelect={e => { selectChange(e, "p1name") }}
      />
      </div>
      <div>
      <DataListInput
        value={quick.p2name}
        inputClassName="ttquicklist"
        itemClassName="wbTeamitem"
        placeholder="Select Player"
        items={players}
        onInput={e => { selectChange(e, "p2name") }}
        clearInputOnClick={clearclick}
        onSelect={e => { selectChange(e, "p2name") }}
      />
      </div>

      <input className="ttInput titleInput ttLong" value={quick.title} onChange={e => { typeChange(e, "title") }} />
      <div className="ttX" onClick={deleteQuick}><GoX /></div>
    </div>
  )
}

export default Quick