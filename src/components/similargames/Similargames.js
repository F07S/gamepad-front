import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
const Similargames = ({ gameId }) => {
  // SIMILAR GAMES USESTATES
  const [simData, setSimData] = useState();
  const [isLoadingSim, setIsLoadingSim] = useState(true);

  const id = gameId;

  useEffect(() => {
    const fetchSimilarGames = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4500/game-series/${id}`
          // `https://api.rawg.io/api/games/${id}/game-series?key=`
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
    <p>Loading...</p>
  ) : (
    <section className="similar-game-section">
      {simData.results.map((simGame) => {
        return (
          <div key={simGame.id} className="game-card">
            <Link to={`/game/${simGame.id}`}>
              <img className="sim-img" src={simGame.background_image} alt="" />
            </Link>

            <p>{simGame.name}</p>
          </div>
        );
      })}
    </section>
  );
};

export default Similargames;
