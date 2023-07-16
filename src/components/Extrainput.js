const Extrainput = ({board, entry, set, place}) => (
           <input className="wbInput extraInput" value={board[entry]} placeholder={place} onChange={e => set({[entry]: e.target.value})}/> 
)

export default Extrainput
