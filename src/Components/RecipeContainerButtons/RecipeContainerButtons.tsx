import "./RecipeContainerButtons.scss";
import Button from "../Button/Button";
import Recipe from "../../Types/Recipe";
import { useEffect, useState } from "react";

type RecipeContainerButtonsProps = {
  recipes: Recipe[];
};

const RecipeContainerButtons = ({ recipes }: RecipeContainerButtonsProps) => {
  const [distinctCategories, setDistinctCategories] = useState<string[]>([]);

  useEffect(() => {
    getDistinctCategories();
  }, [recipes]);

  const getDistinctCategories = () => {
    const filteredCategories: string[] = [];
    recipes.map((recipe) => {
      if (!filteredCategories.includes(recipe.category)) {
        filteredCategories.push(recipe.category);
      }
    });
    setDistinctCategories(filteredCategories);
  };

  return (
    <div className="buttons">
      <Button heading="All" />
      {distinctCategories.map((category) => (
        <Button heading={category} key={Math.random()} />
      ))}
    </div>
  );
};

export default RecipeContainerButtons;
