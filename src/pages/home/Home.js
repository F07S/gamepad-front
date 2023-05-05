import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import axios from "axios";
import Dots from "react-activity/dist/Dots";
import "react-activity/dist/library.css";
const Home = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [pageNo, setPageNo] = useState(1);
  const [gameCount, setGameCount] = useState();

  const numberOfPages = Math.ceil(gameCount / 20);
  // console.log(numberOfPages);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4500?page=${pageNo}`
          // `https://api.rawg.io/api/games?key=&dates=2022-12-01,2023-11-30&platforms=18,1,7&page=${pageNo}`
        );
        // console.log(response.data.count);
        setGameCount(response.data.count);
        // console.log(gameCount);
        setData(response.data);
        // console.log(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [pageNo]);

  const handlePageClick = (event) => {
    setPageNo(event.selected + 1);
    console.log(pageNo);
  };

  return (
    <main className="background">
      <div className="home-page">
        <div className="first-block">
          <p className="title">New and upcoming releases</p>
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

export default Home;
