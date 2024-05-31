import Button from "../Button/Button";

type NavbarButtonsProps = {
    buttonOneHeading: string;
    buttonTwoHeading: string;
    buttonThreeHeading: string;
}

const NavbarButtons = ({buttonOneHeading, buttonTwoHeading, buttonThreeHeading} : NavbarButtonsProps) => {
  return (
    <div>
      <Button heading={buttonOneHeading}/>
      <Button heading={buttonTwoHeading}/>
      <Button heading={buttonThreeHeading}/>
    </div>
  )
}

export default NavbarButtons
