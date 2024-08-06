import Button from "../Button/Button";
import "./NavbarButtons.scss";
import { Link } from "react-router-dom";

type NavbarButtonsProps = {
  buttonOneHeading: string;
  buttonTwoHeading: string;
  buttonThreeHeading: string;
};

{
  /* TODO - Rework to take in number and string array & use these to populate buttons ?*/
}

const NavbarButtons = ({
  buttonOneHeading,
  buttonTwoHeading,
  buttonThreeHeading,
}: NavbarButtonsProps) => {
  return (
    <div className="navbar-buttons">
      <Button heading={buttonOneHeading} />
      <Link to={"/create"}>
        <Button heading={buttonTwoHeading} />
      </Link>
      <Button heading={buttonThreeHeading} />
    </div>
  );
};

export default NavbarButtons;
