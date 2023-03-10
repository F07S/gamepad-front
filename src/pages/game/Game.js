import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import LinesEllipsis from "react-lines-ellipsis";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Similargames from "../../components/similargames/Similargames";
import Cookies from "js-cookie";
import axios from "axios";

const Game = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [reviewsData, setReviewsData] = useState();
  const [isReviewLoading, setIsReviewLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  // USER TOKEN
  const token = Cookies.get("token");
  console.log(token);
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
          // `https://api.rawg.io/api/games/${id}?key=`
          `http://localhost:4500/game/${id}`
        );
        // console.log(response.data);
        setData(response.data);

        // console.log(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
        // add error.message above ^
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:4500/allreviews`);
        console.log(response.data);
        setReviewsData(response.data);
        setIsReviewLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };

    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:4500/user`);
        // console.log(response.data);
        const foundUser = response.data.user.find(
          (user) => user.token === token
        );
        setUserId(foundUser._id);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchUser();
    fetchReviews();
    fetchGame();
  }, [id]);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <main className="background">
      <section className="home-page">
        <section key={data.id} className="first-block-game">
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
                      try {
                        console.log(userId);
                        const response = await axios.put(
                          `http://localhost:4500/user/update/${userId}`,

                          {
                            id: data.id,
                            name: data.name,
                            image: data.background_image,
                          }
                        );
                        setSaved(true);
                        console.log(response);
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
                      {saved ? (
                        <p className="add">Saved to</p>
                      ) : (
                        <p className="add">Add to</p>
                      )}

                      <p className="category">Collection</p>
                    </div>
                    {saved ? (
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
                      <span key={platform.id} className="info">
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
                      <div>
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
          <Similargames gameId={id} gameName={data.name} />
          <section className="review-section">
            <p className="game-name">Reviews for {data.name}</p>
            {reviewsData.reviews.map((review) => {
              return isReviewLoading ? (
                <p>Loading reviews...</p>
              ) : (
                data.id === review.gameId && (
                  <div className="review-card">
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
    </main>
  );
};

export default Game;
