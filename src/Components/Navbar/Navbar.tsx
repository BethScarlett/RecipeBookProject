import NavbarButtons from "../NavbarButtons/NavbarButtons"
import "./Navbar.scss";

const Navbar = () => {
  return (
    <div className="navbar">
      <h1 className="navbar__heading">Recipe Book</h1>
      <div className="navbar__buttons">
        <NavbarButtons buttonOneHeading="View" buttonTwoHeading="Create" buttonThreeHeading="Update"/>
      </div>
    </div>
  )
}

export default Navbar
