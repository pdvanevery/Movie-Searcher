import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from "./components/MovieList";
import MovieListHeading from "./components/MovieListHeading";
import SearchBox from "./components/SearchBox";
import AddFavorites from "./components/AddFavorites";

function App() {
  const [movies, setMovies] = useState([])
  const [searchValue, setSearchValue] = useState('')

  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=4d494fc9`

    const response = await fetch(url)
    const responseJson = await response.json()

    if(responseJson.Search) {
      setMovies(responseJson.Search)
    }
    
  }

  useEffect(() => {
    getMovieRequest(searchValue)
  }, [searchValue])

  return (
    <div className="row movie-app container-fluid justify-content-center">
      <div className="row d-flex align-items-center mt-4 mb-4" >
        <MovieListHeading heading = 'Movies & Shows' />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className="d-flex flex-nowrap ">
        <MovieList movies = {movies} favoriteComponent = {AddFavorites}/>
      </div>
    </div>
  );
}

export default App;
