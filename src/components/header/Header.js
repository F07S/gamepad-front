import logo from "../../img/logo.png";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const Header = ({ handleToken }) => {
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
          <Link to="/collection">
            <button className="page-btn">My Collection</button>
          </Link>
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
        </nav>
      </header>
    </div>
  );
};

export default Header;
