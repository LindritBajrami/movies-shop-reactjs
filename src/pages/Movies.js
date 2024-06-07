import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import MovieCard from '../components/MovieCard'

function Movies() {
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState('')

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=8434b8e45fae7a011d0aba790f56cad3&page=${page}`)
    .then(response => {
      if(response.status === 200) {
        setMovies(response.data.results)
      }
    })
  }, [page])

  useEffect(() => {
    if(query.length > 3) {
      axios.get(`https://api.themoviedb.org/3/search/movie?api_key=8434b8e45fae7a011d0aba790f56cad3&query=${query}`)
      .then(response => {
        if(response.status === 200) {
          setMovies(response.data.results)
        }
      })
    }
  }, [query])

  const handleSearch = e => {
    switch(e.keyCode) {
      case 13:
        setQuery(e.target.value)
        break
    }
  }

  const handlePageChange = e => {
    setPage(e.target.value)
  }

  return (
    <Container className="my-5">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div>
          <h4>Movies</h4>
          <p>Page: {page}</p>
        </div>
        <div style={{width: '35%'}}>
          <input type="text" placeholder='Search by title...' onKeyUp={handleSearch} className="form-control" />
        </div>
        <div>
          <input type="number" value={page} min="1" onChange={handlePageChange} className="form-control" />
        </div>
      </div>
      <div className="row">
        {
          movies && movies.map(movie => <div className="col-3" key={movie.id}>
            <MovieCard data={movie} />
          </div>)
        }
      </div>
    </Container>
  )
}

export default Movies