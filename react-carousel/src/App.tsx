import "./App.css";
import { BANNER_IMAGES } from "./assets/data";
import Carousel from "./components/Carousel";

function App() {
  return (
    <div className="App">
      <Carousel images={BANNER_IMAGES} />
    </div>
  );
}

export default App;
