import "./RecipeCardContainer.scss";
import RecipeCard from "../../Components/RecipeCard/RecipeCard";
import Recipe from "../../Types/Recipe";
import { Link } from "react-router-dom";

type RecipeCardContainerProps = {
  recipes: Recipe[];
};

const RecipeCardContainer = ({ recipes }: RecipeCardContainerProps) => {
  return (
    <div className="card-container">
      {recipes.map((recipe) => (
        <Link key={recipe.id} to={`/recipe/${recipe.id}`}>
          <RecipeCard name={recipe.name} description={recipe.description} />
        </Link>
      ))}
    </div>
  );
};

export default RecipeCardContainer;
