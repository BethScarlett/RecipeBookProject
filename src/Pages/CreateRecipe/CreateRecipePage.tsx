import { FormEvent, useState } from "react";
import Select from "react-select";
import Recipe from "../../Types/Recipe";

const CreateRecipePage = () => {
  const defaultRecipeState = {
    id: -1,
    img: "",
    name: "",
    description: "",
    category: "",
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
    } else {
      setRecipe({ ...recipe, [key]: "Other" });
    }
    console.log(recipe);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    console.log(recipe);
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
