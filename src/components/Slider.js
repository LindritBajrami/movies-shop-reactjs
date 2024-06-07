import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';
import { slides } from '../data/slides';

function Slider() {
  return (
    <Carousel>
      {slides && slides.map((slide, index) =>
        <Carousel.Item key={index}>
          <Image src={slide.image} alt="{slide.title}" />
          <Carousel.Caption>
            <h3>{slide.title}</h3>
            <p>{slide.desc}</p>
          </Carousel.Caption>
        </Carousel.Item>
      )}
    </Carousel>
  )
}

export default Slider