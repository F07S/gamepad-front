import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

//ACTIVITY INDICATOR
import Dots from "react-activity/dist/Dots";
import "react-activity/dist/library.css";
const Similargames = ({ gameId, gameName, setSavedFav }) => {
  // SIMILAR GAMES USESTATES
  const [simData, setSimData] = useState();
  const [isLoadingSim, setIsLoadingSim] = useState(true);

  const id = gameId;

  useEffect(() => {
    const fetchSimilarGames = async () => {
      try {
        const response = await axios.get(
          `https://site--gamepad-backend--phfc9s47kbj5.code.run/game-series/${id}`
          // `http://localhost:4500/game-series/${id}`
        );
        console.log(response.data);
        setSimData(response.data);
        setIsLoadingSim(false);
      } catch (error) {
        console.log(error.response);
        // add error.message above ^
      }
    };

    fetchSimilarGames();
  }, [id]);

  return isLoadingSim ? (
    <Dots className="dots-activity-games" />
  ) : (
    <section className="similar-game-box">
      {simData.count > 0 ? (
        <p className="game-name">Games like {gameName}</p>
      ) : null}
      <section className="similar-game-section">
        {simData.results.map((simGame) => {
          return (
            <div key={simGame.id} className="game-card">
              <Link
                to={`/game/${simGame.id}`}
                onClick={() => {
                  setSavedFav(false);
                }}
              >
                <img
                  className="sim-img"
                  src={simGame.background_image}
                  alt=""
                />
              </Link>

              <p>{simGame.name}</p>
            </div>
          );
        })}
      </section>
    </section>
  );
};

export default Similargames;
