import BurgerMenu from "../BurgerMenu/BurgerMenu";
import NavbarButtons from "../NavbarButtons/NavbarButtons";
import "./Navbar.scss";
import { useState } from "react";

type NavbarProps = {
  heading?: string;
};

const Navbar = ({ heading }: NavbarProps) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const handleToggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="navbar">
      <h1 className="navbar__heading">{heading}</h1>
      <div className="navbar__buttons">
        <div onClick={handleToggleMenu}>
          <BurgerMenu />
        </div>
        {showMenu ? (
          <NavbarButtons
            buttonOneHeading="View"
            buttonTwoHeading="Create"
            buttonThreeHeading="Update"
          />
        ) : null}
      </div>
    </div>
  );
};

export default Navbar;
