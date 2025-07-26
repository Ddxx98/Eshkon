import React from 'react';
import './HeroBlock.css';

export default function HeroBlock({
  heading = "Welcome to the Site Builder",
  subtitle = "Where we can build something great together",
  cta = "Get Started",
  imageUrl = "https://images.pexels.com/photos/956999/milky-way-starry-sky-night-sky-star-956999.jpeg",
}) {
  return (
    <section
      className="hero-block"
      style={{ backgroundImage: `url(${imageUrl})` }}
      role="region"
      aria-label="Hero section"
    >
      <div className="hero-content">
        <h1 tabIndex={0}>{heading}</h1>
        <p tabIndex={0}>{subtitle}</p>
        <button className="cta-btn" tabIndex={0}>{cta}</button>
      </div>
    </section>
  );
}
