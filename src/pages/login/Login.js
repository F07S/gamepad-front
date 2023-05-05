import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Login = ({ handleToken }) => {
  //Login input states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  // onChange Input Handlers
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // Navigate
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://site--gamepad-backend--phfc9s47kbj5.code.run/login",
        // "http://localhost:4500/login",

        {
          email: email,
          password: password,
        }
      );
      console.log(response.data.token);
      const token = response.data.token;

      if (token) {
        // Cookies.set("token", token, { expires: 10 });
        handleToken(token);
        navigate("/");
      }
    } catch (error) {
      console.log(error.response.data);
      console.log(error.response.status);

      if ((error.response.data.message = "Unauthorized")) {
        setErrorMessage(
          "The e-mail and/or password are not valid. Please try again."
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
            handleLogin();
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
              <h1>Log in</h1>

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

              <button>Log in</button>
              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
              <span
                className="connect-here"
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Not a member yet ? Sign up here!
              </span>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
};

export default Login;
