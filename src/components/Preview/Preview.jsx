import React from 'react';
import { Helmet } from 'react-helmet';
import HeroBlock from '../blocks/HeroBlock.jsx';
import TwoColumnRow from '../blocks/TwoColumnRow.jsx';
import ImageGrid2x2 from '../blocks/ImageGrid2x2.jsx';
import './Preview.css';

const COMPONENTS_MAP = {
  hero: HeroBlock,
  twoColumn: TwoColumnRow,
  imageGrid: ImageGrid2x2,
};

export default function Preview({ layout, seo }) {
  return (
    <main role="main" aria-label="Landing page preview" className="preview-container">
      <Helmet>
        <title>{seo.title || 'Landing Page Preview'}</title>
        {seo.description && <meta name="description" content={seo.description} />}
        {seo.ogImage && <meta property="og:image" content={seo.ogImage} />}
      </Helmet>

      <h1 tabIndex={0}>Landing Page Preview</h1>

      {(!layout || layout.length === 0) && (
        <p tabIndex={0}>No components added yet.</p>
      )}

      <article>
        {layout.map(({ id, type, props }) => {
          const Component = COMPONENTS_MAP[type];
          return Component ? <Component key={id} {...props} /> : null;
        })}
      </article>
    </main>
  );
}
