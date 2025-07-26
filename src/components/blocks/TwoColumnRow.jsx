import React from 'react';
import './TwoColumnRow.css';

export default function TwoColumnRow({
  leftHeading = "Our Services",
  leftSubtitle = "We provide great services to our clients.",
  leftCta = "Learn More",
  rightImage = "https://images.pexels.com/photos/518244/pexels-photo-518244.jpeg",
}) {
  return (
    <section
      className="two-column-row"
      role="region"
      aria-label="Two column section"
    >
      <div className="text-content">
        <h2 tabIndex={0}>{leftHeading}</h2>
        <p tabIndex={0}>{leftSubtitle}</p>
        <button className="cta-btn" tabIndex={0}>{leftCta}</button>
      </div>
      <div className="image-content">
        <img src={rightImage} alt="Decorative" />
      </div>
    </section>
  );
}
