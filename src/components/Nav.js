import { NavLink } from "react-router-dom";
  
const Nav = () => {
    return (
        <div className="nav">
          <NavLink to="/" activeClassName="current" exact>Home</NavLink> :
          <NavLink to="/controls" activeClassName="current"> Controlboard</NavLink> :
          <NavLink to="/waseda" activeClassName="current"> Waseda</NavLink> : 
          <NavLink to="/boardlist/" activeClassName="current"> Scoreboards</NavLink>
        </div>
    )
}

export default Nav
