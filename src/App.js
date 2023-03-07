import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Usestate
import { useState } from "react";
//Cookies
import Cookies from "js-cookie";

// CSS PAGES
import "./App.css";
import "./pages/home/Home.css";
import "./pages/allgames/Allgames.css";
import "./pages/game/Game.css";
import "./pages/login/Login.css";
import "./pages/signup/Signup.css";
import "./pages/favourites/Favourites.css";
import "./pages/review/Review.css";

// CSS COMPONENTS
import "./components/header/Header.css";

// PAGES
import Home from "./pages/home/Home";
import Allgames from "./pages/allgames/Allgames";
import Game from "./pages/game/Game";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import Favourites from "./pages/favourites/Favourites";
import Review from "./pages/review/Review";

// COMPONENTS
import Header from "./components/header/Header";

//FONTAWESOME
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCommentDots,
  faStar,
  faTrashCan,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
library.add(faCommentDots, faStar, faTrashCan, faUser);

function App() {
  const [token, setToken] = useState(Cookies.get("token") || null);

  const handleToken = (token) => {
    if (token) {
      setToken(token);
      Cookies.set("token", token, { expires: 10 });
    } else {
      setToken(null);
      Cookies.remove("token");
    }
  };
  return (
    <Router>
      <Header token={token} handleToken={handleToken}></Header>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/allgames" element={<Allgames />}></Route>
        <Route path="/game/:id" element={<Game />}></Route>
        <Route
          path="/signup"
          element={<Signup handleToken={handleToken} />}
        ></Route>
        <Route
          path="/login"
          element={<Login handleToken={handleToken} />}
        ></Route>
        <Route
          path="/collection"
          element={<Favourites token={token} />}
        ></Route>
        <Route path="/review/:id" element={<Review token={token} />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
