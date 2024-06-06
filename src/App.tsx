import { useEffect, useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import Recipe from "./Types/Recipe";
import RecipeCardContainer from "./Containers/RecipeCardContainer/RecipeCardContainer";

const App = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    getRecipes();
  }, []);

  const getRecipes = async () => {
    const response = await fetch("http://localhost:8080/recipes");
    const result = await response.json();
    console.log(result);
    setRecipes(result);
  };

  return (
    <div>
      <Navbar heading="Recipe Book" />
      {/* Placeholder Navbar */}
      {/* <Navbar /> */}
      <RecipeCardContainer recipes={recipes} />
    </div>
  );
};

export default App;
