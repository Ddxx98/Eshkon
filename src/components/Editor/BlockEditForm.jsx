import React, { useState } from 'react';
import './BlockEditForm.css';

export default function BlockEditForm({ type, props = {}, onSave, onCancel }) {
  const [formData, setFormData] = useState(props || {});

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  function renderForm() {
    switch (type) {
      case 'hero':
        return (
          <>
            <label>
              Heading
              <input
                type="text"
                value={formData.heading || ''}
                onChange={(e) => updateField('heading', e.target.value)}
              />
            </label>
            <label>
              Subtitle
              <input
                type="text"
                value={formData.subtitle || ''}
                onChange={(e) => updateField('subtitle', e.target.value)}
              />
            </label>
            <label>
              Call to Action
              <input
                type="text"
                value={formData.cta || ''}
                onChange={(e) => updateField('cta', e.target.value)}
              />
            </label>
            <label>
              Background Image URL
              <input
                type="url"
                value={formData.imageUrl || ''}
                onChange={(e) => updateField('imageUrl', e.target.value)}
              />
            </label>
          </>
        );
      case 'twoColumn':
        return (
          <>
            <label>
              Left Heading
              <input
                type="text"
                value={formData.leftHeading || ''}
                onChange={(e) => updateField('leftHeading', e.target.value)}
              />
            </label>
            <label>
              Left Subtitle
              <input
                type="text"
                value={formData.leftSubtitle || ''}
                onChange={(e) => updateField('leftSubtitle', e.target.value)}
              />
            </label>
            <label>
              Left Call to Action
              <input
                type="text"
                value={formData.leftCta || ''}
                onChange={(e) => updateField('leftCta', e.target.value)}
              />
            </label>
            <label>
              Right Image URL
              <input
                type="url"
                value={formData.rightImage || ''}
                onChange={(e) => updateField('rightImage', e.target.value)}
              />
            </label>
          </>
        );
      case 'imageGrid':
        return (
          <>
            {[0, 1, 2, 3].map((idx) => (
              <label key={idx}>
                Image URL #{idx + 1}
                <input
                  type="url"
                  value={(formData.images && formData.images[idx]) || ''}
                  onChange={(e) => {
                    const newImages = [...(formData.images || [])];
                    newImages[idx] = e.target.value;
                    updateField('images', newImages);
                  }}
                />
              </label>
            ))}
          </>
        );
      default:
        return <p>No editable fields for this block.</p>;
    }
  }

  return (
    <form
      className="block-edit-form"
      onSubmit={(e) => {
        e.preventDefault();
        onSave(formData);
      }}
    >
      <h3>Edit {type} block</h3>
      {renderForm()}
      <div className="buttons">
        <button type="submit" className="save-btn">
          Save
        </button>
        <button type="button" onClick={onCancel} className="cancel-btn">
          Cancel
        </button>
      </div>
    </form>
  );
}
