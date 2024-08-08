import { useState } from "react";
import Recipe from "./Types/Recipe";
import Login from "./Types/Login";
import RecipeCardContainer from "./Containers/RecipeCardContainer/RecipeCardContainer";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import RecipeCardExpanded from "./Components/RecipeCardExpanded/RecipeCardExpanded";
import CreateRecipePage from "./Pages/CreateRecipe/CreateRecipePage";
import LoginPage from "./Pages/Login/LoginPage";

const App = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [validLogin, setValidLogin] = useState<boolean>(false);

  const handleLogin = async (details: Login) => {
    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(details),
      });
      const result = await response.json();
      setRecipes(result);
      setValidLogin(true);
      console.log(result);
    } catch (Error) {
      console.log("No user found - Catch");
      console.log(Error);
    }
  };

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              validLogin ? (
                <Navigate replace to={"/home"} />
              ) : (
                <LoginPage handleLogin={handleLogin} />
              )
            }
          />
          <Route
            path="/home"
            element={<RecipeCardContainer recipes={recipes} />}
          />
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
