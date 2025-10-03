import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomeView from "./pages/home/HomeView";
import { SearchProvider } from "./context/searchProvider";
import HistoryView from "./pages/history/HistoryView";

function App() {
  return (
    <SearchProvider>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="history" element={<HistoryView />} />
      </Routes>
    </SearchProvider>
  );
}

export default App;
