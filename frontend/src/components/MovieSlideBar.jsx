import React from 'react'
import '../styles/MovieSlideBar.css'; // create this CSS file for styles
const MovieSlideBar = () => {
    const teluguHitMovies2024 = [
  {
    name: "Pushpa 2: The Rule",
    image: "https://www.ragalahari.com/actress/allu-arjun/pushpa-2/posters/pushpa-2-movie-poster-1.jpg"
  },
  {
    name: "Kalki 2898 AD",
    image: "https://www.ragalahari.com/actress/prabhas/kalki-2898-ad/posters/kalki-2898-ad-movie-poster-1.jpg"
  },
  {
    name: "Devara",
    image: "https://www.ragalahari.com/actress/ntr/devara/posters/devara-movie-poster-1.jpg"
  },
  {
    name: "Hanu Man",
    image: "https://www.ragalahari.com/actress/teja-sajja/hanu-man/posters/hanu-man-movie-poster-1.jpg"
  },
  {
    name: "Tillu Square",
    image: "https://www.ragalahari.com/actress/siddhu-jonnalagadda/tillu-square/posters/tillu-square-movie-poster-1.jpg"
  },
  {
    name: "Lucky Baskhar",
    image: "https://www.ragalahari.com/actress/dulquer-salmaan/lucky-baskhar/posters/lucky-baskhar-movie-poster-1.jpg"
  },
  {
    name: "Guntur Kaaram",
    image: "https://www.ragalahari.com/actress/mahesh-babu/guntur-kaaram/posters/guntur-kaaram-movie-poster-1.jpg"
  },
  {
    name: "Eagle",
    image: "https://www.ragalahari.com/actress/ravi-teja/eagle/posters/eagle-movie-poster-1.jpg"
  },
  {
    name: "Kubera",
    image: "https://www.ragalahari.com/actress/dhanush/kubera/posters/kubera-movie-poster-1.jpg"
  },
  {
    name: "KA",
    image: "https://www.ragalahari.com/actress/kiran-abbavaram/ka/posters/ka-movie-poster-1.jpg"
  }
];
  return (
    <div>
      <h2>Top Hit Telugu Movies</h2>
      <div className="movie-slider">
        {teluguHitMovies2024.map((movie, index) => (
          <div className="movie-slide" key={index}>
            <img src={movie.image} alt={movie.name} />
            <h3>{movie.name}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MovieSlideBar
