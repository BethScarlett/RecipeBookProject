import "./RecipeCardExpanded.scss";
import { useParams } from "react-router-dom";
import Recipe from "../../Types/Recipe";
import placeholder from "../../assets/Celebration_Cake.png";

type RecipeCardExpandedProps = {
  recipes: Recipe[];
};

const RecipeCardExpanded = ({ recipes }: RecipeCardExpandedProps) => {
  const { id } = useParams();

  const filteredRecipe = recipes.filter((recipe) => {
    return recipe.id == Number(id);
  });

  console.log(`Filtered recipe is: ${filteredRecipe}`);

  return (
    <div className="expanded-card">
      <img
        src={placeholder}
        alt={filteredRecipe[0].name}
        className="expanded-card__image"
      />
      <h3 className="expanded-card__name">{filteredRecipe[0].name}</h3>
      <p className="expanded-card__description">
        {filteredRecipe[0].description}
      </p>
    </div>
  );
};

export default RecipeCardExpanded;
