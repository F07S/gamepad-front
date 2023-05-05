import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import LinesEllipsis from "react-lines-ellipsis";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Similargames from "../../components/similargames/Similargames";
import Cookies from "js-cookie";
import axios from "axios";

//ACTIVITY INDICATOR
import Dots from "react-activity/dist/Dots";
import "react-activity/dist/library.css";

// POP-UP NOTIFICATIONS PACKAGE IMPORT
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Game = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [reviewsData, setReviewsData] = useState();
  const [isReviewLoading, setIsReviewLoading] = useState(true);
  const [reviewExists, setReviewExists] = useState(false);
  const [savedFav, setSavedFav] = useState(false);

  // USER TOKEN
  const token = Cookies.get("token");

  // USER DATA STATES
  const [userId, setUserId] = useState();

  // Navigate
  const navigate = useNavigate();

  const params = useParams();
  const id = params.id;
  // console.log(id);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await axios.get(
          `https://site--gamepad-backend--phfc9s47kbj5.code.run/game/${id}`
          // `http://localhost:4500/game/${id}`
        );

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `https://site--gamepad-backend--phfc9s47kbj5.code.run/allreviews`
          // `http://localhost:4500/allreviews`
        );
        console.log(response.data);
        setReviewsData(response.data);
        setIsReviewLoading(false);
        const gameId = Number(id);
        const foundReview = response.data.reviews.find(
          (review) => review.gameId === gameId
        );
        if (foundReview) {
          setReviewExists(true);
        }
        console.log(foundReview);
      } catch (error) {
        console.log(error.response);
      }
    };

    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `https://site--gamepad-backend--phfc9s47kbj5.code.run/user`
          // `http://localhost:4500/user`
        );
        const foundUser = response.data.user.find(
          (user) => user.token === token
        );
        setUserId(foundUser._id);
        const gameId = Number(id);
        const favourite = foundUser.favourites.find((fav) => fav.id === gameId);
        if (favourite) {
          setSavedFav(true);
        }
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchUser();
    fetchReviews();
    fetchGame();
  }, [id, token]);

  return isLoading ? (
    <main className="background">
      <section className="home-page">
        <Dots className="dots-activity-games" />
      </section>
    </main>
  ) : (
    <main className="background">
      <section className="home-page">
        <section className="first-block-game">
          <div className="main-block">
            <p className="game-name">{data.name}</p>
            <img className="one-game-img" src={data.background_image} alt="" />
          </div>
          <div className="info-desc-container">
            <div className="info-container">
              <div className="first-info-block">
                <div className="btn-container">
                  <button
                    className="btn"
                    onClick={async () => {
                      toast(`${data.name} added to your collection!`);
                      try {
                        const response = await axios.put(
                          `https://site--gamepad-backend--phfc9s47kbj5.code.run/user/update/${userId}`,
                          // `http://localhost:4500/user/update/${userId}`,

                          {
                            id: data.id,
                            name: data.name,
                            image: data.background_image,
                          }
                        );

                        console.log(response);
                        setSavedFav(true);
                      } catch (error) {
                        console.log(error.message);
                        if (
                          (error.response.data.message = "Missing parameters")
                        ) {
                          navigate("/login");
                        }
                      }
                    }}
                  >
                    <div>
                      {savedFav ? (
                        <p className="add">Saved to</p>
                      ) : (
                        <p className="add">Add to</p>
                      )}

                      <p className="category">Collection</p>
                    </div>
                    {savedFav ? (
                      <div className="red-star">
                        <FontAwesomeIcon icon="star" />
                      </div>
                    ) : (
                      <div className="white-star">
                        <FontAwesomeIcon icon="star" />
                      </div>
                    )}
                  </button>
                </div>
                <div>
                  <p className="info-label">Platforms</p>
                  {data.parent_platforms.map((platform) => {
                    return (
                      <span key={platform.platform.id} className="info">
                        {platform.platform.name},{" "}
                      </span>
                    );
                  })}
                </div>
                <div>
                  <p className="info-label">Release date</p>
                  <span className="info">{data.released}</span>
                </div>
                <div>
                  <p className="info-label">Publisher</p>
                  {data.publishers.map((publisher) => {
                    return (
                      <span key={publisher.id} className="info">
                        {publisher.name}
                      </span>
                    );
                  })}
                </div>
              </div>
              <div className="second-info-block">
                <div className="btn-container">
                  <Link to={token ? `/review/${data.id}` : "/login"}>
                    <button className="btn">
                      <div className="add-review">
                        <p className="add">Add a</p>
                        <p className="category">Review</p>
                      </div>
                      <div>
                        <FontAwesomeIcon icon="comment-dots" />
                      </div>
                    </button>
                  </Link>
                </div>
                <div>
                  <p className="info-label">Genre</p>
                  {data.genres.map((genre) => {
                    return (
                      <span key={genre.id} className="info">
                        {genre.name},{" "}
                      </span>
                    );
                  })}
                </div>
                <div>
                  <p className="info-label">Developer</p>
                  {data.developers.map((developer) => {
                    return (
                      developer.name && (
                        <span key={developer.id} className="info">
                          {developer.name},{" "}
                        </span>
                      )
                    );
                  })}
                </div>

                <p className="info-label">Audience</p>
                {data.esrb_rating ? (
                  <span key={data.esrb_rating.id} className="info">
                    {data.esrb_rating.name}
                  </span>
                ) : (
                  <span className="info">Info not available</span>
                )}
              </div>
            </div>
            <div className="desc-block">
              <div>
                <p className="info-label">About </p>
                <LinesEllipsis
                  className="info"
                  text={data.description_raw}
                  maxLine="3"
                  ellipsis="..."
                  trimRight
                  basedOn="letters"
                />
              </div>
            </div>
          </div>
        </section>

        <div>
          <div className="game-like-section"></div>
          <Similargames
            gameId={id}
            gameName={data.name}
            setSavedFav={setSavedFav}
          />
          <section className="review-section">
            {reviewExists ? (
              <p className="game-name">Reviews for {data.name}</p>
            ) : (
              <p className="game-name">
                Be the first to comment on {data.name} by adding a review !
              </p>
            )}

            {reviewsData &&
              reviewsData.reviews.map((review) => {
                return isReviewLoading ? (
                  <Dots className="dots-activity-games" />
                ) : (
                  data.id === review.gameId && (
                    <div className="review-card" key={review._id}>
                      <p className="review-label">{review.title} </p>
                      <p className="info">{review.review} </p>
                      <div className="reviewer-profile">
                        <img
                          className="profile-img-review"
                          src={review.userimage}
                          alt=""
                        />
                        <div className="review-name-date">
                          <p className="info-date">09/03/23</p>
                          <p className="user-label">{review.user} </p>
                        </div>
                      </div>
                    </div>
                  )
                );
              })}
          </section>
        </div>
      </section>
      {/* NOTIFICATIONS COMPONENT FROM REACT TOASTIFY PACKAGE */}
      <ToastContainer
        className="toast"
        position="top-right"
        autoClose={2000}
        // hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </main>
  );
};

export default Game;
