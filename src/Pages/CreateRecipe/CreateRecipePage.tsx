import { FormEvent, useState } from "react";
import Select from "react-select";
import Recipe from "../../Types/Recipe";
import Steps from "../../Types/Steps";
import Ingredients from "../../Types/Ingredients";

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
    const deleteStep = [...steps];
    deleteStep.splice(i, 1);
    setSteps(deleteStep);
  };

  const handleRemoveIngredient = (i: number) => {
    const deleteIngredient = [...ingredients];
    deleteIngredient.splice(i, 1);
    setIngredients(deleteIngredient);
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
    //console.log("JSON of steps = " + JSON.stringify(steps));

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
    //console.log("JSON of steps = " + JSON.stringify(steps));

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
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h2></h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Recipe name: </label>
        <input
          type="text"
          name="name"
          onInput={(event) => handleInput(event, "name")}
        />
        <label htmlFor="description">Description: </label>
        <input
          type="text"
          name="description"
          onInput={(event) => handleInput(event, "description")}
        />
        <label htmlFor="category">Category: </label>
        <Select
          options={options}
          onChange={(event) => handleDropdownInput(event?.value, "category")}
          name="category"
        ></Select>
        <label htmlFor="img">Image: </label>
        <input
          type="text"
          name="img"
          onInput={(event) => handleInput(event, "img")}
        />
        <button type="button" onClick={handleAddStep}>
          Add steps:{" "}
        </button>
        {steps.map((step, i) => (
          <>
            <input
              name="step"
              placeholder={step.step}
              onChange={(event) => handleInput(event, "step", i)}
            />
            <button type="button" onClick={() => handleRemoveStep(i)}>
              Delete
            </button>
          </>
        ))}
        <button type="button" onClick={handleAddIngredient}>
          Add ingredients:{" "}
        </button>
        {ingredients.map((ingredient, i) => (
          <>
            <input
              name="step"
              placeholder={ingredient.name}
              onChange={(event) => handleInput(event, "ingredient", i)}
            />
            <button type="button" onClick={() => handleRemoveIngredient(i)}>
              Delete
            </button>
          </>
        ))}
        <button type="submit">Click to add</button>
      </form>
    </div>
  );
};

export default CreateRecipePage;
