// import { useEffect, useState } from "react";
// import ReactPaginate from "react-paginate";
// import axios from "axios";

// // DROP DOWN
// import Dropdown from "react-bootstrap/Dropdown";

// const Allgames = () => {
//   const [data, setData] = useState();
//   const [isLoading, setIsLoading] = useState(true);
//   const [pageNo, setPageNo] = useState(1);
//   const [gameCount, setGameCount] = useState();
//   const [search, setSearch] = useState("");
//   const [type, setType] = useState();
//   const [genre, setGenre] = useState();

//   const numberOfPages = Math.ceil(gameCount / 20);
//   // console.log(numberOfPages);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           !type
//             ? `https://api.rawg.io/api/games?key=&page=${pageNo}&search=${search}`
//             : `https://api.rawg.io/api/games?key=&page=${pageNo}&search=${search}&genres=${type}`
//         );
//         // console.log(response.data.count);
//         setGameCount(response.data.count);
//         // console.log(gameCount);
//         setData(response.data);
//         // console.log(data);
//         setIsLoading(false);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchData();
//   }, [pageNo, search, type]);

//   const handlePageClick = (event) => {
//     setPageNo(event.selected + 1);
//     console.log(pageNo);
//   };

//   const handleSearchChange = (event) => {
//     setSearch(event.target.value);
//   };

//   return (
//     <main className="background">
//       <div className="home-page">
//         <div className="first-block">
//           <div className="title-search">
//             <p className="title">All games</p>
//             <input
//               className={!search ? "search-bar" : "search-bar-active "}
//               type="text"
//               placeholder={`Search ${gameCount} games`}
//               value={search}
//               onChange={handleSearchChange}
//             />
//           </div>
//           <div className="genre-filter-container">
//             <Dropdown autoClose={true}>
//               <Dropdown.Toggle>Type</Dropdown.Toggle>

//               <Dropdown.Menu>
//                 <Dropdown.Item>
//                   <button
//                     onClick={() => {
//                       setType(2);
//                       setGenre("shooter");
//                       console.log(type);
//                     }}
//                   >
//                     Shooter
//                   </button>
//                 </Dropdown.Item>
//                 <Dropdown.Item>
//                   <button
//                     onClick={() => {
//                       setType(3);
//                       setGenre("adventure");
//                       console.log(type);
//                     }}
//                   >
//                     Adventure
//                   </button>
//                 </Dropdown.Item>
//                 <Dropdown.Item>
//                   <button
//                     onClick={() => {
//                       setType(4);
//                       setGenre("action");
//                       console.log(type);
//                     }}
//                   >
//                     Action
//                   </button>
//                 </Dropdown.Item>
//                 <Dropdown.Item>
//                   <button
//                     onClick={() => {
//                       setType(5);
//                       setGenre("role playing games");
//                       console.log(type);
//                     }}
//                   >
//                     RPG
//                   </button>
//                 </Dropdown.Item>
//                 <Dropdown.Item>
//                   <button
//                     onClick={() => {
//                       setType(6);
//                       setGenre("fighting");
//                       console.log(type);
//                     }}
//                   >
//                     Fighting
//                   </button>
//                 </Dropdown.Item>
//                 <Dropdown.Item>
//                   <button
//                     onClick={() => {
//                       setType(7);
//                       setGenre("puzzle");
//                       console.log(type);
//                     }}
//                   >
//                     Puzzle
//                   </button>
//                 </Dropdown.Item>
//                 <Dropdown.Item>
//                   <button
//                     onClick={() => {
//                       setType(10);
//                       setGenre("strategy");
//                       console.log(type);
//                     }}
//                   >
//                     Strategy
//                   </button>
//                 </Dropdown.Item>
//                 <Dropdown.Item>
//                   <button
//                     onClick={() => {
//                       setType(11);
//                       setGenre("arcade");
//                       console.log(type);
//                     }}
//                   >
//                     Arcade
//                   </button>
//                 </Dropdown.Item>
//                 <Dropdown.Item>
//                   <button
//                     onClick={() => {
//                       setType(14);
//                       setGenre("simulation");
//                       console.log(type);
//                     }}
//                   >
//                     Simulation
//                   </button>
//                 </Dropdown.Item>
//                 <Dropdown.Item>
//                   <button
//                     onClick={() => {
//                       setType(15);
//                       setGenre("sports");
//                       console.log(type);
//                     }}
//                   >
//                     Sports
//                   </button>
//                 </Dropdown.Item>
//                 <Dropdown.Item>
//                   <button
//                     onClick={() => {
//                       setType(19);
//                       setGenre("family");
//                       console.log(type);
//                     }}
//                   >
//                     Family
//                   </button>
//                 </Dropdown.Item>
//                 <Dropdown.Item>
//                   <button
//                     onClick={() => {
//                       setType(40);
//                       setGenre("casual");
//                       console.log(type);
//                     }}
//                   >
//                     Casual
//                   </button>
//                 </Dropdown.Item>
//                 <Dropdown.Item>
//                   <button
//                     onClick={() => {
//                       setType(51);
//                       setGenre("indie");
//                       console.log(type);
//                     }}
//                   >
//                     Indie
//                   </button>
//                 </Dropdown.Item>
//                 <Dropdown.Item>
//                   <button
//                     onClick={() => {
//                       setType(59);
//                       setGenre("multiplayer");
//                       console.log(type);
//                     }}
//                   >
//                     Multiplayer
//                   </button>
//                 </Dropdown.Item>
//               </Dropdown.Menu>
//             </Dropdown>
//           </div>

//           <div>
//             {genre && (
//               <p className="search-genre-category">
//                 Search results for {genre} games...
//               </p>
//             )}
//           </div>
//           {isLoading ? (
//             <p>Loading...</p>
//           ) : (
//             <div className="game-pagination">
//               <section className="game-container">
//                 {data.results.map((game) => {
//                   return (
//                     <div className="game-card" key={game.id}>
//                       <img
//                         className="game-img"
//                         src={game.background_image}
//                         alt=""
//                       />
//                       <p className="name">{game.name}</p>
//                       {/* {game.genres.map((genre) => {
//                         return (
//                           <p className="genre">
//                             {genre.name} id={genre.id}
//                           </p>
//                         );
//                       })} */}
//                     </div>
//                   );
//                 })}
//               </section>
//               <div className="pagination-block">
//                 <ReactPaginate
//                   previousLabel={"prev"}
//                   nextLabel={"next"}
//                   breakLabel={"..."}
//                   pageCount={numberOfPages}
//                   marginPagesDisplayed={2}
//                   pageRangeDisplayed={5}
//                   onPageChange={handlePageClick}
//                   containerClassName={"pagination"}
//                   subContainerClassName={"pages pagination"}
//                   activeClassName={"active"}
//                 />
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </main>
//   );
// };

// export default Allgames;

// const response = await axios.get(
//   !type
//     ? `https://api.rawg.io/api/games?key=&page=${pageNo}&search=${search}`
//     : `https://api.rawg.io/api/games?key=&page=${pageNo}&search=${search}&genres=${type}`
// );
// // console.log(response.data.count);
// setGameCount(response.data.count);
// // console.log(gameCount);
// setData(response.data);
// // console.log(data);
// setIsLoading(false);
