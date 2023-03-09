import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
const Review = () => {
  const [data, setData] = useState();
  const [reviewsData, setReviewsData] = useState();
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");

  const [userData, setUserData] = useState();

  const params = useParams();
  const id = params.id;
  console.log(id);

  // USER TOKEN
  const token = Cookies.get("token");
  console.log(token);

  // Navigate
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await axios.get(`http://localhost:4500/review/${id}`);
        console.log(response.data);
        setData(response.data);
        // setIsLoading(false);
      } catch (error) {
        console.log(error.response);
        // add error.message above ^
      }
    };

    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:4500/user`);
        console.log(response.data);
        const foundUser = response.data.user.find(
          (user) => user.token === token
        );
        // console.log(foundUser);
        setUserData(foundUser);
        // console.log(userData.username);
        // console.log(userData.account.avatar.secure_url);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchUser();
    fetchGame();
  }, [id]);

  const handleTitleChange = (event) => {
    event.preventDefault();
    setTitle(event.target.value);
  };

  const handleReviewChange = (event) => {
    event.preventDefault();
    setReview(event.target.value);
  };

  const handleReviewSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4500/addreview",

        {
          title: title,
          review: review,
          game: data.name,
          gameId: data.id,
          user: userData.username,
          userimage: userData.account.avatar.secure_url,
        }
      );
      setReviewsData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  return (
    <main className="background">
      <section className="review-page">
        <section className="comment-section">
          {/* <p>Leave a review for {data.name}</p> */}
          <form
            className="input-area"
            onSubmit={(event) => {
              event.preventDefault();
              handleReviewSubmit();
              alert(
                `Your review has been added. Redirecting you back to ${data.name} game page.`
              );
              navigate(`/game/${data.id}`);
            }}
          >
            <p className="review-container-title">Write a review</p>

            <div className="review-input-box">
              <span className="label">Review title</span>
              <input
                className="title-input"
                type="text"
                placeholder="Title"
                onChange={handleTitleChange}
                value={title}
              />
              <span className="label">Review text</span>
              <textarea
                className="text-input"
                placeholder="Write your review here..."
                rows={4}
                cols={40}
                onChange={handleReviewChange}
                value={review}
              />

              <button className="publish-btn">Publish</button>
            </div>
          </form>
        </section>
      </section>
    </main>
  );
};

export default Review;
