import React from 'react';
import './ImageGrid2x2.css';

export default function ImageGrid2x2({
  images = [
    "https://images.pexels.com/photos/18207575/pexels-photo-18207575.jpeg",
    "https://images.pexels.com/photos/5507254/pexels-photo-5507254.jpeg",
    "https://images.pexels.com/photos/5507228/pexels-photo-5507228.jpeg",
    "https://images.pexels.com/photos/29942539/pexels-photo-29942539.jpeg",
  ],
}) {
  return (
    <section
      className="image-grid-2x2"
      role="region"
      aria-label="2 by 2 image grid"
    >
      {images.map((src, i) => (
        <img key={i} src={src} alt={`Grid image ${i + 1}`} tabIndex={0} />
      ))}
    </section>
  );
}
