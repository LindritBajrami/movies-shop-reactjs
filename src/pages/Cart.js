import { useLocalStorage } from '@uidotdev/usehooks'
import React from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Cart() {
  const [user, setUser] = useLocalStorage('loggedin')
  const [cart, setCart] = useLocalStorage('cart')
  const [orders, setOrders] = useLocalStorage('orders')

  const handleItemDelete = e => {
    if(window.confirm('Are you sure?')) {
      setCart(cart.filter(item => item.id != e.target.getAttribute('item')))
    }
  }

  const handleCheckout = e => {
    e.preventDefault()
    
    let order = {
      user_id: user.id,
      fullname: e.target.elements[0].value,
      phone: e.target.elements[1].value,
      address: e.target.elements[2].value,
      items: cart
    }
    
    if(orders != undefined) {
      setOrders([...orders, order])
    } else {
      setOrders([order])
    }

    setCart([])
    alert('Order was placed successfully')
  }

  return (
    <Container className="my-5">
      {
        (cart != undefined && cart.length) ? (<>
        <table className="table table-bordered">
          <tr>
            <th>Movie</th>
            <th>Qty</th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
          {
            cart.map(item => <tr key={item.id} style={{height: '55px'}}>
              <td>{item.original_title}</td>
              <td>{item.qty}</td>
              <td>{item.vote_average.toFixed(2)} &euro;</td>
              <td>{(item.qty * item.vote_average).toFixed(2)} &euro;</td>
              <td><button onClick={handleItemDelete} item={item.id} className="btn btn-sm btn-danger">Delete</button></td>
            </tr>)
          }
          <tr>
            <td colSpan={3}></td>
            <th>{cart.reduce((s, i) => s + (i.qty * i.vote_average), 0).toFixed(2)} &euro;  </th>
            <td></td>
          </tr>
        </table>
        
        {
          user ? <>
          <h4 className='my-4'>Checkout</h4>
          <form onSubmit={handleCheckout} method="POST">
            <input type="text" placeholder='Fullname' required className="form-control mb-2" />
            <input type="tel" placeholder='Phone number' required className="form-control mb-2" />
            <textarea placeholder='Address' required className="form-control mb-2"></textarea>
            <button type="submit" className="btn btn-outline-primary">Submit</button>
          </form>
          </> : <p>Please <Link to="/login">login</Link> to checkot</p>
        }
        </>) : <p>Cart is empty!</p>
      }
    </Container>
  )
}

export default Cart