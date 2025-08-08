import "./App.css";
import StarRating from "./components/star-rating";

function App() {
  return (
    <div className="App">
      <h1 className="heading">Rating</h1>
      <StarRating maxRating={10} />
    </div>
  );
}

export default App;
