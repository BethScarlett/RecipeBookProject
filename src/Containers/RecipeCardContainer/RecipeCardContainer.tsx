import "./RecipeCardContainer.scss";
import RecipeCard from "../../Components/RecipeCard/RecipeCard";
import Recipe from "../../Types/Recipe";

type RecipeCardContainerProps = {
  recipes: Recipe[];
};

const RecipeCardContainer = ({ recipes }: RecipeCardContainerProps) => {
  return (
    <div className="card-container">
      {recipes.map((recipe) => (
        <div key={recipe.id}>
          <RecipeCard name={recipe.name} description={recipe.description} />
        </div>
      ))}
    </div>
  );
};

export default RecipeCardContainer;
