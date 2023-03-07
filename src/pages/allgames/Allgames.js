import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

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
  const [genreData, setGenreData] = useState();
  const [type, setType] = useState("");
  const [genre, setGenre] = useState();
  const [showGenreMenu, setShowGenreMenu] = useState(false);
  // PLATFORM USESTATES
  const [platformData, setPlatformData] = useState();
  const [platform, setPlatform] = useState("");
  const [platformName, setPlatformName] = useState();
  const [showPlatformMenu, setShowPlatformMenu] = useState(false);

  //SORT BY
  const [sort, setSort] = useState("");
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [sortName, setSortName] = useState();

  const numberOfPages = Math.ceil(gameCount / 20);
  // console.log(numberOfPages);

  useEffect(() => {
    // MAIN REQUEST
    const fetchData = async () => {
      try {
        // IF THE TYPE & PLATFORM & SORT FILTERS ARE NOT SELECTED
        if (!type && !platform && !sort) {
          const response = await axios.get(
            `http://localhost:4500/allgames?page=${pageNo}&search=${search}`
            // `https://api.rawg.io/api/games?key=&page=${pageNo}&search=${search}`
          );
          // console.log(response.data.count);
          setGameCount(response.data.count);
          // console.log(gameCount);
          setData(response.data);
          // console.log(data);
          setIsLoading(false);
        }
        // IF THE TYPE IS SELECTED BUT THE PLATFORM & SORT ARE NOT SELECTED
        if (type && !platform && !sort) {
          console.log(type);
          const response = await axios.get(
            `http://localhost:4500/allgames?page=${pageNo}&search=${search}&genres=${type}`
            // `https://api.rawg.io/api/games?key=&page=${pageNo}&search=${search}&genres=${type}`
          );
          console.log(response.data);
          setGameCount(response.data.count);
          // console.log(gameCount);
          setData(response.data);
          // console.log(data);
          setIsLoading(false);
        }
        // IF THE TYPE & PLATFORM FILTERS ARE SELECTED BUT NOT SORT
        if (type && platform && !sort) {
          const response = await axios.get(
            `http://localhost:4500/allgames?page=${pageNo}&search=${search}&genres=${type}&platforms=${platform}`
            // `https://api.rawg.io/api/games?key=&page=${pageNo}&search=${search}&genres=${type}&platforms=${platform}`
          );
          // console.log(response.data.count);
          setGameCount(response.data.count);
          // console.log(gameCount);
          setData(response.data);
          // console.log(data);
          setIsLoading(false);
        }

        // IF THE TYPE & PLATFORM FILTERS ARE NOT SELECTED bUT SORT IS SELECTED
        if (!type && !platform && sort) {
          const response = await axios.get(
            `http://localhost:4500/allgames?page=${pageNo}&search=${search}&ordering=${sort}`
            // `https://api.rawg.io/api/games?key=&page=${pageNo}&search=${search}&ordering=${sort}`
          );
          // console.log(response.data.count);
          setGameCount(response.data.count);
          // console.log(gameCount);
          setData(response.data);
          // console.log(data);
          setIsLoading(false);
        }
        // IF THE TYPE IS NOT SELECTED & PLATFORM IS SELECTED
        if (!type && platform) {
          const response = await axios.get(
            `http://localhost:4500/allgames?page=${pageNo}&search=${search}&platforms=${platform}`
            // `https://api.rawg.io/api/games?key=&page=${pageNo}&search=${search}&platforms=${platform}`
          );
          // console.log(response.data.count);
          setGameCount(response.data.count);
          // console.log(gameCount);
          setData(response.data);
          // console.log(data);
          setIsLoading(false);
        }

        // IF THE TYPE & SORT ARE SELECTED & PLATFORM IS NOT SELECTED
        if (type && !platform && sort) {
          const response = await axios.get(
            `http://localhost:4500/allgames?page=${pageNo}&search=${search}&genres=${type}&ordering=${sort}`
            // `https://api.rawg.io/api/games?key=&page=${pageNo}&search=${search}&genres=${type}&ordering=${sort}`
          );
          // console.log(response.data.count);
          setGameCount(response.data.count);
          // console.log(gameCount);
          setData(response.data);
          // console.log(data);
          setIsLoading(false);
        }
        // IF THE PLATFORM & SORT ARE SELECTED BUT TYPE IS NOT SELECTED
        if (!type && platform && sort) {
          const response = await axios.get(
            `http://localhost:4500/allgames?page=${pageNo}&search=${search}&platforms=${platform}&ordering=${sort}`
            // `https://api.rawg.io/api/games?key=&page=${pageNo}&search=${search}&platforms=${platform}&ordering=${sort}`
          );
          // console.log(response.data.count);
          setGameCount(response.data.count);
          // console.log(gameCount);
          setData(response.data);
          // console.log(data);
          setIsLoading(false);
        }
        // IF THE TYPE & PLATFORM & SORT FILTERS ARE SELECTED
        if (type && platform && sort) {
          const response = await axios.get(
            `http://localhost:4500/allgames?page=${pageNo}&search=${search}&genres=${type}&platforms=${platform}&ordering=${sort}`
            // `https://api.rawg.io/api/games?key=&page=${pageNo}&search=${search}&genres=${type}&platforms=${platform}&ordering=${sort}`
          );
          // console.log(response.data.count);
          setGameCount(response.data.count);
          // console.log(gameCount);
          setData(response.data);
          // console.log(data);
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
          `http://localhost:4500/genres`
          // `https://api.rawg.io/api/genres?key=`
        );
        // console.log(response.data);
        setGenreData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    // PLATFORM DATA GET REQUEST
    const fetchPlatformData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4500/platforms`
          // `https://api.rawg.io/api/platforms?key=`
        );
        // console.log(response.data);
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
                        // console.log(type);
                      }}
                    >
                      All
                    </button>
                  </Dropdown.Item>
                  {isLoading ? (
                    <p>Loading filters...</p>
                  ) : (
                    genreData.results.map((genre) => {
                      // console.log(genre.name);
                      return (
                        <Dropdown.Item>
                          <button
                            className="dd-btn"
                            key={genre.id}
                            onClick={() => {
                              setType(genre.id);
                              setGenre(genre.name);
                              // console.log(type);
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
                        // console.log(type);
                      }}
                    >
                      All
                    </button>
                  </Dropdown.Item>
                  {isLoading ? (
                    <p>Loading filters...</p>
                  ) : (
                    platformData.results.map((platform) => {
                      // console.log(genre.name);
                      return (
                        <Dropdown.Item>
                          <button
                            className="dd-btn"
                            key={platform.id}
                            onClick={() => {
                              setPlatform(platform.id);
                              setPlatformName(platform.name);
                              // console.log(type);
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
                        // console.log(type);
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
                        // console.log(type);
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
                        // console.log(type);
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
                        // console.log(type);
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
                        // console.log(type);
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
            <p>Loading...</p>
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
                      <p className="name">{game.released}</p>
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
