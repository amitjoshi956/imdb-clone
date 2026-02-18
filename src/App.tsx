import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "@components/AppLayout";
import PageLoader from "@components/PageLoader";

const Home = lazy(() => import("@pages/Home"));
const Movies = lazy(() => import("@pages/Movies"));
const Watchlist = lazy(() => import("@pages/Watchlist"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/watchlist" element={<Watchlist />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
