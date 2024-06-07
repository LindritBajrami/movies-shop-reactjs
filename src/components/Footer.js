import React from 'react';
import Container from 'react-bootstrap/Container';

function Footer() {
  return (
    <div className="bg-light py-4 mt-4 ">
      <Container className='d-flex justify-content-between'>
        <p className="p-0 m-0">Copyrights © Movie Shop, 2024.</p>
        <p>Developed by LB.</p>
      </Container>
    </div>
  )
}

export default Footer