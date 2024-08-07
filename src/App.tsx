import { useEffect, useState } from "react";
import Recipe from "./Types/Recipe";
import RecipeCardContainer from "./Containers/RecipeCardContainer/RecipeCardContainer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RecipeCardExpanded from "./Components/RecipeCardExpanded/RecipeCardExpanded";
import CreateRecipePage from "./Pages/CreateRecipe/CreateRecipePage";
import LoginPage from "./Pages/Login/LoginPage";

const App = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const getRecipes = async () => {
    const response = await fetch("http://localhost:8080/recipes");
    const result = await response.json();
    console.log(result);
    setRecipes(result);
  };

  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<RecipeCardContainer recipes={recipes} />} />
          <Route
            path="/recipe/:id"
            element={<RecipeCardExpanded recipes={recipes} />}
          />
          <Route path="/create" element={<CreateRecipePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
