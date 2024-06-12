import { FormEvent, useState } from "react";
import Select from "react-select";
import Recipe from "../../Types/Recipe";

const CreateRecipePage = () => {
  const defaultRecipeState = {
    id: -1,
    img: "",
    name: "",
    description: "",
    category: "Other",
  };

  const [recipe, setRecipe] = useState<Recipe>(defaultRecipeState);

  const options = [
    { value: "Meat", label: "Meat" },
    { value: "Baked Goods", label: "Baked Goods" },
    { value: "Sweet Treats", label: "Sweet Treats" },
  ];

  const handleInput = (event: FormEvent<HTMLInputElement>, key: string) => {
    setRecipe({ ...recipe, [key]: event.currentTarget.value });
    console.log(recipe);
  };

  const handleDropdownInput = (event: string | undefined, key: string) => {
    if (event != undefined) {
      setRecipe({ ...recipe, [key]: event });
    }
    console.log(recipe);
  };

  const handleSubmit = () => {
    createRecipe(recipe);
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
        ></Select>
        <label htmlFor="img">Image: </label>
        <input
          type="text"
          name="img"
          onInput={(event) => handleInput(event, "img")}
        />
        <button type="submit">Click to add</button>
      </form>
    </div>
  );
};

export default CreateRecipePage;
