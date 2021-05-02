import Collapsible from 'react-collapsible';
import { useState } from 'react'
import { v4 as uuid } from 'uuid';
import { useEffect } from 'react'

function lineFormat(d) {
    let temp = ""
    d.forEach(e => {
        temp = temp + e.label + "\n" 
    })
    return temp
}

const DataToolSimple = ({ data, set, style, open=false }) => {
    const [textzone, textzoneSet] = useState(lineFormat(data))

    const refresh = () => {
        textzoneSet(lineFormat(data))
    }

    const save = () => {
        let split = textzone.split('\n')
        let array = []
        split.forEach(e => {
            array.push({
                "label": e,
                "key": uuid()
            })
        })
        set(array)
    }

    useEffect(() => {
        refresh()
    }, [data]);

    return (
        <Collapsible trigger="Simple List" className={style} openedClassName={style} triggerClassName={style} triggerOpenedClassName={style} open={open}>
     
            <textarea value={textzone} className={style} onChange={e => textzoneSet(e.target.value)}></textarea><br/>
            <button onClick={refresh}>Refresh</button><button onClick={save}>save</button>
       
        </Collapsible>
    )
}

export default DataToolSimple