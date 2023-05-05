import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import axios from "axios";

//ACTIVITY INDICATOR
import Dots from "react-activity/dist/Dots";
import "react-activity/dist/library.css";

// DROP DOWN
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const Allgames = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [pageNo, setPageNo] = useState(1);
  const [gameCount, setGameCount] = useState();
  const [search, setSearch] = useState("");
  // GENRE USESTATES
  const [isLoadingGenre, setIsLoadingGenre] = useState(true);
  const [genreData, setGenreData] = useState();
  const [type, setType] = useState("");
  const [genre, setGenre] = useState();
  const [showGenreMenu, setShowGenreMenu] = useState(false);
  // PLATFORM USESTATES
  const [isLoadingPlat, setIsLoadingPlat] = useState(true);
  const [platformData, setPlatformData] = useState();
  const [platform, setPlatform] = useState("");
  const [platformName, setPlatformName] = useState();
  const [showPlatformMenu, setShowPlatformMenu] = useState(false);

  //SORT BY
  const [sort, setSort] = useState("");
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [sortName, setSortName] = useState();

  const numberOfPages = Math.ceil(gameCount / 20);

  useEffect(() => {
    // MAIN REQUEST
    const fetchData = async () => {
      try {
        // IF THE TYPE & PLATFORM & SORT FILTERS ARE NOT SELECTED
        if (!type && !platform && !sort) {
          const response = await axios.get(
            `https://site--gamepad-backend--phfc9s47kbj5.code.run/allgames?page=${pageNo}&search=${search}`
            // `http://localhost:4500/allgames?page=${pageNo}&search=${search}`
          );

          setGameCount(response.data.count);
          setData(response.data);
          setIsLoading(false);
        }
        // IF THE TYPE IS SELECTED BUT THE PLATFORM & SORT ARE NOT SELECTED
        if (type && !platform && !sort) {
          console.log(type);
          const response = await axios.get(
            `https://site--gamepad-backend--phfc9s47kbj5.code.run/allgames?page=${pageNo}&search=${search}&genres=${type}`
            // `http://localhost:4500/allgames?page=${pageNo}&search=${search}&genres=${type}`
          );

          setGameCount(response.data.count);
          setData(response.data);
          setIsLoading(false);
        }
        // IF THE TYPE & PLATFORM FILTERS ARE SELECTED BUT NOT SORT
        if (type && platform && !sort) {
          const response = await axios.get(
            `https://site--gamepad-backend--phfc9s47kbj5.code.run/allgames?page=${pageNo}&search=${search}&genres=${type}&platforms=${platform}`
            // `http://localhost:4500/allgames?page=${pageNo}&search=${search}&genres=${type}&platforms=${platform}`
          );

          setGameCount(response.data.count);
          setData(response.data);
          setIsLoading(false);
        }

        // IF THE TYPE & PLATFORM FILTERS ARE NOT SELECTED bUT SORT IS SELECTED
        if (!type && !platform && sort) {
          const response = await axios.get(
            `https://site--gamepad-backend--phfc9s47kbj5.code.run/allgames?page=${pageNo}&search=${search}&ordering=${sort}`
            // `http://localhost:4500/allgames?page=${pageNo}&search=${search}&ordering=${sort}`
          );

          setGameCount(response.data.count);
          setData(response.data);
          setIsLoading(false);
        }
        // IF THE TYPE IS NOT SELECTED & PLATFORM IS SELECTED
        if (!type && platform) {
          const response = await axios.get(
            `https://site--gamepad-backend--phfc9s47kbj5.code.run/allgames?page=${pageNo}&search=${search}&platforms=${platform}`
            // `http://localhost:4500/allgames?page=${pageNo}&search=${search}&platforms=${platform}`
          );

          setGameCount(response.data.count);
          setData(response.data);
          setIsLoading(false);
        }

        // IF THE TYPE & SORT ARE SELECTED & PLATFORM IS NOT SELECTED
        if (type && !platform && sort) {
          const response = await axios.get(
            `https://site--gamepad-backend--phfc9s47kbj5.code.run/allgames?page=${pageNo}&search=${search}&genres=${type}&ordering=${sort}`
            // `http://localhost:4500/allgames?page=${pageNo}&search=${search}&genres=${type}&ordering=${sort}`
          );

          setGameCount(response.data.count);
          setData(response.data);
          setIsLoading(false);
        }
        // IF THE PLATFORM & SORT ARE SELECTED BUT TYPE IS NOT SELECTED
        if (!type && platform && sort) {
          const response = await axios.get(
            `https://site--gamepad-backend--phfc9s47kbj5.code.run/allgames?page=${pageNo}&search=${search}&platforms=${platform}&ordering=${sort}`
            // `http://localhost:4500/allgames?page=${pageNo}&search=${search}&platforms=${platform}&ordering=${sort}`
          );

          setGameCount(response.data.count);
          setData(response.data);
          setIsLoading(false);
        }
        // IF THE TYPE & PLATFORM & SORT FILTERS ARE SELECTED
        if (type && platform && sort) {
          const response = await axios.get(
            `https://site--gamepad-backend--phfc9s47kbj5.code.run/allgames?page=${pageNo}&search=${search}&genres=${type}&platforms=${platform}&ordering=${sort}`
            // `http://localhost:4500/allgames?page=${pageNo}&search=${search}&genres=${type}&platforms=${platform}&ordering=${sort}`
          );

          setGameCount(response.data.count);
          setData(response.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    // GENRE DATA GET REQUEST
    const fetchGenreData = async () => {
      try {
        const response = await axios.get(
          `https://site--gamepad-backend--phfc9s47kbj5.code.run/genres`
          // `http://localhost:4500/genres`
        );
        setIsLoadingGenre(false);
        setGenreData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    // PLATFORM DATA GET REQUEST
    const fetchPlatformData = async () => {
      try {
        const response = await axios.get(
          `https://site--gamepad-backend--phfc9s47kbj5.code.run/platforms`
          // `http://localhost:4500/platforms`
        );
        setIsLoadingPlat(false);
        setPlatformData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPlatformData();
    fetchGenreData();
    fetchData();
  }, [pageNo, search, type, platform, sort]);

  const handlePageClick = (event) => {
    setPageNo(event.selected + 1);
    console.log(pageNo);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <main className="background">
      <div className="home-page">
        <div className="first-block">
          <div className="title-search">
            <p className="title">All games</p>
            <input
              className={!search ? "search-bar" : "search-bar-active "}
              type="text"
              placeholder={`Search ${gameCount} games`}
              value={search}
              onChange={handleSearchChange}
            />
          </div>
          <div className="filter-container">
            {/* GENRE DROPDOWN */}
            <Dropdown>
              <DropdownButton
                id="header-btn"
                title={genre ? `↓ Type : ${genre}` : `↓ Type : All`}
                onClick={() => {
                  setShowGenreMenu(!showGenreMenu);
                }}
              >
                <div className={showGenreMenu ? "dropdownMenu" : "hide"}>
                  <Dropdown.Item>
                    <button
                      className="dd-btn"
                      onClick={() => {
                        setType(0);
                        setGenre("");
                      }}
                    >
                      All
                    </button>
                  </Dropdown.Item>
                  {isLoadingGenre ? (
                    <Dots className="dots-activity-games" />
                  ) : (
                    genreData.results.map((genre) => {
                      return (
                        <Dropdown.Item key={genre.id}>
                          <button
                            className="dd-btn"
                            onClick={() => {
                              setType(genre.id);
                              setGenre(genre.name);
                            }}
                          >
                            {genre.name}
                          </button>
                        </Dropdown.Item>
                      );
                    })
                  )}
                </div>
              </DropdownButton>
            </Dropdown>
            {/* PLATFORM DROPDOWN */}
            <Dropdown>
              <DropdownButton
                id="header-btn"
                title={
                  platformName
                    ? `↓ Platform : ${platformName}`
                    : "↓ Platform : All"
                }
                onClick={() => {
                  setShowPlatformMenu(!showPlatformMenu);
                }}
              >
                <div className={showPlatformMenu ? "dropdownMenu" : "hide"}>
                  <Dropdown.Item>
                    <button
                      className="dd-btn"
                      onClick={() => {
                        setPlatform(0);
                        setPlatformName("");
                      }}
                    >
                      All
                    </button>
                  </Dropdown.Item>
                  {isLoadingPlat ? (
                    <Dots className="dots-activity-games" />
                  ) : (
                    platformData.results.map((platform) => {
                      return (
                        <Dropdown.Item key={platform.id}>
                          <button
                            className="dd-btn"
                            onClick={() => {
                              setPlatform(platform.id);
                              setPlatformName(platform.name);
                            }}
                          >
                            {platform.name}
                          </button>
                        </Dropdown.Item>
                      );
                    })
                  )}
                </div>
              </DropdownButton>
            </Dropdown>
            {/* SORT BY DROPDOWN */}
            <Dropdown>
              <DropdownButton
                id="header-btn"
                title={
                  sortName
                    ? `↓ Sort by : ${sortName}`
                    : "↓ Sort by : Select below"
                }
                onClick={() => {
                  setShowSortMenu(!showSortMenu);
                }}
              >
                <div className={showSortMenu ? "dropdownMenu" : "hide"}>
                  <Dropdown.Item>
                    <button
                      className="dd-btn"
                      onClick={() => {
                        setSort();
                        setSortName("");
                      }}
                    >
                      Back to default
                    </button>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <button
                      className="dd-btn"
                      onClick={() => {
                        setSort("-metacritic");
                        setSortName("Popularity");
                      }}
                    >
                      Popularity
                    </button>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <button
                      className="dd-btn"
                      onClick={() => {
                        setSort("name");
                        setSortName("Name");
                      }}
                    >
                      Name
                    </button>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <button
                      className="dd-btn"
                      onClick={() => {
                        setSort("-rating");
                        setSortName("Rating");
                      }}
                    >
                      Rating
                    </button>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <button
                      className="dd-btn"
                      onClick={() => {
                        setSort("-released");
                        setSortName("Release date");
                      }}
                    >
                      Release date
                    </button>
                  </Dropdown.Item>
                </div>
              </DropdownButton>
            </Dropdown>
          </div>

          <div>
            {genre && !platform ? (
              <p className="search-genre-category">
                Search results for {genre} games...
              </p>
            ) : genre && platform ? (
              <p className="search-genre-category">
                Search results for {genre} games on {platformName}...
              </p>
            ) : !genre && platform ? (
              <p className="search-genre-category">
                Search results for games on {platformName}...
              </p>
            ) : (
              <p className="search-genre-category">All games results...</p>
            )}
          </div>
          {isLoading ? (
            <Dots className="dots-activity-games" />
          ) : (
            <div className="game-pagination">
              <section className="game-container">
                {data.results.map((game) => {
                  return (
                    <div className="game-card" key={game.id}>
                      <Link to={`/game/${game.id}`}>
                        <img
                          className="game-img"
                          src={game.background_image}
                          alt=""
                        />
                      </Link>
                      <p className="name">{game.name}</p>
                    </div>
                  );
                })}
              </section>
              <div className="pagination-block">
                <ReactPaginate
                  previousLabel={"prev"}
                  nextLabel={"next"}
                  breakLabel={"..."}
                  pageCount={numberOfPages}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={handlePageClick}
                  containerClassName={"pagination"}
                  subContainerClassName={"pages pagination"}
                  activeClassName={"active"}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Allgames;
