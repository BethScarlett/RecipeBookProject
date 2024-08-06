import BurgerMenu from "../BurgerMenu/BurgerMenu";
import Button from "../Button/Button";
import "./Navbar.scss";
import { useState } from "react";
import { Link } from "react-router-dom";

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

      <div onClick={handleToggleMenu} className="navbar__burger">
        <BurgerMenu />
      </div>

      <div className={`navbar__buttons navbar__buttons--${showMenu}`}>
        <Link to={"/"}>
          <Button heading="View" />
        </Link>

        <Link to={"/create"}>
          <Button heading="Create" />
        </Link>
        <Button heading="Update" />
      </div>
    </div>
  );
};

export default Navbar;
