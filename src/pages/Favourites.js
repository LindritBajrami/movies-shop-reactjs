import { useLocalStorage } from '@uidotdev/usehooks'
import React from 'react'
import { Container } from 'react-bootstrap'
import MovieCard from '../components/MovieCard'

function Favourites() {
  const [favourites, setFavourites] = useLocalStorage('favourites')

  return (
    <Container className="my-5">
      <div className="row">
      {
        (favourites != null && favourites.length) ? favourites.map(movie => <div key={movie.id} className="col-3">
          <MovieCard data={movie} />
        </div>) : <p>Your favourite list is empty!</p>
      }
      </div>
    </Container>
  )
}

export default Favourites