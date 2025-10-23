A React-based photo gallery app built with the Unsplash API.
Browse popular photos, search by keyword, view your search history, and open photos in full view with detailed stats.

📸 Features
Home Page: Displays the 20 most popular photos
Search: Text input updates results automatically (no search button)
Caching: Previously searched keywords are cached to avoid redundant API requests
History Page: Lists all searched keywords; clicking on one reloads cached results
Infinite Scroll: Loads more images dynamically on scroll (both pages)
Modal View: Clicking a photo opens a modal with full-size image, likes, views, and downloads
🧰 Tech Stack
React (Hooks, functional components)
Vite (development environment)
Vanilla CSS
Unsplash REST API
LocalStorage for caching and history
🗂️ Folder Structure
/src
/api
/components
/hooks
/pages
App.jsx
main.jsx
.env
README.md

⚙️ Setup and Run
Clone the repository
git clone https://github.com/eleneshetsiruli/Gallery
cd photo-gallery

Install dependencies
npm install

Create a .env file and add your Unsplash credentials:
VITE_UNSPLASH_ACCESS_KEY=your_key
VITE_UNSPLASH_API_URL=https://api.unsplash.com

Run the development server:
npm run dev

Open http://localhost:5173 in your browser.
🧠 Custom Hooks
useCache: Stores and retrieves search results from cache
useDebounce: Reduces API calls while typing
useInfiniteScroll: Implements infinite scrolling logic
🚀 Deployment

Easily deploy on Vercel or Netlify:

npm run build

✨ Author

Created by Elene, React Developer.
Feel free to explore or extend the project on GitHub!
