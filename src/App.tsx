import Navbar from "./Components/Navbar/Navbar"
import RecipeCard from "./Components/RecipeCard/RecipeCard"

const App = () => {
  return (
    <div>
      <Navbar heading="Recipe Book"/>
      {/* Placeholder Navbar */}
      <Navbar />
      <RecipeCard />      
    </div>
  )
}

export default App
