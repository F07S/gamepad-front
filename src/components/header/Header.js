import logo from "../../img/logo.png";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Header = ({ handleToken }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  // Navigate
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const token = Cookies.get("token");
      // console.log(token);
      try {
        const response = await axios.get(`http://localhost:4500/user`);
        // console.log(response.data.user);
        setData(response.data.user);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchUsers();
  }, []);
  const token = Cookies.get("token");
  return (
    <div className="background">
      <header>
        <img className="logo-header" src={logo} alt="" />
        <img src="" alt="" />
        <nav className="header-nav">
          <Link to="/">
            <button className="page-btn">Home</button>
          </Link>
          <Link to="/allgames">
            <button className="page-btn">All Games</button>
          </Link>

          <button
            className="page-btn"
            onClick={() => {
              token ? navigate("/collection") : navigate("/login");
            }}
          >
            My Collection
          </button>

          {token ? (
            <button
              className="page-btn"
              onClick={() => {
                handleToken(null);
              }}
            >
              Log out
            </button>
          ) : (
            <>
              <Link to="/login">
                <button className="page-btn">Log in</button>
              </Link>
            </>
          )}
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            token &&
            data.map((user) => {
              return (
                token === user.token && (
                  <div>
                    <img
                      className="profile-img"
                      src={user.account.avatar.secure_url}
                      alt=""
                    />
                  </div>
                )
              );
            })
          )}
        </nav>
      </header>
    </div>
  );
};

export default Header;
