import React from 'react'
import { useState } from 'react'
import { v4 as uuid } from 'uuid';
import isJson from 'is-valid-json'
import cloneDeep from 'clone-deep'
import Player from './EntryTypes/Player'
import Team from './EntryTypes/Team'
import Quick from './EntryTypes/Quick'

const DataDisplay = ({data, set, extra, type, dataPush}) => {
    const [motion, motionSet] = useState([-1, -1])
    
    const sort = () => {
        motionSet(-1, -1)
        const dataClone = cloneDeep(data)
        dataClone.sort(function (a, b) {
            if (a.label < b.label) { return -1; }
            if (a.label > b.label) { return 1; }
            return 0;
        })
        set(dataClone)
    }

    const addEntry = () => {
        motionSet(-1, -1)
        const dataClone = cloneDeep(data)
        dataClone.push({
            label: "", key: uuid(),
        })
        set(dataClone)
    }
    
    const save = () => {
        localStorage.setItem(type, JSON.stringify(data))
    }

    const load = () => {
        if (isJson(JSON.parse(localStorage.getItem(type))) == false) return

        set(JSON.parse(localStorage.getItem(type)))
        motionSet(-1, -1)
    }

    function listSelect(entry, index) {
        switch (type) {
            case 'waseda':
                return <Team team={entry} teams={data} index={index} set={set} motion={motion} motionSet={motionSet} />
            case 'quick':
                return <Quick quick={entry} quicklists={data} players={extra} index={index} set={set} motion={motion} motionSet={motionSet}/>
            default:
                return <Player player={entry} players={data} index={index} set={set} motion={motion} motionSet={motionSet} />
        }
    }

    return (
        <div>
            {data.map((entry, index) => {

                // Find duplicate Keys
                const test = data.find((o) => o.key === entry.key && o.label !== entry.label)
                // If duplicate keys exist (or if Keys are undefined), regenerate them
                if (test !== undefined || entry.key == undefined) entry.key = uuid()
                return (
                    <div key={entry.key}>
                        {listSelect(entry, index)}
                    </div>
                )
            })}
            
            <div className="ttFooter">

                <button className="ttFooterButton button" onClick={save}>Save Data</button>
                <button className="ttFooterButton button" onClick={load}>Load Data</button>
                <button className="ttFooterButton button" onClick={dataPush}>Push to Server</button>

                <button className="ttFooterButton button" onClick={sort}>Sort</button>
                <button className="ttFooterButton ttFooterAdd button" onClick={addEntry}>+</button>
            </div>
        </div >
    )
}

export default DataDisplay