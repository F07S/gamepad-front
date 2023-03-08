import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import axios from "axios";

const Favourites = () => {
  const [data, setData] = useState();

  const [isLoading, setIsLoading] = useState(true);

  // const navigate = useNavigate();

  // USER TOKEN
  const token = Cookies.get("token");
  // console.log(token);

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const response = await axios.get(`http://localhost:4500/favourites`);
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchFavourites();
  }, []);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <main className="background">
      <section className="collection-page">
        <p className="title-collection">My Collection</p>
        <section className="favourites">
          {data.favourites.map((fav) => {
            // console.log(fav.image.join(""));
            return (
              token === fav.user && (
                <section className="game-container">
                  <div className="favourite-card" key={fav._id}>
                    <img className="sim-img" src={fav.image} alt="character" />
                    <p className="fav-name">{fav.name}</p>
                    <button
                      className="trash-btn"
                      onClick={async () => {
                        try {
                          const response = await axios.delete(
                            `http://localhost:4500/favourites/delete/${fav._id}`
                          );
                          setData(response.data);
                          // console.log(response.data);
                        } catch (error) {
                          console.log(error.response.data);
                        }
                      }}
                    >
                      <FontAwesomeIcon icon="trash-can" />
                    </button>
                  </div>
                </section>
              )
            );
          })}
        </section>
      </section>
    </main>
  );
};
export default Favourites;
