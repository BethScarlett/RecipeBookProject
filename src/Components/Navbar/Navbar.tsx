//import NavbarButtons from "../NavbarButtons/NavbarButtons"
import "./Navbar.scss";

type NavbarProps = {
  heading?: string;
};

const Navbar = ({ heading }: NavbarProps) => {
  return (
    <div className="navbar">
      <h1 className="navbar__heading">{heading}</h1>
      <div className="navbar__buttons">
        {/* TODO - Add back later */}
        {/* <NavbarButtons buttonOneHeading="View" buttonTwoHeading="Create" buttonThreeHeading="Update"/> */}
      </div>
    </div>
  );
};

export default Navbar;
