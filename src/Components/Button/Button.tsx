
type ButtonProps = {
    heading: string;
}

const Button = ({heading} : ButtonProps) => {
  return (
    <button>{heading}</button>
  )
}

export default Button
