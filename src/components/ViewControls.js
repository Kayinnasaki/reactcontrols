import Nav from './Nav'
import WS from './WS'

const ViewControls = ({ type }) => (
    <div>
        <Nav/>
        <WS type={type}/>
    </div>
)
export default ViewControls