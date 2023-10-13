import React, { useState, useEffect } from "react";
import axios from "axios";
import RatingFilter from "./RatingFilter";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import InfiniteScroll from "react-infinite-scroll-component";
import "./Movielist.css";

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showFullText, setShowFullText] = useState(false);
  const [truncatedText, setTruncatedText] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    fetchMovies();
  }, [ratingFilter]);

  const fetchMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=ca2984d67e132444171b3e4e286ec0f2&vote_average.gte=${
          ratingFilter * 2 - 2
        }`
      );
      setMovies(response.data.results);
      setPageNumber(1);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const handleRatingFilter = (rating) => {
    setRatingFilter(rating);
  };

  const handleShowModal = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedMovie(null);
    setShowFullText(false);
    setTruncatedText("");
  };

  useEffect(() => {
    if (selectedMovie) {
      if (selectedMovie.overview.length > 200) {
        setShowFullText(false);
        setTruncatedText(selectedMovie.overview.slice(0, 200));
      } else {
        setShowFullText(true);
        setTruncatedText(selectedMovie.overview);
      }
    }
  }, [selectedMovie]);

  const fetchMoreData = async () => {
    try {
      const nextPage = pageNumber + 1;
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=ca2984d67e132444171b3e4e286ec0f2&vote_average.gte=${
          ratingFilter * 2 - 2
        }&page=${nextPage}`
      );
      const newMovies = response.data.results;
      setMovies((prevMovies) => [...prevMovies, ...newMovies]);
      setPageNumber(nextPage);
    } catch (error) {
      console.error("Error fetching more movies:", error);
    }
  };

  return (
    <div>
      <RatingFilter
        selectedStars={ratingFilter}
        onStarClick={handleRatingFilter}
      />
      <InfiniteScroll
        dataLength={movies.length}
        next={fetchMoreData}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        scrollableTarget="scrollableDiv"
      >
        {movies.length > 0 ? (
          <div className="row d-flex justify-content-center text-center">
            {movies.map((movie) => (
              <div
                className="col-3 movie-container"
                key={movie.id}
                onClick={() => handleShowModal(movie)}
              >
                <img
                  className="movies"
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
                <p className="movie-rating fw-bold text-light">
                  Rating: {movie.vote_average}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-results">
            Lo sentimos, no se encontraron películas con el rating solicitado.
          </p>
        )}
      </InfiniteScroll>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedMovie?.title} -
            <small> {selectedMovie?.vote_average} </small>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-center">
            <img
              className={`modalMovies ${
                showFullText && selectedMovie?.overview.length > 200
                  ? "expanded"
                  : ""
              }`}
              src={`https://image.tmdb.org/t/p/w500${selectedMovie?.poster_path}`}
              alt=""
            />
            <div className={`text-justify ${showFullText ? "ps-2 m-2" : ""}`}>
              {showFullText ? (
                <p>{selectedMovie?.overview}</p>
              ) : (
                <p className="ps-2 m-2">{truncatedText}...</p>
              )}
              {selectedMovie?.overview.length > 200 && (
                <Button
                  variant="link"
                  onClick={() => setShowFullText(!showFullText)}
                >
                  {showFullText ? "Ver menos" : "Ver más"}
                </Button>
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default MovieList;
