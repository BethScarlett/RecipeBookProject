import placeholder from "../../assets/Celebration_Cake.png";
import suitableFor from "../../Types/SuitableFor";

type RecipeCardProps = {
  name: string;
  desc: string;
  suitableFor: suitableFor[];
};

const RecipeCard = ({ name, desc, suitableFor }: RecipeCardProps) => {
  return (
    <div>
      <img src={placeholder} alt={name} />
      <h3>{name}</h3>
      <p>{desc}</p>
      {suitableFor.map((line) => (
        <div key={Math.random()}>{line.suitableFor}</div>
      ))}
    </div>
  );
};

export default RecipeCard;
