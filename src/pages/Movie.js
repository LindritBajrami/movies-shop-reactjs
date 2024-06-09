import { useLocalStorage } from '@uidotdev/usehooks'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Container, Image } from 'react-bootstrap'
import { useParams } from 'react-router-dom'

function Movie() {
  const {id} = useParams()
  const [movie, setMovie] = useState()
  const [favourites, setFavourites] = useLocalStorage('favourites')
  const [cart, setCart] = useLocalStorage('cart')
  const [qty, setQty] = useState(1)

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=8434b8e45fae7a011d0aba790f56cad3`)
    .then(response => {
      if(response.status === 200) {
        setMovie(response.data)
      }
    })
  }, [])

  const handleAddToFavourites = e => {
    if(favourites === undefined)
      setFavourites([movie])
    else {
      if(favourites.filter(fm => fm.id == id).length > 0)
        alert(`${movie.title} is already in your favourites!`)
      else
        setFavourites([...favourites, movie])
        alert(`${movie.title} was added to your favourites!`)
    }
  }

  const handleAddToCart = e => {
    if(cart === undefined) {
      setCart([{...movie, qty: qty}])
    } else {
      if(cart.filter(item => item.id == movie.id).length) {
        setCart(cart.map(item => {
          if(item.id == movie.id) return {...item, qty: item.qty + qty}
        }))
      } else {
        setCart([...cart, {...movie, qty: qty}])
      }
    }
    alert(`${movie.original_title} was added to cart`)
    setQty(1)
  }

  return (
    <Container className="my-5">
      {
        movie && 
        <div className="row">
          <div className="col-5">
            <Image src={`${movie.backdrop_path === null ? 'https://aestheticmedicalpractitioner.com.au/wp-content/uploads/2021/06/no-image.jpg' : 'http://image.tmdb.org/t/p/w500/'+movie.backdrop_path}`} alt={movie.original_title} />
          </div>
          <div className="col-6 offset-1">
            <h3>{movie.original_title}</h3>
            {movie.genres && movie.genres.map(genre => <span key={genre.id} className="badge bg-info me-2">{genre.name}</span>)}
            <table className="table table-bordered mt-5">
              <tr>
                <td>Popularity</td>
                <td>{movie.popularity}</td>
              </tr>
              <tr>
                <td>Release date</td>
                <td>
                  {movie.release_date}
                  <br />
                  {movie.status}
                </td>
              </tr>
              <tr>
                <td>Revenue</td>
                <td>{movie.revenue}</td>
              </tr>
            </table>
            <p className="my-5">{movie.overview}</p>
            <div className="d-flex justify-content-start ">
            <a href="/movies" className="btn btn-outline-secondary me-2"><i class="bi bi-arrow-left"></i> Return to Movies</a>
              <input type="number" value={qty} onChange={(e) => setQty(parseInt(e.target.value))} className=" me-2 form-control" style={{width:"80px"}} />
              <button className="btn btn-outline-primary me-2" onClick={handleAddToCart}><i class="bi bi-cart"></i></button>
              <button className="btn btn-outline-danger" onClick={handleAddToFavourites}><i class="bi bi-heart"></i></button>

            </div>
          </div>
        </div>
      }
    </Container>
  )
}

export default Movie
