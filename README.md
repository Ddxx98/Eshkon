# Landing Page Builder React App

A fully featured, accessible, and SEO-friendly landing page builder with drag-and-drop layout editing built in React. Uses @hello-pangea/dnd for drag-and-drop and includes authentication, live editing, SEO meta tags editing, theme customization, layout export/import, and preview mode.

## Features

- Drag and drop 3 block types: Hero Block, Two Column Row, 2x2 Image Grid
- Reorder, add, and remove blocks visually
- Edit block content inline with forms
- Undo/Redo changes
- Export/Import layout as JSON file
- Customize SEO meta tags (title, description, OpenGraph image)
- Theme customization (primary color, font family)
- Simple dummy authentication with login/log out
- Full accessibility support (keyboard, screen reader)
- High Lighthouse scores for Performance, Accessibility, SEO
- Preview mode to view assembled landing page

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher recommended)
- npm (v8 or higher)

---

### Installation

1. Clone or download the repository.

2. Navigate to the project folder and install dependencies:


3. Start the development server:


4. Open your browser and visit `http://localhost:5173` (or terminal’s URL output).

---

### Usage

- Sign in with **any** username and password (dummy auth).
- Drag components from the **Available Components** panel on the left to the **Page Layout** area.
- Click the ✎ button on a block to edit text, images, and CTAs inline.
- Remove blocks with the ✖ button.
- Use Undo (↺) and Redo (↻) buttons above editor.
- Export your layout to JSON for backup or sharing.
- Import JSON files to restore layouts.
- Edit SEO metadata in the SEO editor to customize page title, description, and OpenGraph image.
- Customize theme colors and fonts.
- Switch to **Preview** mode to see your landing page as-built.
- Logout to return to the login screen.

---

### Build for Production


The production-ready files will be in the `dist/` folder.

---

### Dependencies

- React 18+
- @hello-pangea/dnd - drag and drop toolkit
- react-helmet - for SEO meta tag management
- Vite - build tool and dev server

---

### Notes

- The authentication system is a simple dummy implementation. For real applications, integrate with a proper auth backend.
- The layout and SEO settings are saved into `localStorage` by default.
- The app emphasizes accessibility with ARIA roles, keyboard support, and semantic HTML.
- Feel free to extend with backend integration, user accounts, and persistent storage.

---

### License

MIT License

---

### Contact / Support

For issues, questions, or feature requests, please open an issue or contact the maintainer.

---

Enjoy building great landing pages!

