import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppLayout from "@components/AppLayout";
import Home from "@pages/Home";
import Movies from "@pages/Movies";
import Watchlist from "@pages/Watchlist";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/watchlist" element={<Watchlist />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
