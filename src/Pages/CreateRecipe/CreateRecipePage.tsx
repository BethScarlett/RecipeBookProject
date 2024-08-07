import "./CreateRecipePage.scss";

import { FormEvent, useState } from "react";
import Select from "react-select";
import Recipe from "../../Types/Recipe";
import Steps from "../../Types/Steps";
import Ingredients from "../../Types/Ingredients";

import Navbar from "../../Components/Navbar/Navbar";

const CreateRecipePage = () => {
  //TODO - Move all this into a form component
  const defaultRecipeState = {
    id: -1,
    img: "",
    name: "",
    description: "",
    category: "Other",
  };

  const [recipe, setRecipe] = useState<Recipe>(defaultRecipeState);
  //TODO - Make it so the user can't go below 1 step/ingredient on the page
  const [steps, setSteps] = useState<Steps[]>([
    { id: -1, step: "", stepNumber: -1, recipe_id: -1 },
  ]);
  const [ingredients, setIngredients] = useState<Ingredients[]>([
    { id: -1, name: "", recipe_id: -1 },
  ]);

  //TODO - Add more options
  const options = [
    { value: "Meat", label: "Meat" },
    { value: "Baked Goods", label: "Baked Goods" },
    { value: "Sweet Treats", label: "Sweet Treats" },
  ];

  const handleInput = (
    event: FormEvent<HTMLInputElement>,
    key: string,
    i?: number
  ) => {
    if (key != "step" && key != "ingredient") {
      setRecipe({ ...recipe, [key]: event.currentTarget.value });
      console.log(recipe);
    } else {
      if (i == undefined) {
        return;
      } else if (key == "step") {
        let newSteps = [...steps];
        let newStep = { ...newSteps[i] };
        newStep.step = event.currentTarget.value;
        newStep.stepNumber = i + 1;
        newSteps[i] = newStep;
        console.log(newSteps);

        setSteps(newSteps);
      } else {
        let newIngredients = [...ingredients];
        let newIngredient = { ...newIngredients[i] };
        newIngredient.name = event.currentTarget.value;
        newIngredients[i] = newIngredient;
        console.log(newIngredients);

        setIngredients(newIngredients);
      }
    }
  };

  const handleDropdownInput = (event: string | undefined, key: string) => {
    if (event != undefined) {
      setRecipe({ ...recipe, [key]: event });
    }
    console.log(recipe);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createRecipe(recipe);
  };

  const handleAddStep = () => {
    setSteps([...steps, { id: -1, step: "", stepNumber: -1, recipe_id: -1 }]);
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { id: -1, name: "", recipe_id: -1 }]);
  };

  const handleRemoveStep = (i: number) => {
    if (steps.length > 1) {
      const deleteStep = [...steps];
      deleteStep.splice(i, 1);
      setSteps(deleteStep);
    }
  };

  const handleRemoveIngredient = (i: number) => {
    if (ingredients.length > 1) {
      const deleteIngredient = [...ingredients];
      deleteIngredient.splice(i, 1);
      setIngredients(deleteIngredient);
    }
  };

  const createRecipe = async (newRecipe: Recipe) => {
    try {
      const response = await fetch("http://localhost:8080/recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRecipe),
      });

      const result = await response.json();
      console.log("Success", result);
      createSteps(steps);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const createSteps = async (steps: Steps[]) => {
    try {
      const response = await fetch("http://localhost:8080/steps", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(steps),
      });

      const result = await response.json();
      console.log("Success", result);
      createIngredients(ingredients);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const createIngredients = async (ingredients: Ingredients[]) => {
    try {
      const response = await fetch("http://localhost:8080/ingredients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ingredients),
      });

      const result = await response.json();
      console.log("Success", result);
      alert("Recipe created successfully");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Navbar heading="Recipe Book" drawMenu={true} />
      <div className="create-recipe">
        <div className="create-recipe__heading">
          <span className="create-recipe__hole"></span>
          <span className="create-recipe__hole"></span>
          <span className="create-recipe__hole"></span>
        </div>

        <h2>Create a recipe</h2>
        <form onSubmit={handleSubmit} id="create-recipe__form">
          <div className="create-recipe__section">
            <label htmlFor="name">Recipe name: </label>
            <input
              type="text"
              name="name"
              onInput={(event) => handleInput(event, "name")}
              className="create-recipe__input"
            />
          </div>
          <div className="create-recipe__section">
            <label htmlFor="description">Description: </label>
            <input
              type="text"
              name="description"
              onInput={(event) => handleInput(event, "description")}
              className="create-recipe__input"
            />
          </div>
          <div className="create-recipe__section">
            <label className="create-recipe__label" htmlFor="category">
              Category:{" "}
            </label>
            <Select
              options={options}
              onChange={(event) =>
                handleDropdownInput(event?.value, "category")
              }
              name="category"
            ></Select>
          </div>
          <div className="create-recipe__section">
            <label htmlFor="img">Image: </label>
            <input
              type="text"
              name="img"
              onInput={(event) => handleInput(event, "img")}
              className="create-recipe__input"
            />
          </div>
          <div className="create-recipe__section">
            <button
              className="create-recipe__button"
              type="button"
              onClick={handleAddStep}
            >
              Add steps:{" "}
            </button>
            {/* TODO - Add keys to the maps */}
            {steps.map((step, i) => (
              <>
                <label className="create-recipe__label" htmlFor="step">
                  {i + 1}
                </label>
                <input
                  name="step"
                  placeholder={step.step}
                  onChange={(event) => handleInput(event, "step", i)}
                  className="create-recipe__input"
                />
                <button type="button" onClick={() => handleRemoveStep(i)}>
                  Delete
                </button>
              </>
            ))}
          </div>
          <div className="create-recipe__section">
            <button type="button" onClick={handleAddIngredient}>
              Add ingredients:{" "}
            </button>
            {ingredients.map((ingredient, i) => (
              <div className="create-recipe__ingredient">
                <label className="create-recipe__label" htmlFor="ingredient">
                  {i + 1}
                </label>
                <input
                  name="ingredient"
                  placeholder={ingredient.name}
                  onChange={(event) => handleInput(event, "ingredient", i)}
                  className="create-recipe__input"
                />
                <button type="button" onClick={() => handleRemoveIngredient(i)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
          <button type="submit">Click to add</button>
        </form>
      </div>
    </>
  );
};

export default CreateRecipePage;
