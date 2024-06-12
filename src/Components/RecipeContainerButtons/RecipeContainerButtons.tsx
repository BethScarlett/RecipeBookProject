import "./RecipeContainerButtons.scss";
import Button from "../Button/Button";
import Recipe from "../../Types/Recipe";
import { useEffect, useState, MouseEventHandler } from "react";

type RecipeContainerButtonsProps = {
  recipes: Recipe[];
  handleFilterByCategory: MouseEventHandler<HTMLButtonElement>;
  selectedCategory?: string;
};

const RecipeContainerButtons = ({
  recipes,
  handleFilterByCategory,
  selectedCategory,
}: RecipeContainerButtonsProps) => {
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
      <Button
        key={Math.random()}
        heading="All"
        handleFilterByCategory={handleFilterByCategory}
        selectedCategory={selectedCategory}
      />
      {distinctCategories.map((category) => (
        <Button
          key={Math.random()}
          heading={category}
          handleFilterByCategory={handleFilterByCategory}
          selectedCategory={selectedCategory}
        />
      ))}
    </div>
  );
};

export default RecipeContainerButtons;
