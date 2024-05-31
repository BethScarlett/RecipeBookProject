import Button from "../Button/Button";
import "./NavbarButtons.scss"

type NavbarButtonsProps = {
    buttonOneHeading: string;
    buttonTwoHeading: string;
    buttonThreeHeading: string;
}

const NavbarButtons = ({buttonOneHeading, buttonTwoHeading, buttonThreeHeading} : NavbarButtonsProps) => {
  return (
    <div className="navbar-buttons">
      <Button heading={buttonOneHeading}/>
      <Button heading={buttonTwoHeading}/>
      <Button heading={buttonThreeHeading}/>
    </div>
  )
}

export default NavbarButtons
