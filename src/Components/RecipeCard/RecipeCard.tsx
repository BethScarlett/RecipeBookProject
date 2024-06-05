import "./RecipeCard.scss";
import placeholder from "../../assets/Celebration_Cake.png";

type RecipeCardProps = {
  name: string;
  description: string;
};

const RecipeCard = ({ name, description }: RecipeCardProps) => {
  return (
    <div className="card">
      <img src={placeholder} alt={name} className="card__image" />
      <h3 className="card__name">{name}</h3>
      <p className="card__description">{description}</p>
    </div>
  );
};

export default RecipeCard;
