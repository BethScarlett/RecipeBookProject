import { useEffect, useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import Recipe from "./Types/Recipe";
import RecipeCardContainer from "./Containers/RecipeCardContainer/RecipeCardContainer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RecipeCardExpanded from "./Components/RecipeCardExpanded/RecipeCardExpanded";

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
      <BrowserRouter>
        <Navbar heading="Recipe Book" />
        <Routes>
          <Route path="/" element={<RecipeCardContainer recipes={recipes} />} />
          <Route
            path="/recipe/:id"
            element={<RecipeCardExpanded recipes={recipes} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
