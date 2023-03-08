import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import symbol from "../../img/symbol.png";

const Signup = ({ handleToken }) => {
  //Signup input states
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [picture, setPicture] = useState({});
  const [displayPic, setDisplayPic] = useState();

  const [errorMessage, setErrorMessage] = useState("");

  //   const [data, setData] = useState();

  // onChange Input Handlers
  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  // Navigate
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setErrorMessage("");
    try {
      if (password !== confirmPassword) {
        return setErrorMessage("Your passwords don't match.");
      }
      const formData = new FormData();
      formData.append("username", userName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("picture", picture);
      console.log(picture);
      const response = await axios.post(
        "http://localhost:4500/signup",
        formData

        // {
        //   username: userName,
        //   email: email,
        //   password: password,
        //   avatar: picture,
        // }
      );
      console.log(response.data);
      const token = response.data.token;

      if (token) {
        // Cookies.set("token", token, { expires: 10 });
        handleToken(token);
        navigate("/");
        window.location.reload(false);
      }
    } catch (error) {
      console.log(error.response.data);
      console.log(error.response.status);
      if (error.response.data.message === "This email already has an account") {
        setErrorMessage("This e-mail already exists.");
      }
      if ((error.response.data.message = "Missing parameters")) {
        setErrorMessage(
          "We are missing information to sign you up. Please fill in all the fields above."
        );
      }
    }
  };

  return (
    <main className="background">
      <section className="signup-page">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleSubmit();
          }}
        >
          <div className="signup-container">
            <div className="member-info-box">
              <h1>How it works ?</h1>
              <div className="how-box">
                <FontAwesomeIcon className="icon" icon="user" />
                <p className="how-text">
                  Log in to your free account to be able to get all features of
                  Gamepad
                </p>
              </div>
              <div className="how-box">
                <FontAwesomeIcon className="icon" icon="star" />
                <p className="how-text">Add any game to your collection</p>
              </div>
              <div className="how-box">
                <FontAwesomeIcon className="icon" icon="comment-dots" />
                <p className="how-text">
                  Write a public review on a game for other members to rate
                </p>
              </div>
              {/* <img className="symbol" src={symbol} alt="" /> */}
            </div>
            <div className="signup-box">
              <h1>Sign up</h1>
              <input
                className="input-box"
                type="text"
                placeholder="Nom d'utilisateur"
                onChange={handleUserNameChange}
                value={userName}
              />
              <input
                className="input-box"
                type="email"
                placeholder="Email"
                onChange={handleEmailChange}
                value={email}
              />
              <input
                className="input-box"
                type="password"
                placeholder="Password"
                onChange={handlePasswordChange}
                value={password}
              />
              <input
                className="input-box"
                type="password"
                placeholder="Confirm password"
                onChange={handleConfirmPasswordChange}
                value={confirmPassword}
              />
              <div className="upload-container">
                {!displayPic && (
                  <label htmlFor="file">Add a profile picture</label>
                )}
                <input
                  id="file"
                  style={{ display: "none" }}
                  type="file"
                  onChange={(event) => {
                    // const profile = event.target.files[0];
                    setDisplayPic(event.target.files[0]);
                    setPicture(event.target.files[0]);
                    console.log(picture);
                  }}
                />
                {displayPic && (
                  <img
                    className="upload-img"
                    src={URL.createObjectURL(displayPic)}
                    alt=""
                  />
                )}
              </div>
              <button>Sign up</button>
              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
              <span
                className="connect-here"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Already have an account? Click here to log in!
              </span>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
};

export default Signup;
