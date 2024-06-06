import "./RecipeCardExpanded.scss";
import { useParams } from "react-router-dom";
import Recipe from "../../Types/Recipe";
import placeholder from "../../assets/Celebration_Cake.png";
import { useEffect, useState } from "react";

type RecipeCardExpandedProps = {
  recipes: Recipe[];
};

const RecipeCardExpanded = ({ recipes }: RecipeCardExpandedProps) => {
  const { id } = useParams();
  const cleanId = Number(id);
  const [ingredients, setIngredients] = useState<String[]>();
  const [steps, setSteps] = useState<String[]>();

  const filteredRecipe = recipes.filter((recipe) => {
    return recipe.id == cleanId;
  });

  useEffect(() => {
    handleGetIngredients(cleanId);
    handleGetSteps(cleanId);
  }, []);

  const handleGetIngredients = async (cleanId: number) => {
    const response = await fetch(
      `http://localhost:8080/recipes/ingredients/${cleanId}`
    );
    const result = await response.json();
    setIngredients(result);
  };

  const handleGetSteps = async (cleanId: number) => {
    const response = await fetch(
      `http://localhost:8080/recipes/steps/${cleanId}`
    );
    const result = await response.json();
    setSteps(result);
  };

  return (
    <div className="expanded-card">
      <img
        src={placeholder}
        alt={filteredRecipe[0].name}
        className="expanded-card__image"
      />
      <h3 className="expanded-card__name">{filteredRecipe[0].name}</h3>
      <p>'{filteredRecipe[0].description}'</p>
      <p className="expanded-card__heading">Ingredients: </p>
      {ingredients &&
        ingredients.map((ingredient, index) => (
          <p key={index} className="expanded-card__line">
            {ingredient}
          </p>
        ))}
      <p className="expanded-card__heading">Steps: </p>
      {steps &&
        steps.map((step, index) => (
          <p key={index} className="expanded-card__line">
            Step {index + 1}: {step}
          </p>
        ))}
    </div>
  );
};

export default RecipeCardExpanded;
