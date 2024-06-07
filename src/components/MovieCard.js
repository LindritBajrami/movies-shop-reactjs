import { useLocalStorage } from '@uidotdev/usehooks';
import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { redirect } from "react-router-dom";

function MovieCard({data}) {
  const [favourites, setFavourites] = useLocalStorage('favourites')

  const handleDeleteFromFavourites = e => {
    const id = e.target.getAttribute('movie-id')
    setFavourites(favourites.filter(m => m.id != id))
    return redirect("/favourites")
  }

  return (
    <Card className="mb-4" style={{height: '362.5px'}}>
      <Card.Img variant="top" src={`${data.backdrop_path === null ? 'https://aestheticmedicalpractitioner.com.au/wp-content/uploads/2021/06/no-image.jpg' : 'http://image.tmdb.org/t/p/w500/'+data.backdrop_path}`} />
      <Card.Body className="d-flex flex-column justify-content-between">
        <Card.Title>{data.original_title}</Card.Title>
        <Card.Text>
          {data.overview.substring(0, 60)}...
        </Card.Text>
        <div>
          <Link to={`/movie/${data.id}/details`} className="btn btn-sm btn-outline-primary" style={{width: '80px'}}>
            <i className="bi bi-arrow-right"></i> 
          </Link>
          {
            (favourites != undefined && favourites.filter(m => m.id == data.id).length) > 0 &&
            <button className="btn btn-sm btn-outline-danger ms-3 p-0">
              <i className="bi bi-trash d-inline-block px-2 py-1" movie-id={data.id} onClick={handleDeleteFromFavourites}></i>
            </button>
          }
        </div>
      </Card.Body>
    </Card>
  )
}

export default MovieCard