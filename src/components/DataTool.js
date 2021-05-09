import Collapsible from 'react-collapsible';
import { useState } from 'react'
import isJson from 'is-valid-json'
import { useEffect } from 'react'

const DataTool = ({ data, set, style, open=false }) => {
    const [textzone, textzoneSet] = useState(JSON.stringify(data, null, "\t"))

    const refresh = () => {
        textzoneSet(JSON.stringify(data, null, "\t"))
    }

    const save = () => {
        if (isJson(textzone) == false) return
        set(JSON.parse(textzone))
    }

    useEffect(() => {
        refresh()
    }, [data]);

    return (
        <Collapsible trigger="Raw Tool" className={style} openedClassName={style} triggerClassName={style} triggerOpenedClassName={style} open={open}>
     
            <textarea value={textzone} className={style} onChange={e => textzoneSet(e.target.value)}></textarea><br/>
            <button onClick={refresh}>Refresh</button><button onClick={save}>save</button>
       
        </Collapsible>
    )
}

export default DataTool