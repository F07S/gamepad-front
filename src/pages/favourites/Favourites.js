import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import axios from "axios";

//ACTIVITY INDICATOR
import Dots from "react-activity/dist/Dots";
import "react-activity/dist/library.css";

const Favourites = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // USER DATA STATES
  const [userId, setUserId] = useState();

  // USER TOKEN
  const token = Cookies.get("token");

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const response = await axios.get(`http://localhost:4500/user`);
        const foundUser = response.data.user.find(
          (user) => user.token === token
        );
        setData(foundUser);
        setUserId(foundUser._id);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchFavourites();
  }, [token]);

  return isLoading ? (
    <main className="background">
      <section className="collection-page">
        <Dots className="dots-activity-games" />
      </section>
    </main>
  ) : (
    <main className="background">
      <section className="collection-page">
        <p className="title-collection">My Collection</p>
        <section className="favourites">
          {data.favourites.map((fav) => {
            return (
              <section className="game-container" key={fav.id}>
                <div className="favourite-card">
                  <Link to={`/game/${fav.id}`}>
                    <img className="sim-img" src={fav.image} alt="character" />
                  </Link>
                  <p className="fav-name">{fav.name}</p>
                  <button
                    className="trash-btn"
                    onClick={async () => {
                      try {
                        const response = await axios.put(
                          `http://localhost:4500/user/deletefav/${userId}`,

                          {
                            id: fav.id,
                            name: fav.name,
                            image: fav.image,
                          }
                        );
                        const responseUpdate = await axios.get(
                          `http://localhost:4500/user`
                        );

                        const foundUser = responseUpdate.data.user.find(
                          (user) => user.token === token
                        );
                        setData(foundUser);
                        console.log(response);
                      } catch (error) {
                        console.log(error.response);
                      }
                    }}
                  >
                    <FontAwesomeIcon icon="trash-can" />
                  </button>
                </div>
              </section>
            );
          })}
        </section>
      </section>
    </main>
  );
};
export default Favourites;
