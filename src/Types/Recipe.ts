import suitableFor from "./SuitableFor";

type Recipe = {
  id: number;
  img: string;
  name: string;
  madeBy: string;
  desc: string;
  ingredients: string[];
  steps: string[];
  category: string;
  suitableFor: suitableFor[];
};

export default Recipe;
