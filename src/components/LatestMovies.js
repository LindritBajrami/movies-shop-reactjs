import axios from 'axios'
import React, { useEffect, useState } from 'react'
import MovieCard from './MovieCard'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function LatestMovies() {
    const [latestMovies, setLatestMovies] = useState([])

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=8434b8e45fae7a011d0aba790f56cad3`)
        .then(response => {
            if(response.status === 200) {
                setLatestMovies(response.data.results.slice(0, 12))
            }
        })
    })


  return (
    <Container className='my-5'>
        <h3 className="text-center">Latest movies</h3>
        <div className="row my-5">
        {
            latestMovies && latestMovies.map(movie => <div className="col-3" key={movie.id}>
                <MovieCard data={movie} />
            </div>)
        }
        </div>
        <div className="d-flex justify-content-center">
            <Link to="/shop" className="btn btn-sm btn-outline-primary">
                Explore more <i className="bi bi-arrow-right"></i>
            </Link>
        </div>
    </Container>
  )
}

export default LatestMovies