import RecipeCard from "../../Components/RecipeCard/RecipeCard";
import Recipe from "../../Types/Recipe";

type RecipeCardContainerProps = {
  recipes: Recipe[];
};

const RecipeCardContainer = ({ recipes }: RecipeCardContainerProps) => {
  return (
    <div>
      {recipes.map((recipe) => (
        <div key={recipe.id}>
          <RecipeCard
            name={recipe.name}
            desc={recipe.desc}
            suitableFor={recipe.suitableFor}
          />
        </div>
      ))}
    </div>
  );
};

export default RecipeCardContainer;
