import { Routes, Route } from "react-router-dom";

//pages
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import MovieDetail from "./pages/MovieDetail";
import Categories from "./pages/Categories";

//components

//Layouts
import Homelayout from "./layouts/Rootlayout";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Homelayout />}>
        <Route index element={<Home />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="movies/:id" element={<MovieDetail />} />
        <Route path="categories" element={<Categories />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Route>
    </Routes>
  );
}

export default App;
