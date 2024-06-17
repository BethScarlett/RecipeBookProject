import { FormEvent, useState } from "react";
import Select from "react-select";
import Recipe from "../../Types/Recipe";
import Steps from "../../Types/Steps";

const CreateRecipePage = () => {
  //TODO - Move all this into a form component
  const defaultRecipeState = {
    id: -1,
    img: "",
    name: "",
    description: "",
    category: "Other",
  };

  // const defaultStepsState = [
  //   {
  //   id: -1,
  //   step: "",
  //   step_number: 1,
  //   recipe_id: 100,
  //   }
  // ];

  const [recipe, setRecipe] = useState<Recipe>(defaultRecipeState);
  const [steps, setSteps] = useState<Steps[]>([
    { id: -1, step: "", step_number: -1, recipe_id: -1 },
  ]);

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
    if (key != "step") {
      setRecipe({ ...recipe, [key]: event.currentTarget.value });
      console.log(recipe);
    } else {
      if (i == undefined) {
        return;
      }
      let newSteps = [...steps];
      let newStep = { ...newSteps[i] };
      newStep.step = event.currentTarget.value;
      newStep.step_number = i + 1;
      newSteps[i] = newStep;
      console.log(newSteps);

      setSteps(newSteps);
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
    setSteps([...steps, { id: -1, step: "", step_number: -1, recipe_id: -1 }]);
  };

  const handleRemoveStep = (i: number) => {
    const deleteStep = [...steps];
    deleteStep.splice(i, 1);
    setSteps(deleteStep);
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
      handleGetRecipeID();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const createSteps = async (steps: Steps[], recipeId: number) => {
    const finalSteps = [...steps];
    finalSteps.forEach((step) => (step.recipe_id = recipeId));

    // console.log(
    //   "Array being sent has form of: id = " +
    //     finalSteps[2].id +
    //     "/ recipe id = " +
    //     finalSteps[2].recipe_id +
    //     "/ step = " +
    //     finalSteps[2].step +
    //     "/ step number = " +
    //     finalSteps[2].step_number
    // );

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
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleGetRecipeID = async () => {
    const response = await fetch("http://localhost:8080/recipe/last_id");
    const result = await response.json();
    createSteps(steps, result);
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
        <button type="submit">Click to add</button>
      </form>
    </div>
  );
};

export default CreateRecipePage;
