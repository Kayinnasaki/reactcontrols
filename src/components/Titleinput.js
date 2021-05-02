const Titleinput = ({board, entry, set, place}) => (
        <div>
           <input className="wbInput titleInput" value={board[entry]} placeholder={place} onChange={e => set({[entry]: e.target.value})}/> 
        </div>
)

export default Titleinput
