import "./Button.scss";
import { MouseEventHandler, useEffect, useState } from "react";

type ButtonProps = {
  heading: string;
  handleFilterByCategory?: MouseEventHandler<HTMLButtonElement>;
  selectedCategory?: string;
  buttonType: "menu" | "category";
};

const Button = ({
  heading,
  handleFilterByCategory,
  selectedCategory,
  buttonType,
}: ButtonProps) => {
  const [variant, setVariant] = useState<string>("off");

  useEffect(() => {
    console.log("-------------------");
    console.log(`The current selected category is ${selectedCategory}`);
    console.log(`The current heading is ${heading}`);
    console.log("-------------------");
    if (selectedCategory == heading) {
      console.log(`Changing ${heading} to on`);
      setVariant("on");
    }
  }, []);

  return (
    <button
      onClick={handleFilterByCategory}
      id={heading}
      className={`${buttonType} ${buttonType}--${variant}`}
    >
      {heading}
    </button>
  );
};

export default Button;
