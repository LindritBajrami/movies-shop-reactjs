import { useLocalStorage } from "@uidotdev/usehooks";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function Dashboard() {
  const [orders, setOrders] = useLocalStorage("orders");
  const [user, setUser] = useLocalStorage("loggedin");
  const [cart, setCart] = useLocalStorage("cart");
  const [mo, setMo] = useState([]);

  useEffect(() => {
    if (orders != undefined) {
      setMo(orders.filter((o) => o.user_id == user.id));
    }
  }, []);

  return (
    <Container className="my-5">
      <h4 className="mb-4">Orders</h4>
      {mo.length ? (
        <>
          <table className="table table-bordered">
            <tr>
              <th>Fullname</th>
              <th>Phone</th>
              <th>Address</th>
              <th># movies</th>
            </tr>
            {mo.map((o) => (
              <tr key={o.user_id}>
                <td>{o.fullname}</td>
                <td>{o.phone}</td>
                <td>{o.address}</td>
                <td>{o.items.length}</td>
              </tr>
            ))}
          </table>
          {cart != undefined && cart.length ? (
            <p className="mt-5">
              You have {cart.length} items on your cart - please{" "}
              <Link to="/cart">checkout</Link>
            </p>
          ) : (
            ""
          )}
        </>
      ) : (
        <p>0 orders</p>
      )}
    </Container>
  );
}

export default Dashboard;
