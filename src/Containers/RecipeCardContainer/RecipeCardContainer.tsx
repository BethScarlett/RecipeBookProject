import "./RecipeCardContainer.scss";
import RecipeCard from "../../Components/RecipeCard/RecipeCard";
import Recipe from "../../Types/Recipe";
import { Link } from "react-router-dom";
import { ChangeEvent, useEffect, useState, FormEvent } from "react";
import RecipeContainerButtons from "../../Components/RecipeContainerButtons/RecipeContainerButtons";

type RecipeCardContainerProps = {
  recipes: Recipe[];
};

const RecipeCardContainer = ({ recipes }: RecipeCardContainerProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    setFilteredRecipes(recipes);
  }, [recipes]);

  useEffect(() => {
    handleFilterRecipes(searchTerm);
  }, [searchTerm]);

  //TODO - Remove category filter when buttons are complete?
  const handleFilterRecipes = (searchTerm: string) => {
    setFilteredRecipes(
      recipes.filter((recipe) => {
        if (
          recipe.name.includes(searchTerm) ||
          recipe.category.includes(searchTerm)
        ) {
          return recipe;
        }
      })
    );
  };

  const handleFilterByCategory = (event: FormEvent<HTMLButtonElement>) => {
    let searchTerm = event.currentTarget.id;
    console.log(searchTerm);
    setSelectedCategory(searchTerm);
    if (searchTerm == "All") {
      searchTerm = "";
    }
    handleFilterRecipes(searchTerm);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const cleanInput =
      e.currentTarget.value.slice(0, 1).toUpperCase() +
      e.currentTarget.value.slice(1);
    setSearchTerm(cleanInput);
  };

  return (
    <div className="card-container">
      <label htmlFor="search">Search By Name/Category: </label>
      <input
        type="text"
        className="card-container__search"
        id="search"
        onChange={handleInputChange}
      />
      <RecipeContainerButtons
        recipes={recipes}
        handleFilterByCategory={handleFilterByCategory}
        selectedCategory={selectedCategory}
      />
      {filteredRecipes.map((recipe) => (
        <Link key={recipe.id} to={`/recipe/${recipe.id}`}>
          <RecipeCard name={recipe.name} description={recipe.description} />
        </Link>
      ))}
    </div>
  );
};

export default RecipeCardContainer;
