import Navbar from "../Navbar";
import Header from "../Header";
import MovieList from "../MovieList";

function Home() {
  return (
    <>
      <div className="container-fluid bg-dark">
        <Navbar />
        <Header />
        <div className="row">
          <MovieList />
        </div>
      </div>
    </>
  );
}

export default Home;
